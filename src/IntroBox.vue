<template>
  <div :class="'notification ' + (hideIntro? 'is-hidden' : '')">
    <button class="delete" @click="hideIntro = true"></button>
    <div class="content">
      <h3>Hi There!</h3>
      <img style="float: right" class="image is-64x64" src="/dist/assets/gwenbarf.png"></img>
      <p>
        Broken Talents Fun will help you find the best Talents for the Vainglory mobile MOBA game.
        <br />
        Talents are special boosts for Vainglory's Brawl modes that upgrade and change hero abilities in a variety of different ways.
        <br />
        The pick and win rates on this site have been gathered from real Vainglory matches.
        The data can be imprecise and can be contrary to your personal experience.
      </p>
      <p>
        This site shares visitor data with Google Analytics and Google AdSense which store cookies. If you do not want that, you can <a @click="this.$ga.disable()">opt out of Google Analytics</a> and <a href="http://www.youronlinechoices.com/">opt out of targeted advertisements</a>.
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import RouterParamMixin from './RouterParamMixin';

export default Vue.component('intro-box', {
  mixins: [ RouterParamMixin ],
  data: function() {
    return {
      hideIntro: !!localStorage.getItem('hideIntro'),
    };
  },
  watch: {
    hideIntro: function(value) {
      localStorage.setItem('hideIntro', value);
    },
    selectedMode: function(value) {
      this.hideIntro = !!localStorage.getItem('hideIntro');
    },
  },
});
</script>
