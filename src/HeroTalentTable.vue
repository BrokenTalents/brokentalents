<template>
  <div class="box">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <h3 class="title is-3">{{ getHero(selectedActor) }}</h3>
      <hero-image :actor="selectedActor" class="is-64x64"></hero-image>
    </div>

    <b-table :data="heroReport"
             :mobile-cards="false">
      <template slot-scope="props">
        <b-table-column field="Talent" label="Talent">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>{{ getTalentName(props.row.Talent) }}</span>
            <talent-image :entry="props.row" :size="48"></talent-image>
          </div>
        </b-table-column>

        <b-table-column field="Winner" label="Win Rate" sortable numeric>
          <span class="tag is-warning mdi mdi-gauge-empty mdi-18px"
                title="Very low pick rate"
                v-if="100 * playersPerMatch * props.row.Count / totalPicks < 0.5"></span>
          {{ Math.round(100 * props.row.Winner) }}%
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from 'vue';
import TalentImage from './TalentImage.vue';
import HeroImage from './HeroImage.vue';
import RouterParamMixin from './RouterParamMixin.js';
import * as maps from './maps/maps';

export default Vue.component('hero-talent-table', {
  props: [ 'reportService' ],
  mixins: [ RouterParamMixin ],
  data: function() {
    return {
      getHero: maps.getHero,
      getTalentName: maps.getTalentName,
    };
  },
  computed: {
    totalPicks: function() {
      return this.reportService.getTotalPicks(this.selectedMode);
    },
    heroReport: function() {
      return this.reportService.getReport(this.selectedMode)
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
