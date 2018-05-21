<template>
<div>
  <p class="title-box">{{ title }}</p>
  <div class="columns is-mobile">
    <div class="column is-centered">
      <figure class="image is-64x64 hero-image-slot">
        <img class="hero-image" :src="'dist/assets/hero-icons/' + hero.toLowerCase() + '.png'" :alt="entry.Actor">
      </figure>
      <p class="hero-name">{{ hero }}</p>
    </div>
    <div class="column value is-centered">
      <talent-image :entry="entry" :size="64"></talent-image>
        {{ value }}{{ label }}
        <div class="type">{{ type }}</div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.title-box {
  font-size: 20px;
  text-transform: uppercase;
}
.is-centered {
  display: flex;
  /* flex-align: center; */
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
}

.hero-image-slot {
  display: inline-block;
}

.hero-image {
  /* width: 128px;
    height: 128px; */
  /* border-radius: 50%; */
  overflow: hidden;
  border: 5px solid rgba(27, 40, 56, 0.1);
}

.hero-name {
  font-size: 18px;
}

.value {
  font-size: 24px;
  text-align: center;
}
.value .type {
  position: absolute;
  bottom: 5px;
  font-size: 14px;
}
</style>


<script>
import Vue from 'vue';
import TalentImage from './TalentImage.vue';
import * as maps from './maps/maps';

export default Vue.component('talent-box', {
  props: ['title', 'content', 'entry', 'type', 'value', 'label'],
  computed: {
    hero: function() {
      return maps.getHero(this.entry.Actor);
    },
  },
  components: {
    TalentImage,
  }
});
</script>
