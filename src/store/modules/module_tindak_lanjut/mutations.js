export default {
  setTindakLanjut(state, payload) {
    state.tindakLanjut = payload;
  },

  setTindakLanjutById(state, payload) {
    state.tindakLanjutById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
