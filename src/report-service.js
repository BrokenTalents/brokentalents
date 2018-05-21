import * as maps from './maps/maps';

const MODES = [ 'casual_aral', 'blitz_pvp_ranked', 'ranked', '5v5_pvp_ranked' ];
const POPULAR_THRESHOLD = 0.1;

export default class ReportService {
  constructor() {
    this.report = require('../data/95fb1cdb/report.json')
      .filter((entry) => entry.Actor != undefined); // bad data from API downtime

    this.reports = new Map();
    this.totalPicks = new Map();
    this.top10Relevancy = new Map();
    this.topPicks = new Map();
    this.topWins = new Map();
    this.topRareWins = new Map();
    this.topEpicWins = new Map();
    this.topLegendaryWins = new Map();
    this.topLeveledUp = new Map();
    this.topLeveledDown = new Map();
    this.topUnpopularWins = new Map();
    this.totalMatches = 0;
    this.actors = [];
    this.modes = MODES;

    for(let mode of this.modes) {
      const relevancy = (entry) => (entry.Count / this.totalPicks.get(mode)) * entry.Winner;
      const playersPerMatch = maps.playersPerMatch(mode);

      this.reports.set(mode, this.report.filter((entry) => entry.Mode == mode));
      this.totalPicks.set(mode, this.report.map((entry) => entry.Count).reduce((agg, cur) => agg + cur, 0));
      this.totalMatches += this.totalPicks.get(mode) / maps.playersPerMatch(mode);
      this.top10Relevancy.set(mode, this.reports.get(mode)
        .sort((entry1, entry2) => relevancy(entry2) - relevancy(entry1))
        .slice(0, 10));
      this.topPicks.set(mode, this.reports.get(mode).sort((entry1, entry2) => entry2.Count - entry1.Count)[0]);
      this.topWins.set(mode, this.reports.get(mode)
        .filter((entry) => 100 * playersPerMatch * entry.Count / this.totalPicks.get(mode) > POPULAR_THRESHOLD)
        .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
      this.topUnpopularWins.set(mode, this.reports.get(mode)
        .filter((entry) => 100 * playersPerMatch * entry.Count / this.totalPicks.get(mode) <= POPULAR_THRESHOLD)
        .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
      this.topRareWins.set(mode, this.reports.get(mode)
        .filter((entry) => maps.getTalentRarity(entry.Talent) == 'Rare' && 100 * playersPerMatch * entry.Count / this.totalPicks.get(mode) > POPULAR_THRESHOLD)
        .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
      this.topEpicWins.set(mode, this.reports.get(mode)
        .filter((entry) => maps.getTalentRarity(entry.Talent) == 'Epic' && 100 * playersPerMatch * entry.Count / this.totalPicks.get(mode) > POPULAR_THRESHOLD)
        .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
      this.topLegendaryWins.set(mode, this.reports.get(mode)
        .filter((entry) => maps.getTalentRarity(entry.Talent) == 'Legendary' && 100 * playersPerMatch * entry.Count / this.totalPicks.get(mode) > POPULAR_THRESHOLD)
        .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0]);
      this.topLeveledUp.set(mode, this.reports.get(mode).sort((entry1, entry2) => {
        if (!entry1.Level) return 1;
        if (!entry2.Level) return -1;
        return entry1.Level < entry2.Level ? 1 : -1;
      })[0]);
      this.topLeveledDown.set(mode, this.reports.get(mode).sort((entry1, entry2) => {
        if (!entry1.Level) return 1;
        if (!entry2.Level) return -1;

        return entry1.Level < entry2.Level ? -1 : 1;
      })[0]);

      if (this.actors.length == 0) {
        this.actors = [...new Set(this.reports.get(mode).map((entry) => entry.Actor))];
      }
    }
  }

  getReport(mode) {
    return this.reports.get(mode);
  }

  getTotalPicks(mode) {
    return this.totalPicks.get(mode);
  }

  getTopPick(mode) {
    return this.topPicks.get(mode);
  }

  getTop10Picks(mode) {
    return this.top10Relevancy.get(mode);
  }

  getHighestLevelAvg(mode) {
    return this.topLeveledUp.get(mode);
  }

  getLowestLevelAvg(mode) {
    return this.topLeveledDown.get(mode);
  }

  getTopWin(mode) {
    return this.topWins.get(mode);
  }

  getTopUnpopularWin(mode) {
    return this.topUnpopularWins.get(mode);
  }

  getTopRareWins(mode) {
    return this.topRareWins.get(mode);
  }

  getTopEpicWins(mode) {
    return this.topEpicWins.get(mode);
  }

  getTopLegendaryWins(mode) {
    return this.topLegendaryWins.get(mode);
  }

  getBestUnpopular(mode) {
    return this.topUnpopular.get(mode);
  }

  getActors() {
    return this.actors;
  }

  getModes() {
    return this.modes;
  }

  getTotalMatches() {
    return this.totalMatches;
  }
}
