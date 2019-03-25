<template>
  <figure class="image">
    <img :src="`/dist/assets/hero-icons/${hero.toLowerCase()}.jpg`"
         :style="round? 'border-radius: 50%' : ''"
         :alt="hero"
         :title="hero">
  </figure>
</template>

<script>
import Vue from 'vue';
import * as maps from './maps/maps';

export default Vue.component('hero-image', {
  props: [ 'actor', 'round' ],
  computed: {
    hero() {
      return maps.getHero(this.actor);
    },
  },
});
</script>
