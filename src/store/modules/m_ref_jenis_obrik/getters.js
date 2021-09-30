export default {
  refJenisObrik(state) {
    return state.refJenisObrik;
  },

  hasRefJenisObrik(state) {
    return state.refJenisObrik && state.refJenisObrik.length > 0;
  },

  refJenisObrikById(state) {
    return state.refJenisObrikById;
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
