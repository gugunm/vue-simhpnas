export default {
  setRekomendasi(state, payload) {
    state.rekomendasi = payload;
  },

  setRekomendasiById(state, payload) {
    state.rekomendasiById = payload;
  },

  setSearchRekomendasi(state, payload) {
    state.searchRekomendasi = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
