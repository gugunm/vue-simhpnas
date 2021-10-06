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
      url: `/api/jabatan/${payload.idJabatan}`,
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

    const rjabatan = {
      id: responseData["kode_jabatan"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setRefJabatanById', rjabatan);
  },
}