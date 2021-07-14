import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import auth from './modules/auth/index';
import ui from './modules/ui/index';
import unit_kerja from './modules/unit_kerja/index';

export default new Vuex.Store({
  modules: {
    ui,
    auth,
    unit_kerja
  }
})
