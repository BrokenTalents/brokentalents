#!/usr/bin/node

const requestP = require('request-promise')
  Future = require('fluture');

const API_KEY = process.env.API_KEY || require('./secret').apikey,
  API_BASE = 'https://api.dc01.gamelockerapp.com',
  API_TIMEOUT = 1; // seconds

const requestF = Future.encaseP(requestP);

function apiRequest(path, query) {
  return requestF({
    uri: API_BASE + path,
    headers: {
      'X-Title-Id': 'semc-vainglory',
      'Authorization': API_KEY
    },
    qs: query,
    json: true,
    gzip: true,
    forever: true,
    timeout: API_TIMEOUT*1000,
    strictSSL: true
  });
}

function awsRequest(url) {
  return requestF({
    uri: url,
    json: true,
    gzip: true,
    forever: true,
    timeout: API_TIMEOUT*1000,
    strictSSL: true
  });
}

module.exports = {
  apiRequest,
  awsRequest,
};
