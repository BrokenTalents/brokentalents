<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Broken Talents Fun
          </h1>
          <h2 class="subtitle">
            Tilting since 2017
          </h2>
        </div>
      </div>
    </section>

    <section>
        <b-tabs v-model="activeTab">
            <b-tab-item label="Blitz">
                <div class="tile is-ancestor">
                  <div class="tile is-parent">
                      <report-tile class="tile is-child is-warning notification"
                                   title="Overpowered!"
                                   :entry="topWins.blitz_pvp_ranked">
                        {{ Math.round(100 * topWins.blitz_pvp_ranked.Winner) }}% Win Rate
                      </report-tile>
                 </div>

                  <div class="tile is-parent">
                      <report-tile class="tile is-child is-success notification"
                                   title="Trending"
                                   :entry="topPicks.blitz_pvp_ranked">
                        {{ (100 * 6 * topPicks.blitz_pvp_ranked.Count / totalPicks.blitz_pvp_ranked).toFixed(2) }}% Pick Rate
                      </report-tile>
                  </div>
                </div>

                <h2 class="title is-2">Blitz Hero Statistics</h2>
                <report-table :report="reports.blitz_pvp_ranked" :totalPicks="totalPicks.blitz_pvp_ranked"></report-table>
            </b-tab-item>

            <b-tab-item label="Battle Royale">
                <h2 class="title is-2">Battle RoyaleHero Statistics</h2>
                <report-table :report="reports.casual_aral" :totalPicks="totalPicks.casual_aral"></report-table>
            </b-tab-item>
        </b-tabs>
    </section>
  </div>
</template>

<script>
import report from '../data/98aae7f0/report.json';
import ReportTable from './ReportTable.vue';
import ReportTile from './ReportTile.vue';

const MODES = [
  'casual_aral', 'blitz_pvp_ranked'
];

const reports = {};
const totalPicks = {};
const topPicks = {};
const topWins = {};

for(let mode of MODES) {
  reports[mode] = report.filter((entry) => entry.Mode == mode);
  totalPicks[mode] = report.map((entry) => entry.Count).reduce((agg, cur) => agg + cur, 0);
  topPicks[mode] = reports[mode].sort((entry1, entry2) => entry2.Count - entry1.Count)[0];
  topWins[mode] = reports[mode]
          .filter((entry) => 100 * 6 * entry.Count / totalPicks[mode] > 0.05)
          .sort((entry1, entry2) => entry2.Winner - entry1.Winner)[0];
}

export default {
  name: 'app',
  data: function() {
    return {
      reports,
      topPicks,
      topWins,
      totalPicks,
      activeTab: 0,
    };
  },
  components: {
    ReportTable,
    ReportTile,
  },
};
</script>
