<template>
  <section>
    <b-field v-show="hasTalents">
      <p class="control">
        <b-dropdown v-model="filterRarity">
          <button class="button" slot="trigger">
            <span>{{ filterRarity.replace('None', 'No') || 'All' }} Talents</span>
            <b-icon icon="menu-down"></b-icon>
          </button>

          <b-dropdown-item value="">All Talents</b-dropdown-item>
          <b-dropdown-item v-for="rarity in RARITIES" :key="rarity" :value="rarity">{{ rarity.replace('None', 'No') }} Talents</b-dropdown-item>
        </b-dropdown>
      </p>
    </b-field>

    <b-field>
      <div class="control">
        <b-switch v-model="filterLowPickrate">Include entries without enough data (statistics will be inaccurate)</b-switch>
      </div>
    </b-field>

    <b-table :data="report"
             :default-sort="['TotalPicks', 'desc']"
             :default-sort-directon="'desc'"
             :paginated="true">
      <template slot-scope="props" slot="header">
        <b-tooltip :active="!!props.column.meta" :label="props.column.meta || ''" position="is-bottom" dashed>
          {{ props.column.label }}
        </b-tooltip>
      </template>

      <template slot="footer">
        <div class="has-text-right">
          <button class="button" @click="downloadCsv()">Download CSV</button>
        </div>
      </template>

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

        <b-table-column field="TalentWinrateBase" label="Level 1 Win Rate" meta="Estimated." :visible="hasTalents" sortable numeric>
          <template v-if="isNaN(props.row.TalentWinrateBase)">
            {{ (100 * props.row.Winner).toFixed(0) }}% <!-- No Talent -->
          </template>
          <template v-else>
            {{ (100 * props.row.TalentWinrateBase).toFixed(0) }}%
          </template>
        </b-table-column>

        <b-table-column field="TalentWinrateMax" label="Max Level Win Rate" meta="Estimated." :visible="hasTalents" sortable numeric>
          <template v-if="!isNaN(props.row.TalentWinrateMax)">
            {{ (100 * props.row.TalentWinrateMax).toFixed(0) }}%
            <small v-if="props.row.VarianceTooLarge"><br />uncertain</small>
          </template>
        </b-table-column>

        <b-table-column field="BlitzPointsDelta" label="Blitz Points" :visible="hasTalents" sortable numeric>
          {{ (props.row.BlitzPointsDelta > 0? '+' : '') + props.row.BlitzPointsDelta.toFixed(2) }}
        </b-table-column>

        <b-table-column field="Winner" label="Win Rate" :visible="!hasTalents" sortable numeric>
          {{ (100 * props.row.Winner).toFixed(0) }}%
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
      RARITIES: maps.RARITIES,
      getTalentName: maps.getTalentName,
      getTalentRarityIndex: maps.getTalentRarityIndex,
      getHero: maps.getHero,
      getLevelBuckets: ReportService.getLevelBuckets,
      getLevelsPerBucket: (entry) => maps.getMaxLevel(entry) / this.getLevelBuckets(),
    };
  },
  computed: {
    report: function() {
      const giveTrue = (x) => true;
      const filters = [
        this.filterRarity != ''? (entry) => maps.getTalentRarity(entry.Talent) == this.filterRarity : giveTrue,
        !this.filterLowPickrate? (entry) => !entry.SampleTooSmall : giveTrue,
      ];
      const and = (a, b) => a && b;
      return ReportService.getReport(this.selectedMode)
        .filter((entry) => filters.map((filter) => filter(entry)).reduce(and, true));
    },
    totalPicks: function() {
      return ReportService.getTotalPicks(this.selectedMode);
    },
  },
  methods: {
    downloadCsv: function() {
      const csv = ReportService.getCsv(this.selectedMode);
      const downloaderElement = document.createElement('a');
      downloaderElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      downloaderElement.target = '_blank';
      downloaderElement.download = maps.getMode(this.selectedMode) + '.csv';
      downloaderElement.click();
    },
  },
  components: {
    HeroImage,
  },
});
</script>
