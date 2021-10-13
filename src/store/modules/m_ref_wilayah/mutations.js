export default {
  setRefProvinsi(state, payload) {
    state.refProvinsi = payload;
  },
  setRefKabkot(state, payload) {
    state.refKabkot = payload;
  },
  setRefKecamatan(state, payload) {
    state.refKecamatan = payload;
  },
  setRefKelurahan(state, payload) {
    state.refKelurahan = payload;
  },
  setSearchKelurahan(state, payload){
    state.searchKelurahan = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
