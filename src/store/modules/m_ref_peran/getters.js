export default {
  refPeran(state) {
    return state.refPeran;
  },

  refPeranById(state) {
    return state.refPeranById
  },

  hasRefPeran(state) {
    return state.refPeran && state.refPeran.length > 0;
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
