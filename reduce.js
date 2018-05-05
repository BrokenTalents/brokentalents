#!/usr/bin/node

const R = require('ramda'),
  utils = require('./utils');

function aggregatePayloads(config) {
  // Ramda group() only groups neighbors, so sort beforehand
  const sorter  = R.props(config.group);
  const grouper = utils.eqPropses(config.group);

  // sum & count
  const aggregator = R.pipe(
    R.sortBy(sorter),
    R.groupWith(grouper),
    R.map(
      R.converge(utils.mergeAllArgs, [
        R.pipe(
          R.project(config.group),
          R.prop(0),
        ),
        R.pipe(
          R.project(R.concat(config.sum, R.of('Count'))),
          utils.mergeAllWith(R.add),
          utils.unlist,
        ),
      ]),
    ),
  );

  return aggregator;
}

function deriveStatistics(config) {
  const sorter = R.converge(R.multiply, [
    R.prop('Winner'),
    R.prop('Count'),
  ]);

  // divide sums by counts = averages
  const transformer = R.map(
    R.converge(utils.mergeAllArgs, [
      utils.projectProps(config.group),
      utils.divPropsByProp('Count', config.sum),
      utils.projectProps(['Count']),
    ])
  );

  return R.compose(R.sortBy(sorter), transformer);
}

module.exports = {
  aggregatePayloads,
  deriveStatistics,
};
