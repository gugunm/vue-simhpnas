export default {
  setUserUtama(state, payload) {
    state.userUtama = payload;
  },
  setUserUtamaById(state, payload){
    state.userUtamaById = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
