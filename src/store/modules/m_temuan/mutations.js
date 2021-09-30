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
  setJenisTemuanById(state, payload) {
    state.jenisTemuanById = payload;
  },
  setKelompokTemuanById(state, payload) {
    state.kelompokTemuanById = payload;
  },
  setSubKelompokTemuanById(state, payload) {
    state.subKelompokTemuanById = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
