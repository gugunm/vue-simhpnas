export default {
  setPenyebab(state, payload) {
    state.penyebab = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
