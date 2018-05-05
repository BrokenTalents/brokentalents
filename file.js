#!/usr/bin/node

const R = require('ramda'),
  Future = require('fluture'),
  fs = require('fs'),
  fsPath = require('fs-path');

function loadFPayloads(config) {
  return R.curry((file) =>
    Future.node((cb) => fs.readFile(file, 'utf8', cb))
          .chain(Future.encase(JSON.parse))
  );
}

function saveFPayloads(config) {
  return R.curry((file, data) =>
    Future.node((cb) => fsPath.writeFile(file, JSON.stringify(data), cb))
    .map(() => data)
  );
}

function saveFPayloadsTimestamped(config) {
  return R.curry((timestamp, data) =>
    saveFPayloads(config)(config.pattern(timestamp), data)
  );
}

function loadFPayloadsTimestamped(config) {
  return R.curry((timestamp) =>
    loadFPayloads(config)(config.pattern(timestamp))
  );
}

module.exports = {
  loadFPayloads,
  loadFPayloadsTimestamped,
  saveFPayloads,
  saveFPayloadsTimestamped,
};
