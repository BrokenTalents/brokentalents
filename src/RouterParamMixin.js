import * as maps from './maps/maps';

export default {
  computed: {
    playersPerMatch() {
      return maps.playersPerMatch(this.selectedMode);
    },
    hasTalents() {
      return maps.hasTalents(this.selectedMode);
    },
    selectedActor: {
      get() {
        return this.$route.query.actor || '*Kinetic*';
      },
      set(value) {
        this.$ga.event('Hero', 'update', value);
        const query = Object.assign({}, this.$route.query, { actor: value });
        this.$router.push({ query });
      },
    },
    selectedMode: {
      get() {
        return this.$route.query.mode || 'blitz_pvp_ranked';
      },
      set(value) {
        this.$ga.event('Mode', 'update', value);
        const query = Object.assign({}, this.$route.query, { mode: value });
        this.$router.push({ query });
      },
    },
    filterRarity: {
      get() {
        return this.$route.query.rarity || '';
      },
      set(value) {
        this.$ga.event('Rarity', 'update', value);
        const query = Object.assign({}, this.$route.query, { rarity: value });
        this.$router.push({ query });
      },
    },
    filterName: {
      get() {
        return this.$route.query.search || '';
      },
      set(value) {
        this.$ga.event('Search', 'update', value);
        const query = Object.assign({}, this.$route.query, { search: value });
        this.$router.push({ query });
      },
    },
    filterLowPickrate: {
      get() {
        return this.$route.query.lowPickrate == true;
      },
      set(value) {
        this.$ga.event('LowPickrate', 'update', value);
        const query = Object.assign({}, this.$route.query, { lowPickrate: value });
        this.$router.push({ query });
      },
    },
  },
};
