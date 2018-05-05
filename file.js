#!/usr/bin/node

const R = require('ramda'),
  Future = require('fluture')
  fsPath = require('fs-path');

function loadFPayloads(config) {
  return R.curry((file) =>
    Future.node((cb) => fsPath.readFile(file, 'utf8', cb))
          .chain(Future.encase(JSON.parse))
  );
}

function saveFPayloads(config) {
  return R.curry((file, data) =>
    Future.node((cb) => fsPath.writeFile(file, JSON.stringify(data), cb))
  );
}

function saveFPayloadsTimestamped(config) {
  return R.curry((timestamp, data) =>
    saveFPayloads(config)(config.pattern(timestamp), data)
  );
}

module.exports = {
  loadFPayloads,
  saveFPayloads,
  saveFPayloadsTimestamped,
};
