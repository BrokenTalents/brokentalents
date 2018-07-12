#!/usr/bin/node
const maps = require('../src/maps/maps');

const crypto = require('crypto');

const sha256 = (x) => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

const hashSettings = (config) => sha256(
  config.api.patchVersion +
  config.api.regions +
  config.api.modes +
  config.api.requestsPerInterval +
  config.api.interval +
  config.api.intervalUnit +
  config.etl +
  config.reduce
).substring(0, 8);

module.exports = {
  api: {
    baseUrl: 'https://api.dc01.gamelockerapp.com',
    timeout: 3,
    /* available: 3.1, 3.2, 3.3, … */
    patchVersion: '3.5',
    /* moment js parsable string */
    startDate: '2018-07-11 18Z',
    /* available: eu, na, sg, cn, sa, ea */
    regions: ['sg', 'eu', 'na'],
    /* available: casual, 5v5_pvp_casual, ranked, 5v5_pvp_ranked, blitz_pvp_ranked, casual_aral */
    modes: ['blitz_pvp_ranked', 'casual_aral', 'ranked', '5v5_pvp_ranked'],
    /* available: 2, 3, 4, 5 */
    matchesPerRequest: 5,
    /* How many equidistant requests to create
     * matchesPerRequest * requestsPerInterval = sample size for that interval
     * currently requestsPerInterval <= API key rate limit but should work if it isn't significantly higher
     * rough estimate of upper limits (na/eu/sg, depends on region and time of day):
     * blitz: 240
     * battle royale: 30
     * 3v3 casual: 30
     * 3v3 ranked: 100
     * 5v5 casual: 30
     * 5v5 ranked: 40
     * if filtering for multiple game modes, use the sum of the upper limits */
    requestsPerInterval: 50,
    /* the size of a batch */
    interval: 1,
    intervalUnit: 'hours',
    /* How many batches to request per minute
     * requestsPerInterval * intervalsPer Minute <= API key rate limit */
    intervalsPerMinute: 1,
  },
  etl: {
    /* attributes to be extracted and renamed from main API data */
    participant: [
      ['Winner', ['attributes', 'stats', 'winner']],
      ['Kills', ['attributes', 'stats', 'kills']],
      ['Deaths', ['attributes', 'stats', 'deaths']],
      ['CrystalMinerKills', ['attributes', 'stats', 'crystalMineCaptures']],
      ['GoldMinerKills', ['attributes', 'stats', 'goldMineCaptures']],
      ['TurretKills', ['attributes', 'stats', 'turretCaptures']],
    ],
    roster: [ ],
    match: [ ['Mode', ['attributes', 'gameMode']] ],
  },
  reduce: {
    /* attributes to be calculated from other attributes */
    derived: [
      (entry) => {
        if(entry.LevelBucket == undefined)
          entry.LevelBucket = Math.max(-1, Math.floor(maps.getScaledLevel(entry) * module.exports.self.levelBuckets));
        return entry;
      },
    ],
    /* criteria or 'filters' */
    group: ['Actor', 'Talent', 'Mode', 'LevelBucket'],
    /* stats */
    sum: ['Winner', 'Kills', 'Deaths', 'CrystalMinerKills', 'GoldMinerKills', 'TurretKills'],
  },
  file: {
    pattern: (moment) => `./data/${hashSettings(module.exports)}/${moment.toISOString()}.json`,
    reportPattern: () => `./data/${hashSettings(module.exports)}/report.json`,
    metadataPattern: () => `./data/${hashSettings(module.exports)}/metadata.json`,
  },
  self: {
    levelBuckets: 5,
  },
};
