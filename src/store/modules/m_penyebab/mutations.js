export default {
  setPenyebab(state, payload) {
    state.penyebab = payload;
  },
  setPenyebabById(state, payload){
    state.penyebabById = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
