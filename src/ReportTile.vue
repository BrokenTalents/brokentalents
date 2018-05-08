<template>
  <div class="box">
    <p class="title">{{ title }}</p>
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="'dist/assets/hero-icons/' + hero.toLowerCase() + '.png'" :alt="entry.Actor">
        </figure>
        <figure class="image is-64x64">
          <img :src="'dist/assets/talent-icons-small/' + hero + '/' + hero + '_Rare.png'" :alt="entry.Talent">
          <!-- TODO Rarity map -->
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

export default Vue.component('report-tile', {
    props: [ 'title', 'content', 'entry' ],
    data: function() {
      return {
      };
    },
    computed: {
      hero: function() {
        return this.entry.Actor.substring(1, this.entry.Actor.length - 1);
      },
    },
});
</script>
