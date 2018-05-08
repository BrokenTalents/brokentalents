<template>
  <div class="box">
    <p class="title">{{ title }}</p>
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src="" :alt="entry.Actor">
        </figure>
        <figure class="image is-64x64">
          <img src="" :alt="entry.Talent">
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
    },
});
</script>
