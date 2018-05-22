<template>
  <div>
    <intro-box></intro-box>

    <div class="columns is-multiline">
      <div class="column" v-if="hasTalents">
        <h2 class="title is-2">Highlights</h2>
        <highlights :reportService="reportService"></highlights>
      </div>

      <div class="column is-narrow">
        <h2 class="title is-2">Top 10</h2>
        <top-talents-box :reportService="reportService"></top-talents-box>
      </div>
    </div>

    <div class="columns is-multiline" v-if="hasTalents">
      <h2 class="title is-2">Individual Hero Statistics</h2>
      <div class="column is-two-thirds">
        <hero-draft-grid :reportService="reportService"></hero-draft-grid>
      </div>
      <div class="column is-one-third">
        <hero-talent-table :reportService="reportService"></hero-talent-table>
      </div>
    </div>

    <div>
      <h2 class="title is-2">All Hero Statistics</h2>
      <report-table :reportService="reportService"></report-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Highlights from './Highlights.vue';
import TopTalentsBox from './TopTalentsBox.vue';
import HeroDraftGrid from './HeroDraftGrid.vue';
import HeroTalentTable from './HeroTalentTable.vue';
import ReportTable from './ReportTable.vue';
import RouterParamMixin from './RouterParamMixin';
import IntroBox from './IntroBox.vue';
import * as maps from './maps/maps.js';

export default Vue.component('mode-tab', {
  props: [ 'reportService' ],
  mixins: [ RouterParamMixin ],
  computed: {
    hasTalents: function() {
      return maps.hasTalents(this.selectedMode);
    },
  },
  components: {
    Highlights,
    TopTalentsBox,
    HeroDraftGrid,
    HeroTalentTable,
    ReportTable,
    IntroBox,
  },
});
</script>
