<template>
  <section>
    <b-table :data="report"
             :default-sort="['TotalPicks', 'desc']"
             :default-sort-directon="'desc'"
             :paginated="true">
      <template slot-scope="props">
        <b-table-column field="Actor" label="Hero" sortable>
          <!-- desktop, table view -->
          <div class="is-hidden-touch">
            <div style="display: flex; align-items: center">
              <hero-image round="true" :actor="props.row.Actor" class="is-48x48"></hero-image>
              <span style="padding-left: 0.75em">{{ getHero(props.row.Actor) }}</span>
            </div>
          </div>
          <!-- mobile, card view -->
          <div class="is-hidden-desktop">
            <div style="display: flex; align-items: center">
              <span style="padding-right: 0.5em">{{ getHero(props.row.Actor) }}</span>
              <hero-image round="true" :actor="props.row.Actor" class="is-48x48"></hero-image>
            </div>
          </div>
        </b-table-column>

        <b-table-column field="Talent" label="Talent" :visible="hasTalents">
          <!-- desktop, table view -->
          <div class="is-hidden-touch">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span>{{ getTalentName(props.row.Talent) }}</span>
              <talent-image :entry="props.row" :size="48"></talent-image>
            </div>
          </div>
          <!-- mobile, card view -->
          <div class="is-hidden-desktop">
            <div style="display: flex; align-items: center">
              <span style="padding-right: 0.5em">{{ getTalentName(props.row.Talent) }}</span>
              <talent-image :entry="props.row" :size="48"></talent-image>
            </div>
          </div>
        </b-table-column>

        <b-table-column field="Winner" label="Level 1 Win Rate" sortable numeric>
          <template v-if="isNaN(props.row.TalentWinrateBase) || props.row.SampleTooSmall">
            {{ (100 * props.row.Winner).toFixed(2) }}%
          </template>
          <template v-else>
            {{ (100 * props.row.TalentWinrateBase).toFixed(2) }}%
          </template>
        </b-table-column>

        <b-table-column field="TalentWinrateScaling" label="Win Rate Advantage" sortable numeric>
          <template v-if="isNaN(props.row.TalentWinrateScaling) || props.row.SampleTooSmall">
            <span class="mdi mdi-gauge-empty mdi-18px" title="Not enough data"></span>
          </template>
          <template v-else>
            {{ (props.row.TalentWinrateScaling > 0? '+' : '') + (100 * props.row.TalentWinrateScaling / getLevelBuckets()).toFixed(2) }}% <small>for {{ getLevelsPerBucket(props.row) + (getLevelsPerBucket(props.row) > 1? ' Levels' : ' Level') }}</small>
          </template>
        </b-table-column>

        <b-table-column field="TotalPicks" label="Pick Rate" sortable numeric>
          {{ (100 * playersPerMatch * props.row.TotalPicks / totalPicks).toFixed(2) }}%
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
import Vue from 'vue';
import HeroImage from './HeroImage.vue';
import RouterParamMixin from './RouterParamMixin';
import ReportService from './ReportService';
import * as maps from './maps/maps';

export default Vue.component('report-table', {
  mixins: [ RouterParamMixin ],
  data: function() {
    return {
      getTalentName: maps.getTalentName,
      getTalentRarityIndex: maps.getTalentRarityIndex,
      getHero: maps.getHero,
      getLevelBuckets: ReportService.getLevelBuckets,
      getLevelsPerBucket: (entry) => maps.getMaxLevel(entry) / this.getLevelBuckets(),
    };
  },
  computed: {
    report: function() {
      return ReportService.getReport(this.selectedMode);
    },
    totalPicks: function() {
      return ReportService.getTotalPicks(this.selectedMode);
    },
    playersPerMatch: function() {
      return maps.playersPerMatch(this.selectedMode);
    },
    hasTalents: function() {
      return maps.hasTalents(this.selectedMode);
    },
  },
  components: {
    HeroImage,
  },
});
</script>
