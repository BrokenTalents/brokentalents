<template>
  <div class="box">
    <b-table :data="top10Talents"
             :mobile-cards="false">
      <template slot-scope="props">
        <b-table-column field="Actor" label="Hero">
          <hero-image :actor="props.row.Actor" class="is-square"></hero-image>
        </b-table-column>

        <b-table-column field="Talent" label="Talent" :visible="hasTalents">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>{{ getTalentName(props.row.Talent) }}</span>
            <talent-image :entry="props.row" :size="48"></talent-image>
          </div>
        </b-table-column>

        <b-table-column field="Count" label="Pick Rate" :visible="!hasTalents" sortable numeric>
          <span>{{ Math.round(100 * playersPerMatch * props.row.Count / totalPicks) }}%</span>
        </b-table-column>

        <b-table-column field="TotalWinner" label="Win Rate" sortable numeric>
          <span>{{ Math.round(100 * props.row.TotalWinner) }}%</span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from 'vue';
import TalentImage from './TalentImage.vue';
import HeroImage from './HeroImage.vue';
import RouterParamMixin from './RouterParamMixin';
import ReportService from './ReportService';
import * as maps from './maps/maps';

export default Vue.component('top-talents-box', {
  mixins: [ RouterParamMixin ],
  data() {
    return {
      getHero: maps.getHero,
      getTalentName: maps.getTalentName,
    };
  },
  computed: {
    top10Talents() {
      return ReportService.getTop10Picks(this.selectedMode);
    },
    hasTalents() {
      return maps.hasTalents(this.selectedMode);
    },
    totalPicks() {
      return ReportService.getTotalPicks(this.selectedMode);
    },
    playersPerMatch() {
      return maps.playersPerMatch(this.selectedMode);
    },
  },
  components: {
    TalentImage,
    HeroImage,
  },
});
</script>
