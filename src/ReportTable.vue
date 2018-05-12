<template>
  <section>
    <b-table :data="report"
             :default-sort="['Count', 'desc']"
             :default-sort-directon="'desc'">
      <template slot-scope="props">
        <b-table-column field="Actor" label="Hero" sortable>
          <div style="display: flex; align-items: center">
          <figure class="image is-48x48" style="padding: 5px;">
            <img style="border-radius: 50%;" :src="'dist/assets/hero-icons/' + getHero(props.row.Actor) + '.png'" :alt="getHero(props.row.Actor)">
          </figure>
          {{ getHero(props.row.Actor) }}
          </div>
        </b-table-column>

        <b-table-column field="Talent" label="Talent">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            {{ getTalentName(props.row.Talent) }}
            <talent-image :entry="props.row" :size="48"></talent-image>
          </div>
        </b-table-column>

        <b-table-column field="Level" label="Average Level" sortable numeric>
          <template v-if="!!props.row.Level">
            {{ props.row.Level.toFixed(2) }}
          </template>
          <template v-if="!props.row.Level">
            0
          </template>
        </b-table-column>

        <b-table-column field="Winner" label="Win Rate" sortable numeric>
          <template v-if="!!props.row.Winner">
            {{ (100 * props.row.Winner).toFixed(2) }}%
          </template>
        </b-table-column>

        <b-table-column field="Count" label="Pick Rate" sortable numeric>
          <template v-if="!!props.row.Count">
            {{ (100 * 6 * props.row.Count / totalPicks).toFixed(2) }}%
          </template>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
import Vue from 'vue';
import * as maps from './maps/maps';

export default Vue.component('report-table', {
  props: [ 'report', 'totalPicks' ],
  data: function() {
    return {
      getTalentName: maps.getTalentName,
      getHero: maps.getHero
    };
  },
  computed: {
  },
});
</script>
