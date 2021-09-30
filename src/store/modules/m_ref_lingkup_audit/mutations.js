export default {
  setRefGroupLingkupAudit(state, payload) {
    state.refGroupLingkupAudit = payload;
  },

  setRefGroupLingkupAuditById(state, payload) {
    state.refGroupLingkupAuditById = payload
  },

  setRefLingkupAudit(state, payload) {
    state.refLingkupAudit = payload;
  },

  setRefLingkupAuditById(state, payload) {
    state.refLingkupAuditById = payload;
  },

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
