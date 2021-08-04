export default {
  refUnitAudit(state) {
    return state.refUnitAudit;
  },
  hasRefUnitAudit(state) {
    return state.refUnitAudit && state.refUnitAudit.length > 0;
  },
  refSubUnitAudit(state) {
    return state.refSubUnitAudit;
  },
  hasRefSubUnitAudit(state) {
    return state.refSubUnitAudit && state.refSubUnitAudit.length > 0;
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
