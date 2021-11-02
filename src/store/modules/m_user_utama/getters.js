export default {
  userUtama(state) {
    return state.userUtama;
  },
  hasUserUtama(state) {
    return state.userUtama && state.userUtama.length > 0;
  },
  userUtamaById(state) {
    return state.userUtamaById;
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
