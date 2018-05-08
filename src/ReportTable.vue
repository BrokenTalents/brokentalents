<template>
  <section>
    <b-table :data="report"
             :default-sort="['Count', 'desc']"
             :default-sort-directon="'desc'">
        <template slot-scope="props">
          <b-table-column field="Actor" label="Hero" sortable>
              {{ props.row.Actor.substring(1, props.row.Actor.length - 1) }}
          </b-table-column>

          <b-table-column field="Talent" label="Talent">
              <template v-if="!!props.row.Talent && props.row.Talent != 'NoTalent'">
              {{ props.row.Talent.substring(props.row.Talent.lastIndexOf('_') + 1, props.row.Talent.length - 1) }}
              </template>
              <template v-else>
              (none)
              </template>
          </b-table-column>

          <b-table-column field="Level" label="Average Level" sortable numeric>
              <template v-if="!!props.row.Level">
              {{ props.row.Level.toFixed(2) }}
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

export default Vue.component('report-table', {
    props: [ 'report', 'totalPicks' ],
    data: function() {
      return {
      };
    },
    computed: {
    },
});
</script>
