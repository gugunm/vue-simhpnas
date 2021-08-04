export default {
  klpRekomendasi(state) {
    return state.klpRekomendasi;
  },
  hasKlpRekomendasi(state) {
    return state.klpRekomendasi && state.klpRekomendasi.length > 0;
  },
  subKlpRekomendasi(state) {
    return state.subKlpRekomendasi;
  },
  hasSubKlpRekomendasi(state) {
    return state.subKlpRekomendasi && state.subKlpRekomendasi.length > 0;
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
