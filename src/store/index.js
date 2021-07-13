import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import auth from './modules/auth/index';
import ui from './modules/ui/index';

export default new Vuex.Store({
  modules: {
    ui,
    auth
  }
})
