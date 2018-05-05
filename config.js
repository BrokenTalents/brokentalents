#!/usr/bin/node

const crypto = require('crypto');

const sha256 = (x) => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

const hashSettings = (config) => sha256(
  config.api.regions +
  config.api.modes +
  config.api.requestsPerInterval +
  config.api.interval +
  config.api.intervalUnit
).substring(0, 8);

module.exports = {
  api: {
    baseUrl: 'https://api.dc01.gamelockerapp.com',
    timeout: 3,
    /* available: eu, na, sg, cn, sa, ea */
    regions: ['sg', 'eu', 'na'],
    /* available: casual, ranked, blitz_pvp_ranked, casual_aral */
    modes: ['blitz_pvp_ranked'],
    /* available: 2, 3, 4, 5 */
    matchesPerRequest: 5,
    /* How many equidistant requests to create
     * matchesPerRequest * requestsPerInterval = sample size for that interval */
    requestsPerInterval: 5,
    /* the size of a batch */
    interval: 1,
    intervalUnit: 'hours',
    /* How many batches to request per minute
     * requestsPerInterval * intervalsPer Minute <= API key rate limit */
    intervalsPerMinute: 10,
  },
  etl: {
    /* attributes to be extracted and renamed from main API data */
    participant: [ ['Winner', ['attributes', 'stats', 'winner']] ],
    roster: [ ],
    match: [ ],
  },
  reduce: {
    /* criteria or 'filters' */
    group: ['Actor', 'Talent'],
    /* stats */
    sum: ['Level', 'Winner'],
  },
  file: {
    pattern: (moment) => `./data/${hashSettings(module.exports)}/${moment.toISOString()}.json`,
  },
};
