export default {
  jenisTemuan(state) {
    return state.jenisTemuan;
  },
  hasJenisTemuan(state) {
    return state.jenisTemuan && state.jenisTemuan.length > 0;
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
