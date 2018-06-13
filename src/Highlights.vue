<template>
  <div class="columns is-multiline is-mobile">
    <div class="column" v-if="!!stats.topWin">
      <talent-box class="is-dark notification"
                  title="Overpowered"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topWin.Winner)"
                  :entry="stats.topWin" />
    </div>

    <div class="column" v-if="!!stats.topPick">
      <talent-box class="is-dark notification"
                  title="Trending"
                  type="Total Pick Rate"
                  label="%"
                  :value="(100 * playersPerMatch * stats.topPick.Count / stats.totalPicks).toFixed(2)"
                  :entry="stats.topPick" />
    </div>

    <div class="column" v-if="!!stats.topUnpopularWin">
      <talent-box class="is-dark notification"
                  title="Hidden Gem"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topUnpopularWin.Winner)"
                  :entry="stats.topUnpopularWin" />
    </div>

    <div class="column" v-if="!!stats.highestLevelAvg">
      <talent-box class="is-dark notification"
                  title="Highest Level"
                  type="Average Level"
                  :value="stats.highestLevelAvg.Level.toFixed(2)"
                  :entry="stats.highestLevelAvg" />
    </div>

    <div class="column" v-if="!!stats.lowestLevelAvg">
      <talent-box class="is-dark notification"
                  title="Lowest Level"
                  type="Average Level"
                  :value="stats.lowestLevelAvg.Level.toFixed(2)"
                  :entry="stats.lowestLevelAvg" />
    </div>

    <div class="column" v-if="!!stats.topRareWin">
      <talent-box class="is-dark notification"
                  title="Best Rare"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topRareWin.Winner)"
                  :entry="stats.topRareWin" />
    </div>

    <div class="column" v-if="!!stats.topEpicWin">
      <talent-box class="is-dark notification"
                  title="Best Epic"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topEpicWin.Winner)"
                  :entry="stats.topEpicWin" />
    </div>

    <div class="column" v-if="!!stats.topLegendaryWin">
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
import RouterParamMixin from './RouterParamMixin';
import ReportService from './ReportService';
import * as maps from './maps/maps.js';

export default Vue.component('highlights', {
  mixins: [ RouterParamMixin ],
  computed: {
    stats: function() {
      return {
        topWin: ReportService.getTopWin(this.selectedMode),
        topUnpopularWin: ReportService.getTopUnpopularWin(this.selectedMode),
        topPick: ReportService.getTopPick(this.selectedMode),
        totalPicks: ReportService.getTotalPicks(this.selectedMode),
        highestLevelAvg: ReportService.getHighestLevelAvg(this.selectedMode),
        topRareWin: ReportService.getTopRareWins(this.selectedMode),
        topEpicWin: ReportService.getTopEpicWins(this.selectedMode),
        topLegendaryWin: ReportService.getTopLegendaryWins(this.selectedMode),
        lowestLevelAvg: ReportService.getLowestLevelAvg(this.selectedMode),
      };
    },
    playersPerMatch: function() {
      return maps.playersPerMatch(this.selectedMode);
    },
  },
  components: {
    TalentBox,
  },
});
</script>
