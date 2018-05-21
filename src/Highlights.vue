<template>
  <div class="columns is-multiline">
    <div class="column">
      <talent-box class="is-dark notification"
                  title="Overpowered"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topWin.Winner)"
                  :entry="stats.topWin" />
    </div>

    <div class="column">
      <talent-box class="is-dark notification"
                  title="Trending"
                  type="Total Pick Rate"
                  label="%"
                  :value="(100 * 6 * stats.topPick.Count / stats.totalPicks).toFixed(2)"
                  :entry="stats.topPick" />
    </div>

    <div class="column">
      <talent-box class="is-dark notification"
                  title="Highest Level"
                  type="Average Level"
                  :value="stats.highestLevelAvg.Level.toFixed(2)"
                  :entry="stats.highestLevelAvg" />
    </div>

    <div class="column">
      <talent-box class="is-dark notification"
                  title="Lowest Level"
                  type="Average Level"
                  :value="stats.lowestLevelAvg.Level.toFixed(2)"
                  :entry="stats.lowestLevelAvg" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import TalentBox from './TalentBox.vue';

export default Vue.component('highlights', {
  props: [ 'reportService' ],
  computed: {
    selectedMode: {
      get: function() {
        return this.$route.query.mode;
      },
    },
    stats: function() {
      return {
        topWin: this.reportService.getTopWin(this.selectedMode),
        topPick: this.reportService.getTopPick(this.selectedMode),
        totalPicks: this.reportService.getTotalPicks(this.selectedMode),
        highestLevelAvg: this.reportService.getHighestLevelAvg(this.selectedMode),
        lowestLevelAvg: this.reportService.getLowestLevelAvg(this.selectedMode),
      };
    },
  },
  components: {
    TalentBox,
  },
});
</script>
