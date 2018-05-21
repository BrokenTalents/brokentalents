export default {
  computed: {
    selectedActor: {
      get: function() {
        return this.$route.query.actor;
      },
      set: function(value) {
        const query = Object.assign({}, this.$route.query, { actor: value });
        this.$router.push({ query });
      },
    },
    selectedMode: {
      get: function() {
        return this.$route.query.mode;
      },
      set: function(value) {
        const query = Object.assign({}, this.$route.query, { mode: value });
        this.$router.push({ query });
      },
    },
  },
};
