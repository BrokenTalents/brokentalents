<template>
    <div class="plotly" ref="graph"></div>
</template>

<script>
import Vue from 'vue';
import Plotly from 'plotly.js/lib/core';
import ReportService from './ReportService';
import RouterParamMixin from './RouterParamMixin';
import * as maps from './maps/maps';

Plotly.register([
]);

export default Vue.component('win-pick-scatter', {
  mixins: [ RouterParamMixin ],
  mounted() {
    this.refresh();
    window.addEventListener('resize', this.resize);
  },
  watch: {
    selectedMode() {
      this.refresh();
    },
    selectedActor() {
      this.refresh();
    },
  },
  methods: {
    refresh() {
      const data = ReportService.getReport(this.selectedMode);
      const total = ReportService.getTotalPicks(this.selectedMode);
      const dataWithRarity = (rarity) => data.filter((entry) => maps.getTalentRarity(entry.Talent) == rarity);

      const traces = maps.RARITIES.map((rarity) => ({
        x: dataWithRarity(rarity).map((entry) => entry.Winner),
        y: dataWithRarity(rarity).map((entry) => maps.playersPerMatch(this.selectedMode) * entry.Count / total),
        text: dataWithRarity(rarity).map((entry) => `${maps.getHero(entry.Actor)} ${rarity}`),
        name: rarity,
        mode: 'markers',
        type: 'scatter',
      }));

      this.plot = Plotly.newPlot(this.$refs.graph, traces, {
        xaxis: {
          title: 'Win Rate',
          fixedrange: true,
          tickformat: ',.0%',
        },
        yaxis: {
          title: 'Pick Rate',
          fixedrange: true,
          tickformat: ',.0%',
        },
        margin: { t: 40, l: 40, b: 40, r: 40 },
        staticPlot: true,
      }, {
        displayModeBar: false
      });
    },
    resize() {
      Plotly.Plots.resize(this.$refs.graph);
    },
  }
});
</script>

<style scoped>
.plotly {
    height: 20em;
}
</style>
