<template>
  <div class="box">
    <b-table :data="top10Talents"
             :default-sort="['Count', 'desc']"
             :default-sort-directon="'desc'"
             :mobile-cards="false">
      <template slot-scope="props">
        <b-table-column field="Actor" label="Hero">
          <hero-image :actor="props.row.Actor" class="is-square"></hero-image>
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
import HeroImage from './HeroImage.vue';
import * as maps from './maps/maps';

export default Vue.component('hero-search-box', {
  props: [ 'reportService' ],
  data: function() {
    return {
      getHero: maps.getHero,
      getTalentName: maps.getTalentName,
    };
  },
  computed: {
    selectedMode: {
      get: function() {
        return this.$route.query.mode;
      },
    },
    top10Talents: function() {
      return this.reportService.getTop10Picks(this.selectedMode);
    },
    totalPicks: function() {
      return this.reportService.getTotalPicks(this.selectedMode);
    },
  },
  components: {
    TalentImage,
    HeroImage,
  },
});
</script>
