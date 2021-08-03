export default {
  setRefJenisObrik(state, payload) {
    state.refJenisObrik = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
