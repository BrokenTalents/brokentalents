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
  data() {
    return {
      deferredPrompt: undefined,
    };
  },
  methods: {
    promptInstall(p) {
      this.$ga.event('PWA', 'available');
      p.preventDefault();
      this.deferredPrompt = p;
      this.deferredPrompt.userChoice.then((choiceResult) => {
        this.$ga.event('PWA', 'popup', choiceResult.outcome);
        this.deferredPrompt = null;
      });
    },
    installed(e) {
      this.$ga.event('PWA', 'installed');
    },
  },
  created() {
    window.addEventListener('beforeinstallprompt', this.promptInstall);
    window.addEventListener('appinstalled', this.installed);
  },
  destroyed() {
    window.removeEventListener('beforeinstallprompt', this.promptInstall);
    window.removeEventListener('appinstalled', this.installed);
  },
});
</script>
