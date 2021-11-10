import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state: () => ({
    token: null,
    roles: null,
    didAutoLogout: false
  }),
  mutations,
  actions,
  getters
};
