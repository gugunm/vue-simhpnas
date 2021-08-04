export default {
  setRefJenisAnggaran(state, payload) {
    state.refJenisAnggaran = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
