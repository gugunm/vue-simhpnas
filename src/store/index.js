import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import auth from './modules/auth';
import ui from './modules/ui';
import m_unit_kerja from './modules/m_unit_kerja';
import m_penyebab from './modules/m_penyebab';
import m_temuan from './modules/m_temuan';

import m_ref_wilayah from './modules/m_ref_wilayah';

export default new Vuex.Store({
  modules: {
    ui,
    auth,
    m_unit_kerja,
    m_penyebab,
    m_temuan,
    m_ref_wilayah
  }
})
