export default {
  setRefJabatan(state, payload) {
    state.refJabatan = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
