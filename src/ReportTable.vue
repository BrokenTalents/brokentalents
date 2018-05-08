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
              {{ talentSlugToName(props.row.Talent) }}
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

function talentSlugToName(talent) {
  if (talent == '' || talent == undefined) {
    return 'No Talent';
  }

  return talent.substring(talent.lastIndexOf('_') + 1, talent.length - 1) // snake case to words
               .replace(/([A-Z])/g, (s) => ' ' + s.toLowerCase())
               .split(' ') // capitalize first letter
               .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
               .join(' ');
}

export default Vue.component('report-table', {
  props: [ 'report', 'totalPicks' ],
  data: function() {
    return {
      talentSlugToName,
    };
  },
  computed: {
  },
});
</script>
