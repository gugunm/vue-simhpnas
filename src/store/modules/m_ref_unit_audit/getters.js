export default {
  refUnitAudit(state) {
    return state.refUnitAudit;
  },
  hasRefUnitAudit(state) {
    return state.refUnitAudit && state.refUnitAudit.length > 0;
  },
  refUnitAuditById(state) {
    return state.refUnitAuditById;
  },
  refSubUnitAudit(state) {
    return state.refSubUnitAudit;
  },
  hasRefSubUnitAudit(state) {
    return state.refSubUnitAudit && state.refSubUnitAudit.length > 0;
  },
  refSubUnitAuditById(state) {
    return state.refSubUnitAuditById;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};
