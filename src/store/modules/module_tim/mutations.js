export default {
  setTim(state, payload) {
    state.tim = payload;
  },

  setTimById(state, payload) {
    state.timById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
