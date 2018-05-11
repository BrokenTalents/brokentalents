<template>
  <figure class="image is-64x64">
    <img :src="'dist/assets/talent-icons-small/' + hero + '/' + hero + '_' + rarity + '.png'" :alt="hero + ' ' + rarity">
  </figure>
</template>

<script>
import Vue from 'vue';
import * as maps from './maps/maps';

export default Vue.component('talent-image', {
  props: [ 'entry' ],
  data: function() {
    return {
      hero: maps.getHero(this.entry.Actor),
      rarity: maps.getTalentRarity(this.entry.Talent),
    };
  },
});
</script>
