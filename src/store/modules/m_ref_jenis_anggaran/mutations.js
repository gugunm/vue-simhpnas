export default {
  setRefJenisAnggaran(state, payload) {
    state.refJenisAnggaran = payload;
  },

  setRefJenisAnggaranById(state, payload) {
    state.refJenisAnggaranById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
