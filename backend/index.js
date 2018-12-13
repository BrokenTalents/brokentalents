#!/usr/bin/node

const R  = require('ramda'),
  Future = require('fluture'),
  moment = require('moment'),
  fsPath = require('fs-path'),
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
  const start = moment('2018-05-16 16Z');
  const end = moment().utc();
  const duration = moment.duration(end.diff(start));

  const later = R.curry((base, hs) => base.clone().add(hs, 'hours'));
  const hours = R.range(0, Math.floor(duration.asHours()));
  const laterMoments = R.map(later(start), hours);

  const metadata = {
    lastUpdate: moment().toISOString(),
    config,
  };
  const saveMetadata = (path, data) =>
    Future.node((cb) => fsPath.writeFile(path, JSON.stringify(data), cb))
          .map(() => data);

  const futures = R.map(loadFTimestamped, laterMoments);
  Future.parallel(1, futures)
    .map(R.compose(deriveStatistics, aggregatePayloads, cleanPayloads, R.unnest))
    .chain(saveFPayloads(config.file.reportPattern()))
    .chain((data) => saveMetadata(config.file.metadataPattern(), metadata))
    .fork(console.error, (d) => {});
}

main();
