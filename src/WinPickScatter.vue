<template>
  <section>
    <div class="block" v-show="hasTalents">
      <b-field grouped group-multiline>
        <label class="control label">Metric</label>
        <p class="control">
          <b-radio v-model="yMetric" native-value="TotalWinner">Win Rate</b-radio>
        </p>
        <p class="control">
          <b-radio v-model="yMetric" native-value="TalentWinrateBase">Level 1 Win Rate</b-radio>
        </p>
        <p class="control">
          <b-radio v-model="yMetric" native-value="TalentWinrateMax">Max Level Win Rate</b-radio>
        </p>
      </b-field>
    </div>

    <div class="block">
      <b-field grouped group-multiline>
        <label class="control label">Options</label>
        <p class="control">
          <b-checkbox v-model="fixedXRange">Fixed Range</b-checkbox>
        </p>
        <p class="control">
          <b-checkbox v-model="filterLowPickrate">Include entries without enough data</b-checkbox>
        </p>
      </b-field>
    </div>

    <div class="block">
      <label class="label">Data</label>
      <div class="plotly" ref="graph"></div>
    </div>
  </section>
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
    filterLowPickrate() {
      this.refresh();
    },
    yMetric() {
      this.refresh();
    },
    fixedXRange() {
      this.refresh();
    },
  },
  data() {
    return {
      yMetric: 'TotalWinner',
      fixedXRange: false,
    };
  },
  methods: {
    refresh() {
      const data = ReportService.getReport(this.selectedMode)
        .filter((entry) => !this.filterLowPickrate? !entry.SampleTooSmall : true);
      const total = ReportService.getTotalPicks(this.selectedMode);
      const dataWithRarity = (rarity) => data.filter((entry) => maps.getTalentRarity(entry.Talent) == rarity);

      const traces = maps.RARITIES.map((rarity) => ({
        x: dataWithRarity(rarity).map((entry) => entry[this.yMetric]),
        y: dataWithRarity(rarity).map((entry) => maps.playersPerMatch(this.selectedMode) * (entry.TotalCount || entry.Count) / total),
        text: dataWithRarity(rarity).map((entry) => maps.getHero(entry.Actor)),
        name: rarity,
        mode: 'markers',
        type: 'scatter',
      }));

      this.plot = Plotly.newPlot(this.$refs.graph, traces, {
        xaxis: {
          title: 'Win Rate',
          fixedrange: true,
          tickformat: ',.0%',
          range: this.fixedXRange? [0.25, 0.75] : undefined,
        },
        yaxis: {
          title: 'Pick Rate',
          fixedrange: true,
          tickformat: ',.0%',
        },
        margin: { t: 40, l: 40, b: 40, r: 40 },
        staticPlot: true,
        shapes: [ {
          type: 'line',
          x0: 0.40,
          y0: 0,
          x1: 0.40,
          y1: 1,
          yref: 'paper',
          line: {
            color: 'grey',
            width: 1.5,
            dash: 'dot'
          },
        }, {
          type: 'line',
          x0: 0.60,
          y0: 0,
          x1: 0.60,
          y1: 1,
          yref: 'paper',
          line: {
            color: 'grey',
            width: 1.5,
            dash: 'dot'
          }
        } ],
      }, {
        displayModeBar: false
      });
    },
    resize() {
      if (!!this.$refs.graph) {
        Plotly.Plots.resize(this.$refs.graph);
      }
    },
  }
});
</script>

<style scoped>
.plotly {
    height: 20em;
}
</style>
