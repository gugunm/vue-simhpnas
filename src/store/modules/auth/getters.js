export default {
  token(state) {
    return state.token;
  },
  roles(state) {
    return state.roles;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
