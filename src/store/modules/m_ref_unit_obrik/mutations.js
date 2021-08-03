export default {
  setRefUnitObrik(state, payload) {
    state.refUnitObrik = payload;
  },
  setRefBidangObrik(state, payload) {
    state.refBidangObrik = payload;
  },
  setRefSubBidangObrik(state, payload) {
    state.refSubBidangObrik = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
