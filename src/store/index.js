import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import auth from './modules/auth';
import ui from './modules/ui';
import m_unit_kerja from './modules/m_unit_kerja';
import m_penyebab from './modules/m_penyebab';
import m_temuan from './modules/m_temuan';
import m_rekomendasi from './modules/m_rekomendasi';
import m_tindak_lanjut from './modules/m_tindak_lanjut';

import m_ref_wilayah from './modules/m_ref_wilayah';
import m_ref_jenis_obrik from './modules/m_ref_jenis_obrik';
import m_ref_unit_obrik from './modules/m_ref_unit_obrik';
import m_ref_lingkup_audit from './modules/m_ref_lingkup_audit';
import m_ref_jabatan from './modules/m_ref_jabatan';
import m_ref_jenis_anggaran from './modules/m_ref_jenis_anggaran';
import m_ref_unit_audit from './modules/m_ref_unit_audit';
import m_ref_peran from './modules/m_ref_peran';

import m_user_utama from './modules/m_user_utama';
import m_user_unit from './modules/m_user_unit';

import module_lha from './modules/module_lha';
import module_temuan from './modules/module_temuan';
import module_tim from './modules/module_tim';
import module_pelaku from './modules/module_pelaku';
import module_penyebab from './modules/module_penyebab';
import module_rekomendasi from './modules/module_rekomendasi';
import module_tindak_lanjut from './modules/module_tindak_lanjut';


export default new Vuex.Store({
  modules: {
    ui,
    auth,
    m_unit_kerja,
    m_penyebab,
    m_temuan,
    m_rekomendasi,
    m_tindak_lanjut,
    m_ref_wilayah,
    m_ref_jenis_obrik,
    m_ref_unit_obrik,
    m_ref_lingkup_audit,
    m_ref_jabatan,
    m_ref_jenis_anggaran,
    m_ref_unit_audit,
    m_ref_peran,
    m_user_utama,
    m_user_unit,
    module_lha,
    module_temuan,
    module_tim,
    module_pelaku,
    module_penyebab,
    module_rekomendasi,
    module_tindak_lanjut,
  }
})
