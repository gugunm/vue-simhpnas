import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import auth from './modules/auth/index';
import ui from './modules/ui/index';
import unit_kerja from './modules/unit_kerja/index';
import m_penyebab from './modules/m_penyebab/index';
import m_temuan from './modules/m_temuan/index';

export default new Vuex.Store({
  modules: {
    ui,
    auth,
    unit_kerja,
    m_penyebab,
    m_temuan
  }
})
