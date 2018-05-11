<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <talent-box class="tile is-child is-warning notification"
                    title="Overpowered!"
                    :entry="topWin">
          {{ Math.round(100 * topWin.Winner) }}% Win Rate
        </talent-box>
      </div>

      <div class="tile is-parent">
        <talent-box class="tile is-child is-success notification"
                    title="Trending"
                    :entry="topPick">
          {{ (100 * 6 * topPick.Count / totalPicks).toFixed(2) }}% Pick Rate
        </talent-box>
      </div>
    </div>

    <h2 class="title is-2">Blitz Hero Statistics</h2>
    <report-table :report="report" :totalPicks="totalPicks"></report-table>
  </div>
</template>

<script>
import Vue from 'vue';
import ReportTable from './ReportTable.vue';
import TalentBox from './TalentBox.vue';

export default Vue.component('blitz-tab', {
  props: [ 'reportService' ],
  data: function() {
    return {
      report: this.reportService.getReport('blitz_pvp_ranked'),
      topWin: this.reportService.getTopWin('blitz_pvp_ranked'),
      topPick: this.reportService.getTopPick('blitz_pvp_ranked'),
      totalPicks: this.reportService.getTotalPicks('blitz_pvp_ranked'),
    };
  },
  computed: {
  },
  components: {
    ReportTable,
    TalentBox,
  },
});
</script>
