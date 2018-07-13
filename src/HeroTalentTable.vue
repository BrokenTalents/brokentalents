<template>
  <div class="box">
    <div class="columns is-mobile">
      <div class="column is-one-quarter">
        <hero-image :actor="selectedActor" class="is-64x64"></hero-image>
      </div>
      <div class="column has-text-centered">{{ (100 * heroReport[0].Winner).toFixed(0) }}% Win&nbsp;Rate</div>
      <div class="column has-text-centered">{{ (100 * totalHeroPicks / totalPicks * playersPerMatch).toFixed(0) }}% Pick&nbsp;Rate</div>
    </div>

    <b-table v-show="hasTalents"
             :data="heroReport"
             :mobile-cards="false">
      <template slot-scope="props" slot="header">
        <b-tooltip :active="!!props.column.meta" :label="props.column.meta || ''" position="is-bottom" dashed>
          {{ props.column.label }}
        </b-tooltip>
      </template>

      <template slot-scope="props">
        <b-table-column field="Talent" label="Talent">
          <talent-image :entry="props.row" :size="48"></talent-image>
        </b-table-column>

        <b-table-column field="TalentWinrateBase" label="Level 1 Win Rate" meta="Estimated." sortable numeric>
          <template v-if="isNaN(props.row.TalentWinrateBase)">
            {{ (100 * props.row.Winner).toFixed(0) }}% <!-- No Talent -->
          </template>
          <template v-else>
            {{ (100 * props.row.TalentWinrateBase).toFixed(0) }}%
          </template>
          <small v-if="props.row.SampleTooSmall"><br />uncertain</small>
        </b-table-column>

        <b-table-column field="TalentWinrateMax" label="Max Level Win Rate" meta="Estimated." sortable numeric>
          <template v-if="!isNaN(props.row.TalentWinrateMax)">
            {{ (100 * props.row.TalentWinrateMax).toFixed(0) }}%
            <small v-if="props.row.SampleTooSmall || props.row.VarianceTooLarge"><br />uncertain</small>
          </template>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from 'vue';
import TalentImage from './TalentImage.vue';
import HeroImage from './HeroImage.vue';
import RouterParamMixin from './RouterParamMixin';
import ReportService from './ReportService';
import * as maps from './maps/maps';

export default Vue.component('hero-talent-table', {
  mixins: [ RouterParamMixin ],
  data: function() {
    return {
      getTalentName: maps.getTalentName,
      getLevelBuckets: ReportService.getLevelBuckets,
      getLevelsPerBucket: (entry) => maps.getMaxLevel(entry) / this.getLevelBuckets(),
    };
  },
  computed: {
    hasTalents: function() {
      return maps.hasTalents(this.selectedMode);
    },
    totalPicks: function() {
      return ReportService.getTotalPicks(this.selectedMode);
    },
    heroReport: function() {
      return ReportService.getReport(this.selectedMode)
          .filter((entry) => entry.Actor == this.selectedActor)
          .sort((entry1, entry2) => maps.getTalentRarityIndex(entry1.Talent) - maps.getTalentRarityIndex(entry2.Talent));
    },
    totalHeroPicks: function() {
      return this.heroReport
        .map((entry) => entry.Count)
        .reduce((agg, cur) => agg + cur, 0);
    },
    playersPerMatch: function() {
      return maps.playersPerMatch(this.selectedMode);
    },
  },
  components: {
    TalentImage,
    HeroImage,
  },
});
</script>
