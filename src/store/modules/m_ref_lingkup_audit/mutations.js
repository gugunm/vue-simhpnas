export default {
  setRefGroupLingkupAudit(state, payload) {
    state.refGroupLingkupAudit = payload;
  },
  setRefLingkupAudit(state, payload) {
    state.refLingkupAudit = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
