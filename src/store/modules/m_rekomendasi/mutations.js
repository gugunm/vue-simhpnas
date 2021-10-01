export default {
  setKlpRekomendasi(state, payload) {
    state.klpRekomendasi = payload;
  },
  setSubKlpRekomendasi(state, payload) {
    state.subKlpRekomendasi = payload;
  },
  setKlpRekomendasiById(state, payload) {
    state.klpRekomendasiById = payload;
  },
  setSubKlpRekomendasiById(state, payload) {
    state.subKlpRekomendasiById = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
