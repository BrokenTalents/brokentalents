<template>
<div>
  <p class="title-box">{{ title }}</p>
  <div class="columns is-mobile">
    <div class="column is-centered">
      <hero-image :actor="entry.Actor" class="is-64x64 hero-image-slot"></hero-image>
      <span class="hero-name">{{ hero }}</span>
    </div>
    <div class="column value is-centered">
      <talent-image v-if="hasTalent" :entry="entry" :size="64"></talent-image>
      <span v-else>No Talent</span>
      <span>{{ value }}{{ label }}</span>
      <span class="type">{{ type }}</span>
    </div>
    </div>
  </div>
</template>

<style scoped>
.title-box {
  font-size: 18px;
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
import HeroImage from './HeroImage.vue';
import * as maps from './maps/maps';

export default Vue.component('talent-box', {
  props: ['title', 'content', 'entry', 'type', 'value', 'label'],
  computed: {
    hero() {
      return maps.getHero(this.entry.Actor);
    },
    hasTalent() {
      return maps.getTalentRarity(this.entry.Talent) != 'None';
    },
  },
  components: {
    TalentImage,
    HeroImage,
  }
});
</script>
