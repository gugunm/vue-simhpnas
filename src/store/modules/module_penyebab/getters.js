export default {
  penyebab(state) {
    return state.penyebab;
  },

  penyebabById(state) {
    return state.penyebabById
  },

  hasPenyebab(state) {
    return state.penyebab && state.penyebab.length > 0;
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