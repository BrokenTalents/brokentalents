export default {
  computed: {
    selectedActor: {
      get: function() {
        return this.$route.query.actor || '*Kinetic*';
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
    filterRarity: {
      get: function() {
        return this.$route.query.rarity || '';
      },
      set: function(value) {
        this.$ga.event('Rarity', 'update', value);
        const query = Object.assign({}, this.$route.query, { rarity: value });
        this.$router.push({ query });
      },
    },
    filterName: {
      get: function() {
        return this.$route.query.search || '';
      },
      set: function(value) {
        this.$ga.event('Search', 'update', value);
        const query = Object.assign({}, this.$route.query, { search: value });
        this.$router.push({ query });
      },
    },
    filterLowPickrate: {
      get: function() {
        return this.$route.query.lowPickrate == true;
      },
      set: function(value) {
        this.$ga.event('LowPickrate', 'update', value);
        const query = Object.assign({}, this.$route.query, { lowPickrate: value });
        this.$router.push({ query });
      },
    },
  },
};
