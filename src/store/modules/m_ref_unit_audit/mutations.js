export default {
  setRefUnitAudit(state, payload) {
    state.refUnitAudit = payload;
  },
  setRefSubUnitAudit(state, payload) {
    state.refSubUnitAudit = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
