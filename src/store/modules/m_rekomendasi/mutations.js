export default {
  setKlpRekomendasi(state, payload) {
    state.klpRekomendasi = payload;
  },
  setSubKlpRekomendasi(state, payload) {
    state.subKlpRekomendasi = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
