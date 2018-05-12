<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <talent-box class="tile is-child is-dark notification"
                    title="Overpowered"
                    type="Win Rate"
                    label="%"
                    :value="Math.round(100 * topWin.Winner)"
                    :entry="topWin" />
      </div>

      <div class="tile is-parent">
        <talent-box class="tile is-child is-dark notification"
                    title="Trending"
                    type="Pick Rate"
                    label="%"
                    :value="(100 * 6 * topPick.Count / totalPicks).toFixed(2)"
                    :entry="topPick" />
      </div>

      <div class="tile is-parent">
        <talent-box class="tile is-child is-dark notification"
                    title="Highest Level"
                    type="Average Level"
                    :value="(highestLevelAvg.Level).toFixed(2)"
                    :entry="highestLevelAvg" />
      </div>
      <div class="tile is-parent">
        <talent-box class="tile is-child is-dark notification"
                    title="Lowest Level"
                    type="Average Level"
                    :value="(lowestLevelAvg.Level).toFixed(2)"
                    :entry="lowestLevelAvg" />
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
      highestLevelAvg: this.reportService.getHighestLevelAvg('blitz_pvp_ranked'),
      lowestLevelAvg: this.reportService.getLowestLevelAvg('blitz_pvp_ranked')
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
