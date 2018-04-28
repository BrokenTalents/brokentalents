#!/usr/bin/node

const R  = require('ramda'),
  etl    = require('./etl'),
  reduce = require('./reduce'),
  config = require('./config');

function main() {
  const loadFPayloads     = etl.loadFPayloads(config.etl);
  const aggregatePayloads = reduce.aggregatePayloads(config.reduce);
  const deriveStatistics  = reduce.deriveStatistics(config.reduce);

  let pages   = [0, 5, 10, 15, 20, 25];
  let regions = ['sg', 'eu', 'na'];

  const params   = R.xprod(regions, pages);
  const requests = R.map(
    R.apply((region, page) => loadFPayloads(
      `/shards/${region}/matches`,
      { 'sort': '-createdAt', 'filter[gameMode]': 'blitz_pvp_ranked', 'page[limit]': '5', 'page[offset]': page },
    )),
    params);

  /* main */
  Future.parallel(1, requests)
    .map(R.compose(deriveStatistics, aggregatePayloads, R.unnest))
    .value(R.compose(console.log, (a) => JSON.stringify(a, null, 2)));
}

main();
