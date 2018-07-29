<template>
  <div class="container">
    <section class="hero is-medium is-bold header">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-white">
            Broken Talents
          </h1>
          <h2 class="subtitle has-text-white">
            Tilting Brawlers since Update 2.5
          </h2>
        </div>
      </div>
    </section>

    <div class="tabs is-fullwidth">
      <ul>
        <li v-for="mode in modes" :key="mode" :class="(mode == selectedMode ? 'is-active' : '')">
          <a @click="selectedMode = mode">
            <span>{{ getMode(mode) }}</span>
          </a>
        </li>
      </ul>
    </div>

    <mode-tab class="tab"></mode-tab>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            Last update: {{ lastUpdate }}, with {{ totalMatches }} matches total.
          </p>
          <p>
            <strong>BrokenTalentsFun</strong>, the Vainglory Talents and Hero win rate statistics site, by shutterfly (<a href="https://schneefux.xyz">@schneefux</a>).
            <br />
            <a href="https://github.com/BrokenTalents/brokentalents.github.io">Source Code</a>.
            Built with the <a href="http://developer.vainglorygame.com">Vainglory API</a>.
            Using <a href="https://github.com/oberocks/vainglory-base-stats">Smash's base statistics</a>.
            Images by <a href="https://vainglorygame.com">Super Evil Mega Corp</a>, Gwen Icon by Bleeko.
            <br />
            Join the <a href="https://discord.gg/txTchJY">Discord Server</a> or <a href="https://twitter.com/brokentalents">Tweet</a> if you have questions.
          </p>
          <p>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>


<style scoped>
.header {
  text-align: center;
  background:
    linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ), url('/dist/assets/TalentGrab.jpg') center center;
  background-size: cover;
}

.tab {
  padding-left: 1em;
  padding-right: 1em;
}
</style>

<script>
import ModeTab from './ModeTab.vue';
import RouterParamMixin from './RouterParamMixin';
import ReportService from './ReportService';
import * as maps from './maps/maps';

export default {
  name: 'App',
  mixins: [ RouterParamMixin ],
  data: function() {
    return {
      totalMatches: Math.floor(ReportService.getTotalMatches()/100)*100,
      lastUpdate: ReportService.getLastUpdate(),
      modes: ReportService.getModes(),
      getMode: maps.getMode,
    };
  },
  components: {
    ModeTab,
  },
};
</script>
