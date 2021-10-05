export default {
  temuan(state) {
    return state.temuan;
  },

  temuanById(state) {
    return state.temuanById
  },

  hasTemuan(state) {
    return state.temuan && state.temuan.length > 0;
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