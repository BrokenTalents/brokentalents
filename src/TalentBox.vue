<template>
  <div class="box">
    <p class="title">{{ title }}</p>
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="'dist/assets/hero-icons/' + hero + '.png'" :alt="entry.Actor">
        </figure>
        <talent-image :entry="entry"></talent-image>
      </div>
      <div class="media-content">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Vue from 'vue';
import TalentImage from './TalentImage.vue';
import * as maps from './maps/maps';

export default Vue.component('talent-box', {
  props: [ 'title', 'content', 'entry' ],
  data: function() {
    return {
      hero: maps.getHero(this.entry.Actor).toLowerCase(),
    };
  },
  components: {
    TalentImage,
  },
});
</script>
