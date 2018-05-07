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
    /* available: casual, 5v5_pvp_casual, ranked, 5v5_pvp_ranked, blitz_pvp_ranked, casual_aral */
    modes: ['blitz_pvp_ranked', 'casual_aral'],
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
    participant: [ ['Winner', ['attributes', 'stats', 'winner']] ],
    roster: [ ],
    match: [ ['Mode', ['attributes', 'gameMode']] ],
  },
  reduce: {
    /* criteria or 'filters' */
    group: ['Actor', 'Talent', 'Mode'],
    /* stats */
    sum: ['Level', 'Winner'],
  },
  file: {
    pattern: (moment) => `../data/${hashSettings(module.exports)}/${moment.toISOString()}.json`,
  },
};
