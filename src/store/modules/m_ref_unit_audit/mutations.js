export default {
  setRefUnitAudit(state, payload) {
    state.refUnitAudit = payload;
  },
  setRefSubUnitAudit(state, payload) {
    state.refSubUnitAudit = payload;
  },
  setRefUnitAuditById(state, payload) {
    state.refUnitAuditById = payload;
  },
  refSubUnitAuditById(state, payload) {
    state.refSubUnitAuditById = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
