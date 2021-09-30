export default {
  setRefJenisObrik(state, payload) {
    state.refJenisObrik = payload;
  },

  setRefJenisObrikById(state, payload) {
    state.refJenisObrikById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
