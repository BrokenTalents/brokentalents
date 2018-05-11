<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Vainglory Broken Talents Fun Statistics</h1>
          <h2 class="subtitle">Tilting Brawlers since May 2017</h2>
        </div>
      </div>
    </section>

    <b-tabs>
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

const reportService = new ReportService();

export default {
  name: 'app',
  data: function() {
    return {
      reportService,
    };
  },
  components: {
    BlitzTab,
    BattleRoyaleTab,
  },
};
</script>
