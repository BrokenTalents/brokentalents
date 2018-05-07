# brokentalents.fun

## Setup

 * `npm install`
 * create backend/secret.js as `module.exports.apikey = 'yourapikey';` or export the env var `API_KEY=""`

## Updating the data

`npm run backend`

## Overview

![backend flowchart](assets/backend-flow.png)

The `/matches` endpoint is called in equidistant intervals for a small set of matches. An hour of each set is aggregated and stored in a timestamped json. All timestamped jsons are aggregated and generate the output report json.

The code was written with [Ramda](https://ramdajs.com) as an excercise in functional programming with JavaScript.
