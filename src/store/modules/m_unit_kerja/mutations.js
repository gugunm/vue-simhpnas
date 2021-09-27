export default {
  setUnitKerja(state, payload) {
    state.unitKerja = payload;
  },
  setUnitKerjaById(state, payload) {
    state.unitKerjaById = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }, 
  setDeleteUnitKerjaById(state, payload) {
    state.unitKerja = state.unitKerja.filter((uk) => {
      return uk.id != payload
    })
  }
};
