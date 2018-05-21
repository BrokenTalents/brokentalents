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
import RouterParamMixin from './RouterParamMixin.js';
import * as maps from './maps/maps';

export default Vue.component('home', {
  props: [ 'reportService' ],
  mixins: [ RouterParamMixin ],
  data: function() {
    return {
      modes: this.reportService.getModes(),
      getMode: maps.getMode,
    };
  },
  computed: {
    tabIndex: {
      get: function() {
        return this.reportService.getModes().indexOf(this.selectedMode);
      },
      set: function(index) {
        const mode = this.reportService.getModes()[index];
        this.selectedMode = mode;
      },
    },
  },
  components: {
    ModeTab,
  },
});
</script>
