export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.roles = payload.roles;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
};
