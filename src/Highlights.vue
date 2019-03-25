<template>
  <div class="columns is-multiline is-mobile">
    <div class="column" v-if="!!stats.topWin">
      <talent-box class="is-dark notification"
                  title="Overpowered"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topWin.TotalWinner)"
                  :entry="stats.topWin" />
    </div>

    <div class="column" v-if="!!stats.topPick">
      <talent-box class="is-dark notification"
                  title="Trending"
                  type="Total Pick Rate"
                  label="%"
                  :value="(100 * playersPerMatch * stats.topPick.TotalPicks / stats.totalPicks).toFixed(2)"
                  :entry="stats.topPick" />
    </div>

    <div class="column" v-if="!!stats.topLowLevel">
      <talent-box class="is-dark notification"
                  title="Beginner"
                  type="Level 1 Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topLowLevel.TalentWinrateBase)"
                  :entry="stats.topLowLevel" />
    </div>

    <div class="column" v-if="!!stats.topScaling">
      <talent-box class="is-dark notification"
                  title="Spender"
                  type="Win Rate per Level"
                  label="%"
                  :value="'+' + Math.round(100 * stats.topScaling.TalentWinrateLevelScaling)"
                  :entry="stats.topScaling" />
    </div>

    <div class="column" v-if="!!stats.topUnpopularWin">
      <talent-box class="is-dark notification"
                  title="Hidden Gem"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topUnpopularWin.TotalWinner)"
                  :entry="stats.topUnpopularWin" />
    </div>

    <div class="column" v-if="!!stats.topRareWin">
      <talent-box class="is-dark notification"
                  title="Best Rare"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topRareWin.TotalWinner)"
                  :entry="stats.topRareWin" />
    </div>

    <div class="column" v-if="!!stats.topEpicWin">
      <talent-box class="is-dark notification"
                  title="Best Epic"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topEpicWin.TotalWinner)"
                  :entry="stats.topEpicWin" />
    </div>

    <div class="column" v-if="!!stats.topLegendaryWin">
      <talent-box class="is-dark notification"
                  title="Best Legendary"
                  type="Win Rate"
                  label="%"
                  :value="Math.round(100 * stats.topLegendaryWin.TotalWinner)"
                  :entry="stats.topLegendaryWin" />
    </div>

    <div class="column" v-if="!!stats.topKillDeathPoints">
      <talent-box class="is-dark notification"
                  title="Soldier"
                  type="Kill Death Difference"
                  label=""
                  :value="'+' + stats.topKillDeathPoints.KillDeathPoints.toFixed(2)"
                  :entry="stats.topKillDeathPoints" />
    </div>

    <div class="column" v-if="!!stats.topObjectivePoints">
      <talent-box class="is-dark notification"
                  title="Trebuchet"
                  type="Objectives"
                  label=""
                  :value="stats.topObjectivePoints.ObjectivePoints.toFixed(2)"
                  :entry="stats.topObjectivePoints" />
    </div>

    <div class="column" v-if="!!stats.topBlitzPointsDelta">
      <talent-box class="is-dark notification"
                  title="Blitzkrieg"
                  type="Blitz Points"
                  label=""
                  :value="'+' + stats.topBlitzPointsDelta.BlitzPointsDelta.toFixed(2)"
                  :entry="stats.topBlitzPointsDelta" />
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
    stats() {
      return {
        topWin: ReportService.getTopWin(this.selectedMode),
        topUnpopularWin: ReportService.getTopUnpopularWin(this.selectedMode),
        topPick: ReportService.getTopPick(this.selectedMode),
        totalPicks: ReportService.getTotalPicks(this.selectedMode),
        topRareWin: ReportService.getTopRareWins(this.selectedMode),
        topEpicWin: ReportService.getTopEpicWins(this.selectedMode),
        topLegendaryWin: ReportService.getTopLegendaryWins(this.selectedMode),
        topLowLevel: ReportService.getTopLowLevel(this.selectedMode),
        topScaling: ReportService.getTopScaling(this.selectedMode),
        topKillDeathPoints: ReportService.getTopKillDeathPoints(this.selectedMode),
        topObjectivePoints: ReportService.getTopObjectivePoints(this.selectedMode),
        topBlitzPointsDelta: ReportService.getTopBlitzPointsDelta(this.selectedMode),
      };
    },
    playersPerMatch() {
      return maps.playersPerMatch(this.selectedMode);
    },
  },
  components: {
    TalentBox,
  },
});
</script>
