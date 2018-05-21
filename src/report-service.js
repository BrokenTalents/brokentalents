const MODES = [ 'casual_aral', 'blitz_pvp_ranked' ];

export default class ReportService {
  constructor() {
    this.report = require('../data/98aae7f0/report.json')
      .filter((entry) => entry.Actor != undefined); // bad data from API downtime

    this.reports = {};
    this.totalPicks = {};
    this.top10Relevancy = {};
    this.topPicks = {};
    this.topWins = {};
    this.topLeveledUp = {};
    this.topLeveledDown = {};
    this.actors = [];
    this.modes = MODES;

    for(let mode of MODES) {
      const relevancy = (entry) => (entry.Count / this.totalPicks[mode]) * (entry.Winner / entry.Count);

      this.reports[mode] = this.report.filter((entry) => entry.Mode == mode);
      this.totalPicks[mode] = this.report.map((entry) => entry.Count).reduce((agg, cur) => agg + cur, 0);
      this.top10Relevancy[mode] = this.reports[mode].sort((entry1, entry2) => relevancy(entry2) - relevancy(entry1)).slice(0, 10);
      this.topPicks[mode] = this.reports[mode].sort((entry1, entry2) => entry2.Count - entry1.Count)[0];
      this.topWins[mode] = this.reports[mode]
        .filter((entry) => 100 * 6 * entry.Count / this.totalPicks[mode] > 0.05)
        .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0];
      this.topLeveledUp[mode] = this.reports[mode].sort((entry1, entry2) => {
        if (!entry1.Level) return 1;
        if (!entry2.Level) return -1;
        return entry1.Level < entry2.Level ? 1 : -1;
      })[0];
      this.topLeveledDown[mode] = this.reports[mode].sort((entry1, entry2) => {
        if (!entry1.Level) return 1;
        if (!entry2.Level) return -1;

        return entry1.Level < entry2.Level ? -1 : 1;
      })[0];

      if (this.actors.length == 0) {
        this.actors = [...new Set(this.reports[mode].map((entry) => entry.Actor))];
      }
    }
  }

  getReport(mode) {
    return this.reports[mode];
  }

  getTotalPicks(mode) {
    return this.totalPicks[mode];
  }

  getTopPick(mode) {
    return this.topPicks[mode];
  }

  getTop10Picks(mode) {
    return this.top10Relevancy[mode];
  }

  getHighestLevelAvg(mode) {
    return this.topLeveledUp[mode];
  }

  getLowestLevelAvg(mode) {
    return this.topLeveledDown[mode];
  }

  getTopWin(mode) {
    return this.topWins[mode];
  }

  getActors() {
    return this.actors;
  }

  getModes() {
    return this.modes;
  }
}
