<template>
  <div class="container">
    <section class="hero is-medium is-bold header">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-white">
            Broken Talents
          </h1>
          <h2 class="subtitle has-text-white">
            Tilting Brawlers since May 2017
          </h2>
        </div>
      </div>
    </section>

    <router-view></router-view>
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
