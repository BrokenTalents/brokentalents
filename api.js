#!/usr/bin/node

const requestP = require('request-promise'),
  config = require('./config'),
  Future = require('fluture'),
  FutureRetry = require('fluture-retry');

const API_KEY = process.env.API_KEY || require('./secret').apikey;

const requestF = Future.encaseP(requestP);

function apiRequest(path, query) {
  return FutureRetry.retryLinearly(requestF({
    uri: config.api.baseUrl + path,
    headers: {
      'X-Title-Id': 'semc-vainglory',
      'Authorization': API_KEY
    },
    qs: query,
    json: true,
    gzip: true,
    forever: true,
    timeout: config.api.timeout * 1000,
    strictSSL: true
  }));
}

function awsRequest(url) {
  return FutureRetry.retryLinearly(requestF({
    uri: url,
    json: true,
    gzip: true,
    forever: true,
    timeout: config.api.timeout * 1000,
    strictSSL: true
  }));
}

module.exports = {
  apiRequest,
  awsRequest,
};
