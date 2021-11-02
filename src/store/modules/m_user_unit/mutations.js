export default {
  setUserUnit(state, payload) {
    state.userUnit = payload;
  },
  setUserUnitById(state, payload){
    state.userUnitById = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
