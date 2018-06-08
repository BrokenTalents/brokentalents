export default {
  computed: {
    selectedActor: {
      get: function() {
        return this.$route.query.actor || '*Kensei*';
      },
      set: function(value) {
        this.$ga.event('Hero', 'update', value);
        const query = Object.assign({}, this.$route.query, { actor: value });
        this.$router.push({ query });
      },
    },
    selectedMode: {
      get: function() {
        return this.$route.query.mode || 'blitz_pvp_ranked';
      },
      set: function(value) {
        this.$ga.event('Mode', 'update', value);
        const query = Object.assign({}, this.$route.query, { mode: value });
        this.$router.push({ query });
      },
    },
  },
};
