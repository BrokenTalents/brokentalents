<template>
  <div class="box">
    <div class="columns is-mobile is-multiline is-centered">
      <div class="column is-narrow" v-for="actor in actors" :key="actor">
        <a v-on:click="selectedActor = actor">
          <hero-image :actor="actor" :class="'is-48x48 ' + (selectedActor == actor? 'highlight-selection' : '')"></hero-image>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/base/_all';
@import '~bulma/sass/elements/button.sass';

.highlight-selection {
  border-color: $button-focus-border-color;
  color: $button-focus-color;
  box-shadow: $button-focus-box-shadow-size $button-focus-box-shadow-color;
  transform: scale(1.25);
}
</style>

<script>
import Vue from 'vue';
import TalentImage from './TalentImage.vue';
import HeroImage from './HeroImage.vue';
import RouterParamMixin from './RouterParamMixin';
import ReportService from './ReportService';
import * as maps from './maps/maps';

export default Vue.component('hero-draft-grid', {
  mixins: [ RouterParamMixin ],
  data() {
    return {
      actors: ReportService.getActors().sort(),
      getHero: maps.getHero,
      getTalentName: maps.getTalentName,
    };
  },
  components: {
    TalentImage,
    HeroImage,
  },
});
</script>
