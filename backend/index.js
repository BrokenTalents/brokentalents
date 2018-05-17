#!/usr/bin/node

const R  = require('ramda'),
  Future = require('fluture'),
  moment = require('moment'),
  reduce = require('./reduce'),
  source = require('./source'),
  file   = require('./file'),
  config = require('./config');

const loadFTimestamped = source.loadFTimestamped(config);
const deriveStatistics = reduce.deriveStatistics(config.reduce);
const aggregatePayloads = reduce.aggregatePayloads(config.reduce);
const cleanPayloads = reduce.cleanPayloads(config.reduce);
const saveFPayloads = file.saveFPayloads(config.file);

function main() {
  const firstOfMay = moment('2018-05-16');

  const later = R.curry((base, hs) => base.clone().add(hs, 'hours'));
  const hours = R.range(20, 24 * 1 + 13);
  const laterMoments = R.map(later(firstOfMay), hours);

  const futures = R.map(loadFTimestamped, laterMoments);
  Future.parallel(1, futures)
    .map(R.compose(deriveStatistics, aggregatePayloads, cleanPayloads, R.unnest))
    .chain(saveFPayloads(config.file.reportPattern()))
    .fork(console.error, (d) => console.log(JSON.stringify(d, null, 2)));
}

main();
