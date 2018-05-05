#!/usr/bin/node

const R = require('ramda'),
  moment = require('moment');

function paramsForHourSample(config) {
  const requestArgsForRegionStartEnd = R.curry((region, start, end) => [
    `/shards/${region}/matches`, {
      'sort': '-createdAt',
      'filter[gameMode]': R.join(',', config.modes),
      'filter[createdAt-start]': start.toISOString(),
      'filter[createdAt-end]': end.toISOString(),
      'page[limit]': config.matchesPerRequest,
      'page[offset]': '0',
    }
  ]);

  const intervalMinutes = moment.duration(config.interval, config.intervalUnit).as('minutes');
  const requestsPerMinutePerRegion = Math.floor(config.requestsPerInterval / config.regions.length);
  const splitDurationMinutes = Math.floor(intervalMinutes / requestsPerMinutePerRegion);
  const splitMoments = (hour) => R.map(
    (offsetIndex) => [
      hour.clone().minutes(offsetIndex * splitDurationMinutes),
      hour.clone().minutes((offsetIndex + 1) * splitDurationMinutes),
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
