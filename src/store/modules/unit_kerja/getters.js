export default {
  unitKerja(state) {
    return state.unitKerja;
  },
  hasUnitKerja(state) {
    return state.coaches && state.coaches.length > 0;
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
