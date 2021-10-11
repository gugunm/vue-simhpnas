export default {
  setRekomendasi(state, payload) {
    state.rekomendasi = payload;
  },

  setRekomendasiById(state, payload) {
    state.rekomendasiById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
