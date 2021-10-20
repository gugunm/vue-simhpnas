import axios from 'axios';
import { API_URL } from '@/utils/api.js'

export default {
  async loadLha(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/lha',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data unit kerja.'
      );
      throw error;
    }

    const lha = [];

    for (const key in responseData) {
      const anggaran = await context.dispatch('convertToRupiah', responseData[key]["Anggaran_yang_diaudit"]);


      const data = {
        id: responseData[key]["kode_lha"],
        nomorLha: responseData[key]["Nomor_LHA"],
        tglLha: responseData[key]["Tanggal_LHA"],
        nomorST: responseData[key]["Nomor_ST"],
        tglST: responseData[key]["Tanggal_ST"],
        grupLingkupAudit: responseData[key]["Grup_Lingkup_Audit"],
        lingkupAudit: responseData[key]["Lingkup_Audit"],
        jenisObrik: responseData[key]["Jenis_Obrik"],
        subBidangObrik: responseData[key]["Sub_Bidang_Obrik"],
        judulLaporan: responseData[key]["Judul_laporan"],
        tahunAnggaran: responseData[key]["Tahun_Anggaran"],
        jenisAnggaran: responseData[key]["Jenis_Anggaran"],
        namaPimpinan: responseData[key]["Nama_Pimpinan"],
        nipPimpinan: responseData[key]["NIP_Pimpinan"],
        rencanaAnggaran: responseData[key]["Rencana_Anggaran"],
        realisasiAnggaran: responseData[key]["Realisasi_Anggaran"],
        flagTpk: responseData[key]["Flag_TPK"],
        // anggaranYangDiaudit: responseData[key]["Anggaran_yang_diaudit"],
        anggaranYangDiaudit: anggaran
      };
      lha.push(data);
    }

    context.commit('setLha', lha);
    context.commit('setFetchTimestamp');
  },


  async convertToRupiah(context, payload) {
    var rupiah = '';		
    var angkarev = payload.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+',';
    return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
  },

  async loadLhaById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/lha/${payload.idLha}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data'
      );
      throw error;
    }

    const anggaran = await context.dispatch('convertToRupiah', responseData["Anggaran_yang_diaudit"]);

    const lha = {
      id: responseData["kode_lha"],
      nomorLha: responseData["Nomor_LHA"],
      tglLha: responseData["Tanggal_LHA"],
      nomorST: responseData["Nomor_ST"],
      tglST: responseData["Tanggal_ST"],
      grupLingkupAudit: responseData["Grup_Lingkup_Audit"],
      lingkupAudit: responseData["Lingkup_Audit"],
      jenisObrik: responseData["Jenis_Obrik"],
      subBidangObrik: responseData["Sub_Bidang_Obrik"],
      judulLaporan: responseData["Judul_laporan"],
      tahunAnggaran: responseData["Tahun_Anggaran"],
      jenisAnggaran: responseData["Jenis_Anggaran"],
      namaPimpinan: responseData["Nama_Pimpinan"],
      nipPimpinan: responseData["NIP_Pimpinan"],
      rencanaAnggaran: responseData["Rencana_Anggaran"],
      realisasiAnggaran: responseData["Realisasi_Anggaran"],
      flagTpk: responseData["Flag_TPK"],
      // anggaranYangDiaudit: responseData[key]["Anggaran_yang_diaudit"],
      anggaranYangDiaudit: anggaran
    };

    context.commit('setLhaById', lha);
  },

  async createLha(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/lha',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;
    
    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to save data'
      );
      throw error;
    }
    
    return responseData
  },

  async deleteLhaById(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/lha/${payload.idLha}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to delete data'
      );
      throw error;
    }

    return response
  }
}