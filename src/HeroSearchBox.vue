<template>
  <div class="box">
    <b-field label="Hero">
      <b-input v-model="hero"></b-input>
    </b-field>

    <b-table :data="heroReport"
             :default-sort="['Count', 'desc']"
             :default-sort-directon="'desc'"
             :mobile-cards="false">
      <template slot-scope="props">
        <b-table-column field="Actor" label="Hero" sortable>
          {{ getHero(props.row.Actor) }}
        </b-table-column>

        <b-table-column field="Talent" label="Talent">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>{{ getTalentName(props.row.Talent) }}</span>
            <talent-image :entry="props.row" :size="48"></talent-image>
          </div>
        </b-table-column>

        <b-table-column field="Winner" label="Win Rate" sortable numeric>
          <template v-if="!!props.row.Winner">
            {{ Math.round(100 * props.row.Winner) }}%
          </template>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from 'vue';
import TalentImage from './TalentImage.vue';
import * as maps from './maps/maps';

export default Vue.component('hero-search-box', {
  props: [ 'reportService' ],
  data: function() {
    return {
      hero: maps.getHero(this.reportService.getTopPick('casual_aral').Actor),
      totalPicks: this.reportService.getTotalPicks('casual_aral'),
      getHero: maps.getHero,
      getTalentName: maps.getTalentName,
    };
  },
  computed: {
    heroReport: function() {
      return this.reportService.getReport('casual_aral')
          .filter((entry) => maps.getHero(entry.Actor).includes(this.hero));
    },
    totalHeroPicks: function() {
      return this.heroReport
        .map((entry) => entry.Count)
        .reduce((agg, cur) => agg + cur, 0);
    },
  },
  components: {
    TalentImage,
  },
});
</script>
