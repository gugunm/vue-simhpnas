export default {
  pelaku(state) {
    return state.pelaku;
  },

  pelakuById(state) {
    return state.pelakuById
  },

  hasPelaku(state) {
    return state.pelaku && state.pelaku.length > 0;
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