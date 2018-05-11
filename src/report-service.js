const MODES = [ 'casual_aral', 'blitz_pvp_ranked' ];

export default class ReportService {
  constructor() {
    this.report = require('../data/98aae7f0/report.json');

    this.reports = {};
    this.totalPicks = {};
    this.topPicks = {};
    this.topWins = {};

    for(let mode of MODES) {
      this.reports[mode] = this.report.filter((entry) => entry.Mode == mode);
      this.totalPicks[mode] = this.report.map((entry) => entry.Count).reduce((agg, cur) => agg + cur, 0);
      this.topPicks[mode] = this.reports[mode].sort((entry1, entry2) => entry2.Count - entry1.Count)[0];
      this.topWins[mode] = this.reports[mode]
        .filter((entry) => 100 * 6 * entry.Count / this.totalPicks[mode] > 0.05)
        .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0];
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

  getTopWin(mode) {
    return this.topWins[mode];
  }
}
