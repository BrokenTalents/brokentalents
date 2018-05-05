#!/usr/bin/node

module.exports = {
  api: {
    baseUrl: 'https://api.dc01.gamelockerapp.com',
    timeout: 5,
    regions: ['sg', 'eu', 'na'],
    rpm: 5,
    modes: ['blitz_pvp_ranked'],
  },
  etl: {
    participant: [ ['Winner', ['attributes', 'stats', 'winner']] ],
    roster: [ ],
    match: [ ],
  },
  reduce: {
    group: ['Actor', 'Talent'],
    sum: ['Level', 'Winner'],
  },
  file: {
    pattern: (moment) => `./data/${moment.week()}/${moment.toISOString()}.json`,
  },
};
