export default {
  refUnitObrik(state) {
    return state.refUnitObrik;
  },
  hasRefUnitObrik(state) {
    return state.refUnitObrik && state.refUnitObrik.length > 0;
  },
  refBidangObrik(state) {
    return state.refBidangObrik;
  },
  hasRefBidangObrik(state) {
    return state.refBidangObrik && state.refBidangObrik.length > 0;
  },
  refSubBidangObrik(state) {
    return state.refSubBidangObrik;
  },
  hasRefSubBidangObrik(state) {
    return state.refSubBidangObrik && state.refSubBidangObrik.length > 0;
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
