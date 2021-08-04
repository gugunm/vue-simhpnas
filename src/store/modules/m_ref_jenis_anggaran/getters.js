export default {
  refJenisAnggaran(state) {
    return state.refJenisAnggaran;
  },
  hasRefJenisAnggaran(state) {
    return state.refJenisAnggaran && state.refJenisAnggaran.length > 0;
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
