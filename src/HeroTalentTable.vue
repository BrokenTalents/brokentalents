<template>
  <div class="box">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <hero-image :actor="selectedActor" class="is-64x64"></hero-image>
    </div>

    <b-table :data="heroReport"
             :mobile-cards="false">
      <template slot-scope="props">
        <b-table-column field="Talent" label="Talent">
          <talent-image :entry="props.row" :size="48"></talent-image>
        </b-table-column>

        <b-table-column field="Winner" label="Level 1 Win Rate" sortable numeric>
          <template v-if="isNaN(props.row.TalentWinrateBase)">
            {{ (100 * props.row.Winner).toFixed(2) }}%
          </template>
          <template v-else>
            {{ (100 * props.row.TalentWinrateBase).toFixed(2) }}%
          </template>
        </b-table-column>

        <b-table-column field="TalentWinrateScaling" label="Win Rate Advantage" sortable numeric>
          <template v-if="isNaN(props.row.TalentWinrateScaling) || props.row.SampleTooSmall">
            <span class="mdi mdi-gauge-empty mdi-18px" title="Not enough data"></span>
          </template>
          <template v-else>
            {{ (props.row.TalentWinrateScaling > 0? '+' : '') + (100 * props.row.TalentWinrateScaling / getLevelBuckets()).toFixed(2) }}% <small>for {{ getLevelsPerBucket(props.row) + (getLevelsPerBucket(props.row) > 1? ' Levels' : ' Level') }}</small>
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
    totalPicks: function() {
      return ReportService.getTotalPicks(this.selectedMode);
    },
    heroReport: function() {
      return ReportService.getReport(this.selectedMode)
          .filter((entry) => entry.Actor == this.selectedActor);
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
