export default {
  setPelaku(state, payload) {
    state.pelaku = payload;
  },

  setPelakuById(state, payload) {
    state.pelakuById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
