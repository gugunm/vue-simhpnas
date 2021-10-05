export default {
  setTemuan(state, payload) {
    state.temuan = payload;
  },

  setTemuanById(state, payload) {
    state.temuanById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
