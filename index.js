#!/usr/bin/node

const R  = require('ramda'),
  Future = require('fluture'),
  moment = require('moment'),
  source = require('./source'),
  params = require('./params'),
  reduce = require('./reduce'),
  file   = require('./file'),
  config = require('./config');

const paramsForHourSample = params.paramsForHourSample(config.api);
const loadFApi            = source.loadFApi(config.etl);
const saveFPayloads       = file.saveFPayloadsTimestamped(config.file);
const aggregatePayloads   = reduce.aggregatePayloads(config.reduce);
const deriveStatistics    = reduce.deriveStatistics(config.reduce);

const requestsForHour = (timestamp) => R.map(R.apply(loadFApi), paramsForHourSample(timestamp));

function processFPastHour(config) {
  return (timestamp) =>
    Future.parallel(1, requestsForHour(timestamp))
      .map(R.compose(deriveStatistics, aggregatePayloads, R.unnest))
      .chain(saveFPayloads(timestamp));
}

function main() {
  const now = moment().subtract(1, 'hours').startOf('hour');
  console.log(requestsForHour(now));
  processFPastHour(config)(now).fork(console.error, console.log);
}

main();
