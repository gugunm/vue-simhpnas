export default {
  klpTindakLanjut(state) {
    return state.klpTindakLanjut;
  },
  hasKlpTindakLanjut(state) {
    return state.klpTindakLanjut && state.klpTindakLanjut.length > 0;
  },
  subKlpTindakLanjut(state) {
    return state.subKlpTindakLanjut;
  },
  hasSubKlpTindakLanjut(state) {
    return state.subKlpTindakLanjut && state.subKlpTindakLanjut.length > 0;
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
