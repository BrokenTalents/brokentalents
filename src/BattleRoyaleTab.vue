<template>
  <div>
    <hero-search-box :reportService="reportService"></hero-search-box>

    <h2 class="title is-2">Battle Royale Hero Statistics</h2>
    <report-table :report="report" :totalPicks="totalPicks"></report-table>
  </div>
</template>

<script>
import Vue from 'vue';
import ReportTable from './ReportTable.vue';
import HeroSearchBox from './HeroSearchBox.vue';

export default Vue.component('battle-royale-tab', {
  props: [ 'reportService' ],
  data: function() {
    return {
      report: this.reportService.getReport('casual_aral'),
      totalPicks: this.reportService.getTotalPicks('casual_aral'),
    };
  },
  computed: {
  },
  components: {
    ReportTable,
    HeroSearchBox,
  },
});
</script>
