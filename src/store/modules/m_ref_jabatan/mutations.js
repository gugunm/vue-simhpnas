export default {
  setRefJabatan(state, payload) {
    state.refJabatan = payload;
  },

  setRefJabatanById(state, payload) {
    state.refJabatanById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
