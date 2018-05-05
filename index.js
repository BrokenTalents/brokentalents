#!/usr/bin/node

const R  = require('ramda'),
  Future = require('fluture'),
  moment = require('moment'),
  source = require('./source'),
  params = require('./params'),
  reduce = require('./reduce'),
  config = require('./config');

function main() {
  const paramsForHourSample = params.paramsForHourSample(config.api);
  const loadFApi            = source.loadFApi(config.etl);
  const aggregatePayloads   = reduce.aggregatePayloads(config.reduce);
  const deriveStatistics    = reduce.deriveStatistics(config.reduce);

  const requests = R.map(R.apply(loadFApi), paramsForHourSample(moment().subtract(1, 'days')));

  /* main */
  Future.parallel(1, requests)
    .map(R.compose(deriveStatistics, aggregatePayloads, R.unnest))
    .value(R.compose(console.log, (a) => JSON.stringify(a, null, 2)));
}

main();
