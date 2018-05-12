<template>
  <div class="container">
<section class="hero is-medium is-dark is-bold header">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Broken Talents
      </h1>
      <h2 class="subtitle">
        Tilting Brawlers since May 2017
      </h2>
      <div class="search">
        <div class="field">
          <div class="control">
            <input class="input is-large" type="text" placeholder="Search for a hero">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <router-view></router-view>
  </div>
</template>


<style scoped>
  .header {
    text-align: center;
  }

  .search {
    width: 500px;
    margin: 0 auto
  }
</style>
