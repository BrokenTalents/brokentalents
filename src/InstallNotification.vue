<template>
  <div class="notification is-primary" v-show="deferredPrompt != undefined">
    <button class="delete" @click="deferredPrompt = undefined"></button>
    <div class="has-text-centered">Add to your homescreen for fast and offline access?</div>
    <div class="has-text-centered install-button">
      <button class="button is-medium" @click="deferredPrompt.prompt()">
        <span class="mdi mdi-download"></span>
        <span>&nbsp;Install</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.install-button {
  margin-top: 1em;
  margin-bottom: 0.5em;
}
</style>

<script>
import Vue from 'vue';

export default Vue.component('install-notification', {
  data: function() {
    return {
      deferredPrompt: undefined,
    };
  },
  methods: {
    promptInstall: function(p) {
      this.deferredPrompt = p;
    },
  },
  created: function() {
    window.addEventListener('beforeinstallprompt', this.promptInstall);
  },
  destroyed: function() {
    window.removeEventListener('beforeinstallprompt', this.promptInstall);
  },
});
</script>
