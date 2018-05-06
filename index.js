#!/usr/bin/node

const R  = require('ramda'),
  Future = require('fluture'),
  moment = require('moment'),
  reduce = require('./reduce'),
  source = require('./source'),
  config = require('./config');

const loadFTimestamped = source.loadFTimestamped(config);
const deriveStatistics = reduce.deriveStatistics(config.reduce);
const aggregatePayloads = reduce.aggregatePayloads(config.reduce);

function main() {
  const firstOfMay = moment('2018-05-01');

  const later = R.curry((base, hs) => base.clone().add(hs, 'hours'));
  const hours = R.range(0, 24 * 5);
  const laterMoments = R.map(later(firstOfMay), hours);

  const futures = R.map(loadFTimestamped, laterMoments);
  Future.parallel(1, futures)
    .map(R.compose(deriveStatistics, aggregatePayloads, R.unnest))
    .fork(console.error, (d) => console.log(JSON.stringify(d, null, 2)));
}

main();
