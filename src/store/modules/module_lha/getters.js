export default {
  lha(state) {
    return state.lha;
  },

  lhaById(state) {
    return state.lhaById
  },

  hasLha(state) {
    return state.lha && state.lha.length > 0;
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