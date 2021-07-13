import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state: () => ({
    userId: null,
    token: null,
    imageLink: null,
    didAutoLogout: false
  }),
  mutations,
  actions,
  getters
};
