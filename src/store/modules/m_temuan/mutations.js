export default {
  setJenisTemuan(state, payload) {
    state.jenisTemuan = payload;
  },
  setKelompokTemuan(state, payload) {
    state.kelompokTemuan = payload;
  },
  setSubKelompokTemuan(state, payload) {
    state.subKelompokTemuan = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
