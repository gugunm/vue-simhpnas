export default {
  userUnit(state) {
    return state.userUnit;
  },
  hasUserUnit(state) {
    return state.userUnit && state.userUnit.length > 0;
  },
  userUnitById(state) {
    return state.userUnitById;
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
