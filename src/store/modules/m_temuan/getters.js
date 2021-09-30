export default {
  jenisTemuan(state) {
    return state.jenisTemuan;
  },
  hasJenisTemuan(state) {
    return state.jenisTemuan && state.jenisTemuan.length > 0;
  },
  jenisTemuanById(state){
    return state.jenisTemuanById
  },
  kelompokTemuan(state) {
    return state.kelompokTemuan;
  },
  hasKelompokTemuan(state) {
    return state.kelompokTemuan && state.kelompokTemuan.length > 0;
  },
  kelompokTemuanById(state) {
    return state.kelompokTemuanById
  },
  subKelompokTemuan(state) {
    return state.subKelompokTemuan;
  },
  hasSubKelompokTemuan(state) {
    return state.subKelompokTemuan && state.subKelompokTemuan.length > 0;
  },
  subKelompokTemuanById(state){
    return state.subKelompokTemuanById
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
