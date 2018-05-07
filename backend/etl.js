#!/usr/bin/node

const R = require('ramda'),
  Future = require('fluture'),
  utils = require('./utils'),
  api = require('./api');

// API data cleanup
const mapSideToTeam = (side) => side == 'left/blue' ? 'Left' : 'Right';

function loadFPayloads(config) {
  const objOfPathsConfig = {
    match: R.map(R.apply(utils.objOfPath), config.match),
    roster: R.map(R.apply(utils.objOfPath), config.roster),
    participant: R.map(R.apply(utils.objOfPath), config.participant),
  }; // TODO Ramda-ify

  /*
   * 1     Pull API JSON
   * 2     Extract Participant, Roster, Match, Assets
   * 3.1   Transform Participant, Roster, Match to flat structure
   * 3.2   Pull and filter Assets for Events
   * 3.2.1 Transform Events: Add Match meta data
   * 4     Join Events to flat structure
   */

  const propIncludedFilterType = R.curry((type) =>
    R.compose(R.filter(R.propEq('type', type)), R.prop('included'))
  );

  const extractJsonToAssets = propIncludedFilterType('asset');
  const extractJsonToParticipants = propIncludedFilterType('participant');
  const extractJsonToRosters = propIncludedFilterType('roster');
  const extractJsonToMatches = R.prop('data');

  const filterTypeEqTalentEquipped = R.pipe(
    R.filter(R.propEq('type', 'TalentEquipped')),
    R.map(R.prop('payload'))
  );

  const transformParticipantToPayload = R.converge(utils.mergeAllArgs,
    R.concat(objOfPathsConfig.participant, [
      utils.objOfPath('Actor', ['attributes', 'actor']),
      utils.objOfPath('_participant_id', ['id']),
    ])
  );

  const transformRosterToPayload = R.converge(utils.mergeAllArgs,
    R.concat(objOfPathsConfig.roster, [
      R.pipe(
        R.path(['attributes', 'stats', 'side']),
        mapSideToTeam,
        R.objOf('Team'),
      ),
      utils.objOfPath('_roster_id', ['id']),
      R.pipe(
        R.path(['relationships', 'participants', 'data']),
        R.map(R.prop('id')),
        R.objOf('_participant_ids')
      )
    ])
  );

  const transformMatchToPayload = R.converge(utils.mergeAllArgs,
    R.concat(objOfPathsConfig.match, [
      utils.objOfPath('_match_id', ['id']),
      utils.objOfPath('_asset_id', ['relationships', 'assets', 'data', 0, 'id']),
      R.pipe(
        R.path(['relationships', 'rosters', 'data']),
        R.map(R.prop('id')),
        R.objOf('_roster_ids')
      )
    ])
  );

  /* SQL style join using relationship info stored in _ attrs */
  // TODO refactor
  const joinParticipantPayloadToRosterPayload = R.pipe(
    R.xprod,
    R.filter(
      R.converge(R.contains, [
        R.path([0, '_participant_id']),
        R.path([1, '_participant_ids'])
      ])
    ),
    R.map(R.mergeAll)
  );

  const joinParticipantRosterPayloadToMatchPayload = R.pipe(
    R.xprod,
    R.filter(
      R.converge(R.contains, [
        R.path([0, '_roster_id']),
        R.path([1, '_roster_ids'])
      ])
    ),
    R.map(R.mergeAll)
  );

  // join participant -> roster -> match
  const joinedParticipantRosterPayloads = R.converge(joinParticipantPayloadToRosterPayload, [
    R.compose(R.map(transformParticipantToPayload), extractJsonToParticipants),
    R.compose(R.map(transformRosterToPayload), extractJsonToRosters),
  ]);
  const joinedParticipantRosterMatchPayloads = R.converge(joinParticipantRosterPayloadToMatchPayload, [
    joinedParticipantRosterPayloads,
    R.compose(R.map(transformMatchToPayload), extractJsonToMatches),
  ]);

  // chain json -> constructed payload,
  // wrap in future for compatibility with `loadFTelemetryPayloads`
  const loadFParticipantRosterMatchPayloads = R.pipe(
    joinedParticipantRosterMatchPayloads,
    Future.of,
  );

  // join [telemetry, asset id] -> { telemetry, asset id }
  const joinTelemetryPayloadsToId = R.pipe(
    R.apply(R.xprod),
    R.map(R.mergeAll),
  );

  // chain json -> api payload,
  // add additional meta information to events
  const loadFTelemetryPayloads = R.pipe(
    extractJsonToAssets,
    R.map(R.converge(R.pipe(
      Future.both,
      R.map(joinTelemetryPayloadsToId),
    ), [
      R.pipe(
        R.path(['attributes', 'URL']),
        api.awsRequest,
        R.map(filterTypeEqTalentEquipped),
      ),
      R.pipe(
        utils.objOfPath('_asset_id', ['id']),
        R.of,
        Future.of,
      ),
    ])),
    Future.parallel(Infinity),
    R.map(R.unnest),
  );

  // given an array of telemetry payloads and an array of constructed payloads,
  // return merged telemetry + constructed payloads for identical players & matches
  // problem: some do not have 'NoTalent' (5v5, 3v3 standard)! -> need right join not inner join
  const joinParticipantRosterMatchPayloadsToTelemetryPayloads = R.pipe(
    R.apply(utils.naturalJoinRight),
    R.map(R.mergeAll),
  );

  const loadFParticipantRosterMatchTelemetryPayloads = R.pipe(
    api.apiRequest,
    R.chain(R.converge(R.pipe(
      Future.both,
      R.map(R.pipe(
        joinParticipantRosterMatchPayloadsToTelemetryPayloads,
        R.map(R.pipe(
          R.omit(['_asset_id', '_participant_id', '_participant_ids', '_roster_id', '_roster_ids', '_match_id', 'Team']),
          R.set(R.lensProp('Count'), 1),
        )),
      )),
    ), [
      loadFParticipantRosterMatchPayloads,
      loadFTelemetryPayloads,
    ]))
  );

  return loadFParticipantRosterMatchTelemetryPayloads;
}

module.exports = {
  loadFPayloads,
};
