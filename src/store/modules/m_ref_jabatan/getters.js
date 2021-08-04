export default {
  refJabatan(state) {
    return state.refJabatan;
  },
  hasRefJabatan(state) {
    return state.refJabatan && state.refJabatan.length > 0;
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
