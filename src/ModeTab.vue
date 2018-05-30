<template>
  <div>
    <intro-box></intro-box>

    <div class="columns is-multiline">
      <div class="column" v-if="hasTalents">
        <h2 class="title is-2">Highlights</h2>
        <highlights></highlights>
      </div>

      <div class="column is-narrow">
        <h2 class="title is-2">Top 10</h2>
        <top-talents-box></top-talents-box>
      </div>
    </div>

    <Adsense class="adsense"
      data-ad-client="ca-pub-6856963757796636"
      data-ad-slot="3898218968">
    </Adsense>

    <div class="columns is-multiline" v-if="hasTalents">
      <div class="column is-two-thirds">
        <h2 class="title is-2">Individual Hero Statistics</h2>
        <h3 class="subtitle">Select a Hero</h3>
        <hero-draft-grid></hero-draft-grid>
      </div>
      <div class="column is-one-third">
        <h2 class="title is-2">{{ getHero(selectedActor) }} Statistics</h2>
        <hero-talent-table></hero-talent-table>
      </div>
    </div>

    <Adsense class="adsense"
      data-ad-client="ca-pub-6856963757796636"
      data-ad-slot="4801023518">
    </Adsense>

    <div>
      <h2 class="title is-2">All Hero Statistics</h2>
      <report-table></report-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adsense {
  margin-top: 2em;
  margin-bottom: 2.5em;
}
</style>

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
  mixins: [ RouterParamMixin ],
  data: function() {
    return {
      getHero: maps.getHero,
    };
  },
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
