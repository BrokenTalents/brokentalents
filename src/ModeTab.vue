<template>
  <div>
    <div class="columns is-multiline">
      <div class="column">
        <h2 class="title is-2">Highlights</h2>
        <highlights :reportService="reportService"></highlights>
      </div>

      <div class="column is-narrow">
        <h2 class="title is-2">Top 10 Talents</h2>
        <top-talents-box :reportService="reportService"></top-talents-box>
      </div>
    </div>

    <div class="columns is-multiline">
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

export default Vue.component('mode-tab', {
  props: [ 'reportService' ],
  components: {
    Highlights,
    TopTalentsBox,
    HeroDraftGrid,
    HeroTalentTable,
    ReportTable,
  },
});
</script>
