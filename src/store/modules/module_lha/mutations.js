export default {
  setLha(state, payload) {
    state.lha = payload;
  },

  setLhaById(state, payload) {
    state.lhaById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
