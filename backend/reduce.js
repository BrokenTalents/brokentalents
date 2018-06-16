#!/usr/bin/node

const R = require('ramda'),
  utils = require('./utils');

function cleanPayloads(config) {
  return R.map(R.pipe(
    // some Talents are 'null', some are 'NoTalent'
    R.over(R.lensProp('Talent'), R.defaultTo('NoTalent')),
  ));
}

function aggregatePayloads(config) {
  // Ramda group() only groups neighbors, so sort beforehand
  const sorter  = R.props(config.group);
  const grouper = utils.eqPropses(config.group);

  const aggregator = R.pipe(
    // calculate inferred attributes
    R.map(R.apply(R.pipe, config.derived)),
    // sum & count
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
  const sorter = R.compose(R.defaultTo(0), R.prop('Winner'));

  // divide sums by counts = averages
  const transformer = R.map(
    R.converge(utils.mergeAllArgs, [
      utils.projectProps(config.group),
      utils.divPropsByProp('Count', config.sum),
      utils.projectProps(['Count']),
    ])
  );

  return R.compose(transformer, R.sortBy(sorter));
}

module.exports = {
  cleanPayloads,
  aggregatePayloads,
  deriveStatistics,
};
