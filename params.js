#!/usr/bin/node

const R = require('ramda');

function paramsForHourSample(config) {
  const requestArgsForRegionStartEnd = R.curry((region, start, end) => [
    `/shards/${region}/matches`, {
      'sort': '-createdAt',
      'filter[gameMode]': R.join(',', config.modes),
      'filter[createdAt-start]': start.toISOString(),
      'filter[createdAt-end]': end.toISOString(),
      'page[limit]': '5',
      'page[offset]': '0',
    }
  ]);

  const requestsPerMinutePerRegion = Math.floor(config.rpm / config.regions.length);
  const splitDurationMinutes = Math.floor(60 / requestsPerMinutePerRegion);
  const splitMoments = (hour) => R.map(
    (offsetIndex) => [
      hour.clone().startOf('hour').minutes(offsetIndex * splitDurationMinutes),
      hour.clone().startOf('hour').minutes((offsetIndex + 1) * splitDurationMinutes),
    ],
    R.range(0, requestsPerMinutePerRegion),
  );

  return R.pipe(
    splitMoments,
    R.xprod(config.regions),
    R.map(R.unnest),
    R.map(R.apply(requestArgsForRegionStartEnd)),
  );
}

module.exports = {
  paramsForHourSample,
};
