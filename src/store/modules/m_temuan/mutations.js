export default {
  setJenisTemuan(state, payload) {
    state.jenisTemuan = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
