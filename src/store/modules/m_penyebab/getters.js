export default {
  penyebab(state) {
    return state.penyebab;
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
