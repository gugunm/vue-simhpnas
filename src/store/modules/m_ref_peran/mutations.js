export default {
  setRefPeran(state, payload) {
    state.refPeran = payload;
  },

  setRefPeranById(state, payload) {
    state.refPeranById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
