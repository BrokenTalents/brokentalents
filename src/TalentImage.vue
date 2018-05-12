<template>
  <div v-if="rarity !== 'unknown' && rarity"
       class="talent-image"
       :style="`background-image: url('dist/assets/talent-icons-small/${hero}/${hero}_${rarity}.png'); width: ${size}px; height: ${size}px`">
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
  data: function() {
    return {
      hero: maps.getHero(this.entry.Actor),
      rarity: maps.getTalentRarity(this.entry.Talent),
    };
  },

  watch: {
    entry: function(newEntry, oldEntry) {
      // This is needed so component will recalculate whenever there is a change on entry
      this.hero = maps.getHero(this.entry.Actor);
      this.rarity = maps.getTalentRarity(this.entry.Talent);
    }
  }
});
</script>
