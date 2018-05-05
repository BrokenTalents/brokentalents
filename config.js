#!/usr/bin/node

module.exports = {
  api: {
    baseUrl: 'https://api.dc01.gamelockerapp.com',
    timeout: 5,
    regions: ['sg', 'eu', 'na'],
    rpm: 50,
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
};
