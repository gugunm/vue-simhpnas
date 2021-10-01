export default {
  setKlpTindakLanjut(state, payload) {
    state.klpTindakLanjut = payload;
  },
  setSubKlpTindakLanjut(state, payload) {
    state.subKlpTindakLanjut = payload;
  },
  setKlpTindakLanjutById(state, payload){
    state.klpTindakLanjutById = payload;
  },
  setSubKlpTindakLanjutById(state, payload){
    state.subKlpTindakLanjutById = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
