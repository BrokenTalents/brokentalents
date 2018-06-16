#!/usr/bin/node

const R  = require('ramda'),
  Future = require('fluture'),
  etl    = require('./etl'),
  params = require('./params'),
  reduce = require('./reduce'),
  file   = require('./file');

function doFetchProcessStoreHour(config) {
  const intervalSleep = 60 / config.api.intervalsPerMinute * 1000;

  const paramsForHourSample = params.paramsForHourSample(config.api);
  const loadFApi            = etl.loadFPayloads(config.etl);
  const saveFPayloads       = file.saveFPayloadsTimestamped(config.file);
  const aggregatePayloads   = reduce.aggregatePayloads(config.reduce);

  const requestsForHour = (timestamp) => R.map(R.apply(loadFApi), paramsForHourSample(timestamp));

  //return () => Future.of([]); // DEBUG
  return (timestamp) => Future.parallel(1, requestsForHour(timestamp))
    .map(R.compose(aggregatePayloads, R.unnest))
    .chainRej((err) => { console.error(err); return Future.of({}); }) // fail silently
    .chain(saveFPayloads(timestamp));
    //.chain(Future.after(intervalSleep));
  // TODO should sleep after request; throttling rpm should happen
  // at a higher level though. CPU / IO / AWS requests stall
  // as well
}

function loadFTimestamped(config) {
  // load from file or fall back to API and store
  return (timestamp) =>
    file.loadFPayloads(config)(config.file.pattern(timestamp))
    .or(doFetchProcessStoreHour(config)(timestamp));
};

module.exports = {
  loadFTimestamped,
};
