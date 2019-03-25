<template>
  <div>
    <div class="block">
      <b-field grouped group-multiline>
        <label class="control label">Metrics</label>
        <p class="control">
          <b-checkbox v-model="talentsVisible" v-show="hasTalents">Talent Levels</b-checkbox>
        </p>
        <p class="control">
          <b-checkbox v-model="winrateVisible">Win Rate</b-checkbox>
        </p>
        <p class="control">
          <b-checkbox v-model="killsDeathsVisible">Kills and Deaths</b-checkbox>
        </p>
        <p class="control">
          <b-checkbox v-model="objectivesVisible">Objectives</b-checkbox>
        </p>
      </b-field>
    </div>

    <div class="block">
      <b-field grouped group-multiline>
        <label class="control label">Category</label>
        <p class="control"
           v-for="trait in summaries">
          <b-radio v-model="selectedTrait"
              :native-value="trait.key">
            {{ trait.name }}
          </b-radio>
        </p>
      </b-field>
    </div>

    <div class="block">
      <label class="label">Data</label>
      <b-table :data="summary.data"
               :mobile-cards="false"
               narrowed>
        <template slot-scope="props" slot="header">
          <b-tooltip :active="!!props.column.meta" :label="props.column.meta || ''" position="is-bottom" dashed>
            {{ props.column.label }}
          </b-tooltip>
        </template>

        <template slot-scope="props">
          <b-table-column :field="selectedTrait" label="">
            {{ props.row[selectedTrait] }}
          </b-table-column>

          <b-table-column field="TotalWinner" label="Win Rate" :visible="winrateVisible" sortable numeric>
            {{ (100 * props.row.TotalWinner / props.row._Count).toFixed(2) }}%
          </b-table-column>

          <b-table-column field="TalentWinrateBase" label="Level 1 Win Rate" :visible="talentsVisible && hasTalents" meta="Estimated." sortable numeric>
            {{ (100 * props.row.TalentWinrateBase / props.row._Count).toFixed(2) }}%
          </b-table-column>

          <b-table-column field="TalentWinrateMax" label="Max Level Win Rate" :visible="talentsVisible && hasTalents" meta="Estimated." sortable numeric>
            {{ (100 * props.row.TalentWinrateMax / props.row._Count).toFixed(2) }}%
          </b-table-column>

          <b-table-column field="Kills" label="Kills" :visible="killsDeathsVisible" sortable numeric>
            {{ (props.row.Kills / props.row._Count).toFixed(2) }}
          </b-table-column>

          <b-table-column field="Deaths" label="Deaths" :visible="killsDeathsVisible" sortable numeric>
            {{ (props.row.Deaths / props.row._Count).toFixed(2) }}
          </b-table-column>

          <b-table-column field="TurretKills" label="Turret Kills" :visible="objectivesVisible" sortable numeric>
            {{ (props.row.TurretKills / props.row._Count).toFixed(2) }}
          </b-table-column>

          <b-table-column field="TotalPicks" label="Pick Rate" sortable numeric>
            {{ (100 * props.row.TotalPicks / totalPicks).toFixed(2) }}%
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import RouterParamMixin from './RouterParamMixin';
import ReportService from './ReportService';
import * as maps from './maps/maps';

export default Vue.component('summaries', {
  mixins: [ RouterParamMixin ],
  data() {
    return {
      talentsVisible: false,
      winrateVisible: true,
      killsDeathsVisible: false,
      objectivesVisible: false,
      selectedTrait: this.hasTalents? 'Rarity' : 'Difficulty',
    };
  },
  computed: {
    summaries() {
      return ReportService.getSummaries(this.selectedMode)
        .filter((summary) => this.hasTalents? true : summary.key != 'Rarity');
    },
    summary() {
      return this.summaries.find((summary) => summary.key == [this.selectedTrait]);
    },
    totalPicks() {
      return this.summary.data.map((entry) => entry.TotalPicks).reduce((agg, cur) => agg + cur, 0);
    },
  },
  components: {
  },
});
</script>
