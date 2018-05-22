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

    <router-view></router-view>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            Last update: 2018-05-22, with {{ totalMatches }} matches total.
            Join the <a href="https://discord.gg/txTchJY">Discord Server</a> if you have questions.
          </p>
          <p>
            <strong>BrokenTalentsFun</strong> by shutterfly (<a href="https://schneefux.xyz">@schneefux</a>).
            <a href="https://github.com/BrokenTalents/brokentalents.github.io">Source Code</a>.
            Built with the <a href="http://developer.vainglorygame.com">Vainglory API</a>.
            Images by <a href="https://vainglorygame.com">Super Evil Mega Corp</a>.
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
</style>

<script>
export default {
  name: 'App',
  props: [ 'reportService' ],
  data: function() {
    return {
      totalMatches: Math.floor(this.reportService.getTotalMatches()/100)*100,
    };
  },
};
</script>
