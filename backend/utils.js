#!/usr/bin/node

const R = require('ramda');

const lengthEq = (n) => R.compose(R.equals(n), R.length);
const list = R.unapply(R.identity);
const unlist = R.apply(R.identity);
const mergeAllArgs = R.compose(R.mergeAll, list);
const objOfPath = R.curry((objOf, path) => R.compose(R.objOf(objOf), R.path(path)));
const andAll = R.all(R.equals(R.T()));
const andAllArgs = R.compose(andAll, list);

const projectProps = R.curry(
  (proj, d) => R.compose(R.prop(0), R.project(proj), R.of)(d)
);

const joinRight = R.curry((mapper1, mapper2, t1, t2) => {
  let indexed = R.indexBy(mapper1, t1);
  return t2.map((t2row) => R.merge(t2row, indexed[mapper2(t2row)]));
});

const commonKeys = R.useWith(R.intersection, [
  R.keys,
  R.keys,
]);

const naturalJoinRight = R.curry((t1, t2) => joinRight(
  R.props(commonKeys(t1[0], t2[0])),
  R.props(commonKeys(t1[0], t2[0])),
  t2,
  t1,
));

const eqPropses = R.curry((props) => // TODO should create function with arity 3 but doesn't because it's nested
  R.converge(andAllArgs, R.map(R.eqProps, props))
);

const mergeAllWith = (merger) => R.until(lengthEq(1), R.pipe( // TODO same issue
  R.splitEvery(2),
  R.map(
    R.ifElse(lengthEq(2), // TODO refactor
             R.apply(R.mergeWith(merger)),
             R.apply(R.identity))
  )
));

const divPropsByProp = R.curry((prop, props, data) => { // TODO refactor
  return R.fromPairs(
    R.map((aProp) =>
          R.contains(aProp, props) ?
            [aProp, R.prop(aProp, data) / R.prop(prop, data)]
          : [aProp, R.prop(aProp, data)],
          R.keys(data),
    )
  );
});

module.exports = {
  list,
  unlist,
  mergeAllArgs,
  objOfPath,
  andAll,
  andAllArgs,
  joinRight,
  naturalJoinRight,
  eqPropses,
  lengthEq,
  mergeAllWith,
  projectProps,
  divPropsByProp,
};
