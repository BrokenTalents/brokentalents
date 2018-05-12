<template>
  <!-- <div class="box">
      <div class="media-content">
        <div class="content">
          
          <figure class="image hero-image-slot">
            <img class="hero-image" :src="'dist/assets/hero-icons/' + hero + '.png'" :alt="entry.Actor">
          </figure>
          
          <talent-image :entry="entry"></talent-image>
          <slot></slot>
        </div>
      </div>
    </article>
  </div> -->
<div>
  <p class="title-box">{{ title }}</p>
  <div class="columns">

    <div class="column is-centered">
      <figure class="image is-64x64 hero-image-slot">
        <img class="hero-image" :src="'dist/assets/hero-icons/' + hero + '.png'" :alt="entry.Actor">
      </figure>
      <p class="hero-name">{{entry.Actor.replace(/\*/g, "")}}</p>
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
  /* margin-bottom: 10px; */
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
import Vue from "vue";
import TalentImage from "./TalentImage.vue";
import * as maps from "./maps/maps";

export default Vue.component("talent-box", {
  props: ["title", "content", "entry", "type", "value", "label"],
  data: function() {
    return {
      hero: maps.getHero(this.entry.Actor).toLowerCase()
    };
  },
  components: {
    TalentImage
  }
});
</script>
