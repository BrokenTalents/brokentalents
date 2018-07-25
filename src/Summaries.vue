<template>
  <b-table :data="talentSummaries"
           :mobile-cards="false">
    <template slot-scope="props" slot="header">
      <b-tooltip :active="!!props.column.meta" :label="props.column.meta || ''" position="is-bottom" dashed>
        {{ props.column.label }}
      </b-tooltip>
    </template>

    <template slot-scope="props">
      <b-table-column field="Rarity" label="Rarity">
        {{ props.row.Rarity }}
      </b-table-column>

      <b-table-column field="TalentWinrateBase" label="Level 1 Win Rate" meta="Estimated." sortable numeric>
        {{ (100 * props.row.TalentWinrateBase / props.row._Count).toFixed(2) }}%
      </b-table-column>

      <b-table-column field="TalentWinrateMax" label="Max Level Win Rate" meta="Estimated." sortable numeric>
        {{ (100 * props.row.TalentWinrateMax / props.row._Count).toFixed(2) }}%
      </b-table-column>

      <b-table-column field="TotalPicks" label="Pick Rate" sortable numeric>
        {{ (100 * props.row.TotalPicks / totalPicks).toFixed(2) }}%
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
import Vue from 'vue';
import RouterParamMixin from './RouterParamMixin';
import ReportService from './ReportService';
import * as maps from './maps/maps';

export default Vue.component('summaries', {
  mixins: [ RouterParamMixin ],
  data: function() {
    return {
    };
  },
  computed: {
    talentSummaries: function() {
      return [...ReportService.getSummaryTalents(this.selectedMode).values()]
          .sort((entry1, entry2) => maps.getTalentRarityIndex(entry1.Talent) - maps.getTalentRarityIndex(entry2.Talent));
    },
    totalPicks: function() {
      return this.talentSummaries.map((entry) => entry.TotalPicks).reduce((agg, cur) => agg + cur, 0);
    },
  },
  components: {
  },
});
</script>
