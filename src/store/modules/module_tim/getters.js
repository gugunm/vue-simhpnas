export default {
  tim(state) {
    return state.tim;
  },

  timById(state) {
    return state.timById
  },

  hasTim(state) {
    return state.tim && state.tim.length > 0;
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