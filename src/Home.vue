<template>
    <b-tabs v-model="tabIndex" expanded  type="is-toggle" >
      <b-tab-item label="Blitz">
        <blitz-tab :reportService="reportService"></blitz-tab>
      </b-tab-item>

      <b-tab-item label="Battle Royale">
        <battle-royale-tab :reportService="reportService"></battle-royale-tab>
      </b-tab-item>
    </b-tabs>
  </div>
</template>


<script>
import Vue from 'vue';
import BlitzTab from './BlitzTab.vue';
import BattleRoyaleTab from './BattleRoyaleTab.vue';
import ReportService from './report-service.js';

export default Vue.component('home', {
  props: [ 'reportService' ],
  data: function() {
    return {
    };
  },
  computed: {
    tabIndex: {
      get: function() {
        return this.$route.query.tab;
      },
      set: function(value) {
        this.$router.push({ query: { tab: value }});
      },
    },
  },
  components: {
    BlitzTab,
    BattleRoyaleTab,
  },
});
</script>
