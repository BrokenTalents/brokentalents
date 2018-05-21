<template>
  <div class="columns is-multiline is-mobile">
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
                  title="Hidden Gem"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topUnpopularWin.Winner)"
                  :entry="stats.topUnpopularWin" />
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

    <div class="column">
      <talent-box class="is-dark notification"
                  title="Best Rare"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topRareWin.Winner)"
                  :entry="stats.topRareWin" />
    </div>

    <div class="column">
      <talent-box class="is-dark notification"
                  title="Best Epic"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topEpicWin.Winner)"
                  :entry="stats.topEpicWin" />
    </div>

    <div class="column">
      <talent-box class="is-dark notification"
                  title="Best Legendary"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topLegendaryWin.Winner)"
                  :entry="stats.topLegendaryWin" />
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
        topUnpopularWin: this.reportService.getTopUnpopularWin(this.selectedMode),
        topPick: this.reportService.getTopPick(this.selectedMode),
        totalPicks: this.reportService.getTotalPicks(this.selectedMode),
        highestLevelAvg: this.reportService.getHighestLevelAvg(this.selectedMode),
        topRareWin: this.reportService.getTopRareWins(this.selectedMode),
        topEpicWin: this.reportService.getTopEpicWins(this.selectedMode),
        topLegendaryWin: this.reportService.getTopLegendaryWins(this.selectedMode),
        lowestLevelAvg: this.reportService.getLowestLevelAvg(this.selectedMode),
      };
    },
  },
  components: {
    TalentBox,
  },
});
</script>
