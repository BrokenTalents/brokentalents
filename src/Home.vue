<template>
    <b-tabs v-model="tabIndex" expanded type="is-toggle">
      <b-tab-item v-for="mode in modes" :label="getMode(mode)" :key="mode">
        <mode-tab :reportService="reportService"></mode-tab>
      </b-tab-item>
    </b-tabs>
  </div>
</template>


<script>
import Vue from 'vue';
import ModeTab from './ModeTab.vue';
import * as maps from './maps/maps';

export default Vue.component('home', {
  props: [ 'reportService' ],
  data: function() {
    return {
      modes: this.reportService.getModes(),
      getMode: maps.getMode,
    };
  },
  computed: {
    tabIndex: {
      get: function() {
        return this.reportService.getModes().indexOf(this.$route.query.mode);
      },
      set: function(index) {
        const mode = this.reportService.getModes()[index];
        const query = Object.assign({}, this.$route.query, { mode: mode });
        this.$router.push({ query });
      },
    },
  },
  components: {
    ModeTab,
  },
});
</script>
