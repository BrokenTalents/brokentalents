import * as maps from './maps/maps';
import * as metadata from '../data/55606a1e/metadata.json';
import * as baseStats from '../data/vainglory.json'; // Thanks to https://github.com/oberocks/vainglory-base-stats
import * as R from 'ramda';

const POPULAR_THRESHOLD = 1.0; // percent
const PICKS_THRESHOLD = 300; // picks
const VARIANCE_THRESHOLD = 0.25; // % minimum accuracy

const report = require('../data/55606a1e/report.json')
  .filter((entry) => entry.Actor != undefined); // bad data from API downtime

const reports = new Map();
const totalPicks = new Map();
const top10Relevancy = new Map();
const topPicks = new Map();
const topWins = new Map();
const topRareWins = new Map();
const topEpicWins = new Map();
const topLegendaryWins = new Map();
const topLowLevel = new Map();
const topScaling = new Map();
const topUnpopularWins = new Map();
const topKillDeathPoints = new Map();
const topObjectivePoints = new Map();
const topBlitzPointsDelta = new Map();
const summaries = new Map();
let totalMatches = 0;
let actors = [];
const modes = metadata.config.api.modes;

for(let mode of modes) {
  const relevancy = (entry) => (entry.TotalPicks / totalPicks.get(mode)) * entry.TotalWinner;
  const playersPerMatch = maps.playersPerMatch(mode);

  const reportFilterMode = report.filter((entry) => entry.Mode == mode);

  const baseLevelForEntry = (entry) => reportFilterMode
    .filter((entry2) => entry2.Actor == entry.Actor &&
      entry2.Talent == entry.Talent)
    .map((entry2) => entry2.LevelBucket)
    .reduce((agg, cur) => cur < agg? cur : agg);

  const reportFilterModeBaseLevel = reportFilterMode.filter((entry) => entry.LevelBucket == baseLevelForEntry(entry));

  // using the "base level" (bucket 0) report, add information about diff to 'NoTalent' and scaling
  const reportFilterModeRegressed = reportFilterModeBaseLevel.map((entry) => {
    const sum = (agg, cur) => agg + cur;
    const range = (n) => [...Array(n).keys()];

    // perform a weighted linear regression. x: level bucket (scaled 0 - 1) y: win rate weights: picks
    const actorReport = reportFilterMode
      .filter((entry2) =>
        entry2.Actor == entry.Actor &&
        entry2.Talent == entry.Talent &&
        entry2.LevelBucket >= 0);
    const buckets = actorReport.map((entry) => entry.LevelBucket).sort();
    const findActorWithBucket = (bucket) => actorReport.find((entry) => entry.LevelBucket == bucket);
    const weights = buckets.map((bucket) => findActorWithBucket(bucket).Count);
    const sum_weights = weights.reduce(sum, 0);
    const xs = [].concat(...buckets.map((bucket, index) => range(weights[index]).map((_) => bucket / metadata.config.self.levelBuckets)));
    const ys = [].concat(...buckets.map((bucket, index) => range(weights[index]).map((_) => findActorWithBucket(bucket).Winner)));
    const n = xs.length;
    const sum_x = xs.reduce(sum, 0);
    const sum_y = ys.reduce(sum, 0);
    const sum_xy = xs.map((x, index) => x * ys[index]).reduce(sum, 0);
    const sum_xx = xs.map((x) => x * x).reduce(sum, 0);
    const sum_yy = ys.map((y) => y * y).reduce(sum, 0);

    const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    const intercept = (sum_y - slope * sum_x) / n;

    // sum (actual - average)^2
    const sstot = ys.map((y) => Math.pow(y - sum_y / n, 2)).reduce(sum, 0);
    // sum (actual - estimated)^2
    const ssres = ys.map((y, index) => Math.pow((intercept + slope * xs[index]) - y, 2)).reduce(sum, 0);
    // r^2 is also correlation coefficient ^ 2
    const rsquare = 1 - ssres / sstot;

    const hero = maps.getHero(entry.Actor);
    const baseStat = baseStats.heroes[hero.toLowerCase()];
    const rateClass = (r) => {
      let heroClass = '';
      if (r.team_utility > r.offense) {
        if (r.defense > r.team_utility) heroClass += 'Tank';
        else heroClass += 'Healer';
      } else {
        if (r.offense > r.defense) heroClass += 'Squishy';
        else heroClass += 'Warrior';
      }
      return heroClass;
    };

    return Object.assign({}, entry, {
      _Count: 1, // TODO find a cleaner solution to convert the sum of relatives to absolutes in summaries
      Hero: hero,
      AttackType: baseStat.attack_type,
      Difficulty: baseStat.difficulty,
      HeroClass: rateClass(baseStat.ratings),
      HeroSpeed: baseStat.ratings.mobility < 3 ? 'Slow' : baseStat.ratings.mobility < 6 ? 'Average' : 'Fast',
      PrimaryRole: baseStat.primary_role,
      Rarity: maps.getTalentRarity(entry.Talent),
      TalentWinrateBase: intercept || entry.Winner,
      TalentWinrateScaling: slope || 0, // to 1 = max level
      TalentWinrateMax: (intercept + slope) || entry.Winner,
      TalentWinrateLevelScaling: (slope / maps.getMaxLevel(entry)) || 0,
      TalentWinrateVariance: rsquare || 0,
      TotalPicks: sum_weights || entry.Count, // NoTalent has no weights
      TotalWinner: sum_y / sum_weights || entry.Winner,
      SampleTooSmall: sum_weights < PICKS_THRESHOLD,
      KillDeathPoints: maps.killDeathPoints(entry),
      ObjectivePoints: maps.objectivePoints(entry),
      BlitzPointsDelta: maps.blitzPointsDelta(entry),
      VarianceTooLarge: rsquare < VARIANCE_THRESHOLD,
    });
  });
  reports.set(mode, reportFilterModeRegressed);

  totalPicks.set(mode, reports.get(mode)
    .map((entry) => entry.TotalPicks)
    .reduce((agg, cur) => agg + cur, 0));
  totalMatches += totalPicks.get(mode) / maps.playersPerMatch(mode);
  top10Relevancy.set(mode, reports.get(mode)
    .sort((entry1, entry2) => relevancy(entry2) - relevancy(entry1))
    .slice(0, 10));
  topPicks.set(mode, reports.get(mode).sort((entry1, entry2) => entry2.TotalPicks - entry1.TotalPicks)[0]);
  topWins.set(mode, reports.get(mode)
    .filter((entry) => 100 * playersPerMatch * entry.TotalPicks / totalPicks.get(mode) > POPULAR_THRESHOLD)
    .sort((entry1, entry2) => entry2.TotalWinner - entry1.TotalWinner)[0]);
  topUnpopularWins.set(mode, reports.get(mode)
    .filter((entry) => 100 * playersPerMatch * entry.TotalPicks / totalPicks.get(mode) <= POPULAR_THRESHOLD &&
      entry.TotalPicks > PICKS_THRESHOLD)
    .sort((entry1, entry2) => entry2.TotalWinner - entry1.TotalWinner)[0]);
  topRareWins.set(mode, reports.get(mode)
    .filter((entry) => entry.Rarity == 'Rare' && 100 * playersPerMatch * entry.TotalPicks / totalPicks.get(mode))
    .sort((entry1, entry2) => entry2.TotalWinner - entry1.TotalWinner)[0]);
  topEpicWins.set(mode, reports.get(mode)
    .filter((entry) => entry.Rarity == 'Epic' && 100 * playersPerMatch * entry.TotalPicks / totalPicks.get(mode))
    .sort((entry1, entry2) => entry2.TotalWinner - entry1.TotalWinner)[0]);
  topLegendaryWins.set(mode, reports.get(mode)
    .filter((entry) => entry.Rarity == 'Legendary' && 100 * playersPerMatch * entry.TotalPicks / totalPicks.get(mode))
    .sort((entry1, entry2) => entry2.TotalWinner - entry1.TotalWinner)[0]);
  topLowLevel.set(mode, reports.get(mode)
    .filter((entry) => !entry.SampleTooSmall && !entry.VarianceTooLarge && !!entry.TalentWinrateBase)
    .sort((entry1, entry2) => entry2.TalentWinrateBase - entry1.TalentWinrateBase)[0]);
  topScaling.set(mode, reports.get(mode)
    .filter((entry) => !entry.SampleTooSmall && !entry.VarianceTooLarge && !!entry.TalentWinrateLevelScaling)
    .sort((entry1, entry2) => entry2.TalentWinrateLevelScaling - entry1.TalentWinrateLevelScaling)[0]);
  topKillDeathPoints.set(mode, reports.get(mode)
    .filter((entry) => !entry.SampleTooSmall && !entry.VarianceTooLarge && !!entry.KillDeathPoints)
    .sort((entry1, entry2) => entry2.KillDeathPoints - entry1.KillDeathPoints)[0]);
  topObjectivePoints.set(mode, reports.get(mode)
    .filter((entry) => !entry.SampleTooSmall && !entry.VarianceTooLarge && !!entry.ObjectivePoints)
    .sort((entry1, entry2) => entry2.ObjectivePoints - entry1.ObjectivePoints)[0]);
  topBlitzPointsDelta.set(mode, reports.get(mode)
    .filter((entry) => !entry.SampleTooSmall && !entry.VarianceTooLarge && !!entry.BlitzPointsDelta)
    .sort((entry1, entry2) => entry2.BlitzPointsDelta - entry1.BlitzPointsDelta)[0]);

  const addOrIdentity = (a, b) => R.is(String, a) ? a : R.add(a, b);
  const summarizeByProp = (propName) => new Map(Object.entries(
    R.reduceBy(R.mergeWith(addOrIdentity), 0, R.prop(propName), reports.get(mode))
  ));
  summaries.set(mode, [ {
    'key': 'Rarity',
    'name': 'Talent Rarity',
    'data': [...summarizeByProp('Rarity').values()],
  }, {
    'key': 'Difficulty',
    'name': 'Difficulty',
    'data': [...summarizeByProp('Difficulty').values()],
  }, {
    'key': 'PrimaryRole',
    'name': 'Primary Role',
    'data': [...summarizeByProp('PrimaryRole').values()],
  }, {
    'key': 'AttackType',
    'name': 'Attack Type',
    'data': [...summarizeByProp('AttackType').values()],
  }, {
    'key': 'HeroSpeed',
    'name': 'Speed',
    'data': [...summarizeByProp('HeroSpeed').values()],
  }, {
    'key': 'HeroClass',
    'name': 'Class',
    'data': [...summarizeByProp('HeroClass').values()],
  } ]);

  if (actors.length == 0) {
    actors = [...new Set(reports.get(mode).map((entry) => entry.Actor))];
  }
}

export default {
  getReport(mode) {
    return reports.get(mode);
  },

  getCsv(mode) {
    return 'Hero,Talent,Rarity,Kills,Deaths,TurretKills,' +
      'AverageWinrate,BaseLevelWinrate,MaxLevelWinrate,LevelWinrateVariance,Wins,Picks' +
      '\n' +
      reports.get(mode)
      .map((entry) => [
        entry.Hero,
        maps.getTalentName(entry.Talent),
        maps.getTalentRarity(entry.Talent),
        entry.Kills,
        entry.Deaths,
        /*
        entry.CrystalMinerKills,
        entry.GoldMinerKills,
        */
        entry.TurretKills,
        entry.TotalWinner,
        entry.TalentWinrateBase || entry.TotalWinner,
        entry.TalentWinrateMax || entry.TotalWinner,
        entry.TalentWinrateVariance || entry.TotalWinner,
        entry.TotalWinner * entry.TotalPicks,
        entry.TotalPicks,
      ].join(','))
    .join('\n');
  },

  getTotalPicks(mode) {
    return totalPicks.get(mode);
  },

  getTopPick(mode) {
    return topPicks.get(mode);
  },

  getTop10Picks(mode) {
    return top10Relevancy.get(mode);
  },

  getTopLowLevel(mode) {
    return topLowLevel.get(mode);
  },

  getTopScaling(mode) {
    return topScaling.get(mode);
  },

  getTopWin(mode) {
    return topWins.get(mode);
  },

  getTopUnpopularWin(mode) {
    return topUnpopularWins.get(mode);
  },

  getTopRareWins(mode) {
    return topRareWins.get(mode);
  },

  getTopEpicWins(mode) {
    return topEpicWins.get(mode);
  },

  getTopLegendaryWins(mode) {
    return topLegendaryWins.get(mode);
  },

  getBestUnpopular(mode) {
    return topUnpopular.get(mode);
  },

  getTopKillDeathPoints(mode) {
    return topKillDeathPoints.get(mode);
  },

  getTopObjectivePoints(mode) {
    return topObjectivePoints.get(mode);
  },

  getTopBlitzPointsDelta(mode) {
    return topBlitzPointsDelta.get(mode);
  },

  getSummaries(mode) {
    return summaries.get(mode);
  },

  getActors() {
    return actors;
  },

  getModes() {
    return modes;
  },

  getTotalMatches() {
    return totalMatches;
  },

  getPatchVersion() {
    return metadata.config.api.patchVersion;
  },

  getLastUpdate() {
    return metadata.lastUpdate;
  },

  getLevelBuckets() {
    return metadata.config.self.levelBuckets;
  },
};
