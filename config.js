#!/usr/bin/node

module.exports = {
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
