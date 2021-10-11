export default {
  rekomendasi(state) {
    return state.rekomendasi;
  },

  rekomendasiById(state) {
    return state.rekomendasiById
  },

  hasRekomendasi(state) {
    return state.rekomendasi && state.rekomendasi.length > 0;
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