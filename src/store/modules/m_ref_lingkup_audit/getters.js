export default {
  refGroupLingkupAudit(state) {
    return state.refGroupLingkupAudit;
  },

  refGroupLingkupAuditById(state) {
    return state.refGroupLingkupAuditById
  },

  hasRefGroupLingkupAudit(state) {
    return state.refGroupLingkupAudit && state.refGroupLingkupAudit.length > 0;
  },

  refLingkupAudit(state) {
    return state.refLingkupAudit;
  },

  refLingkupAuditById(state) {
    return state.refLingkupAuditById;
  },

  hasRefLingkupAudit(state) {
    return state.refLingkupAudit && state.refLingkupAudit.length > 0;
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
