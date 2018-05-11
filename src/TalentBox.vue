<template>
  <div class="box">
    <p class="title">{{ title }}</p>
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="'dist/assets/hero-icons/' + hero.toLowerCase() + '.png'" :alt="entry.Actor">
        </figure>
        <figure class="image is-64x64">
          <img :src="'dist/assets/talent-icons-small/' + hero + '/' + hero + '_' + rarity + '.png'" :alt="hero + ' ' + rarity">
        </figure>
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
import * as maps from './maps/maps';

export default Vue.component('talent-box', {
  props: [ 'title', 'content', 'entry' ],
  data: function() {
    return {
    };
  },
  computed: {
    hero: function() {
      return maps.getHero(this.entry.Actor);
    },
    rarity: function() {
      return maps.getTalentRarity(this.entry.Talent);
    },
  },
});
</script>
