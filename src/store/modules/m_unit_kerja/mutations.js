export default {
  setUnitKerja(state, payload) {
    state.unitKerja = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
