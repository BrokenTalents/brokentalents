import * as maps from './maps/maps';
import * as metadata from '../data/95fb1cdb/metadata.json';

const POPULAR_THRESHOLD = 1.0; // percent

const report = require('../data/95fb1cdb/report.json')
  .filter((entry) => entry.Actor != undefined); // bad data from API downtime

const reports = new Map();
const totalPicks = new Map();
const top10Relevancy = new Map();
const topPicks = new Map();
const topWins = new Map();
const topRareWins = new Map();
const topEpicWins = new Map();
const topLegendaryWins = new Map();
const topLeveledUp = new Map();
const topLeveledDown = new Map();
const topUnpopularWins = new Map();
let totalMatches = 0;
let actors = [];
const modes = metadata.config.api.modes;

for(let mode of modes) {
  const relevancy = (entry) => (entry.Count / totalPicks.get(mode)) * entry.Winner;
  const playersPerMatch = maps.playersPerMatch(mode);

  reports.set(mode, report.filter((entry) => entry.Mode == mode));
  totalPicks.set(mode, report.map((entry) => entry.Count).reduce((agg, cur) => agg + cur, 0));
  totalMatches += totalPicks.get(mode) / maps.playersPerMatch(mode);
  top10Relevancy.set(mode, reports.get(mode)
    .sort((entry1, entry2) => relevancy(entry2) - relevancy(entry1))
    .slice(0, 10));
  topPicks.set(mode, reports.get(mode).sort((entry1, entry2) => entry2.Count - entry1.Count)[0]);
  topWins.set(mode, reports.get(mode)
    .filter((entry) => 100 * playersPerMatch * entry.Count / totalPicks.get(mode) > POPULAR_THRESHOLD)
    .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
  topUnpopularWins.set(mode, reports.get(mode)
    .filter((entry) => 100 * playersPerMatch * entry.Count / totalPicks.get(mode) <= POPULAR_THRESHOLD)
    .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
  topRareWins.set(mode, reports.get(mode)
    .filter((entry) => maps.getTalentRarity(entry.Talent) == 'Rare' && 100 * playersPerMatch * entry.Count / totalPicks.get(mode))
    .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
  topEpicWins.set(mode, reports.get(mode)
    .filter((entry) => maps.getTalentRarity(entry.Talent) == 'Epic' && 100 * playersPerMatch * entry.Count / totalPicks.get(mode))
    .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
  topLegendaryWins.set(mode, reports.get(mode)
    .filter((entry) => maps.getTalentRarity(entry.Talent) == 'Legendary' && 100 * playersPerMatch * entry.Count / totalPicks.get(mode))
    .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
  topLeveledUp.set(mode, reports.get(mode)
    .filter((entry) => maps.getTalentRarity(entry.Talent) != 'None')
    .sort((entry1, entry2) => maps.getScaledLevel(entry2) - maps.getScaledLevel(entry1))[0]);
  topLeveledDown.set(mode, reports.get(mode)
    .filter((entry) => maps.getTalentRarity(entry.Talent) != 'None')
    .sort((entry1, entry2) => maps.getScaledLevel(entry1) - maps.getScaledLevel(entry2))[0]);

  if (actors.length == 0) {
    actors = [...new Set(reports.get(mode).map((entry) => entry.Actor))];
  }
}

export default {
  getReport(mode) {
    return reports.get(mode);
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

  getHighestLevelAvg(mode) {
    return topLeveledUp.get(mode);
  },

  getLowestLevelAvg(mode) {
    return topLeveledDown.get(mode);
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

  getActors() {
    return actors;
  },

  getModes() {
    return modes;
  },

  getTotalMatches() {
    return totalMatches;
  },

  getLastUpdate() {
    return metadata.lastUpdate;
  },
};
