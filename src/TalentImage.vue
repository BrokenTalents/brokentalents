<template>
  <div v-if="rarity != 'None'"
       class="talent-image"
       :style="`background-image: url('/dist/assets/talent-icons-small/${hero}/${hero}_${rarity}.jpg'); width: ${size}px; height: ${size}px`"
       :alt="`${hero} ${rarity}`"
       :title="`${hero} ${rarity}`">
  </div>
</template>

<style scoped>
  .talent-image {
    background-size: 230%;
    border-radius: 50%;
    background-position: center center;
  }
</style>


<script>
import Vue from 'vue';
import * as maps from './maps/maps';

export default Vue.component('talent-image', {
  props: [ 'entry', 'size' ],
  computed: {
    hero() {
      return maps.getHero(this.entry.Actor);
    },
    rarity() {
      return maps.getTalentRarity(this.entry.Talent);
    },
  },
});
</script>
