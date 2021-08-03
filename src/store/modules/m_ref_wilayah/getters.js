export default {
  refProvinsi(state) {
    return state.refProvinsi;
  },
  hasRefProvinsi(state) {
    return state.refProvinsi && state.refProvinsi.length > 0;
  },
  refKabkot(state) {
    return state.refKabkot;
  },
  hasRefKabkot(state) {
    return state.refKabkot && state.refKabkot.length > 0;
  },
  refKecamatan(state) {
    return state.refKecamatan;
  },
  hasRefKecamatan(state) {
    return state.refKecamatan && state.refKecamatan.length > 0;
  },
  refKelurahan(state) {
    return state.refKelurahan;
  },
  hasRefKelurahan(state) {
    return state.refKelurahan && state.refKelurahan.length > 0;
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
