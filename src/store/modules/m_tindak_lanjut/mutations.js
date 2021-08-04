export default {
  setKlpTindakLanjut(state, payload) {
    state.klpTindakLanjut = payload;
  },
  setSubKlpTindakLanjut(state, payload) {
    state.subKlpTindakLanjut = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
