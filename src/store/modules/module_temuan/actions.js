import axios from 'axios';
import { API_URL } from '@/utils/api.js'

export default {
  async loadTemuan(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/temuan',
      params: {
        kode_lha: payload.idLha,
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

    const temuan = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_temuan"],
        nomorLha: responseData[key]["Nomor_LHA"],
        idLha: responseData[key]["kode_lha"],
        nomorTemuan: responseData[key]["Nomor_Temuan"],
        kodeJenisTemuan: responseData[key]["Kode_Jenis_Temuan"],
        kodeKelompokTemuan: responseData[key]["Kode_Kelompok_Temuan"],
        kodeSubKelompokTemuan: responseData[key]["Kode_Sub_Kelompok_Temuan"],
        memoTemuan: responseData[key]["Memo_Temuan"],
        flagTpk: responseData[key]["Flag_TPK"],
        posisiKasus: responseData[key]["Posisi_Kasus"],
        modusOperandi: responseData[key]["Modus_Operandi"],
        nilaiTemuan: responseData[key]["Nilai_Temuan"],
        jumlahRekomendasi: responseData[key]["Jumlah_Rekomendasi"],
        jumlahSaldoRekomendasi: responseData[key]["Jumlah_Saldo_Rekomendasi"],
        nilaiTl: responseData[key]["Nilai_TL"],
        statusTemuan: responseData[key]["Status_Temuan"],
        memoKoreksiTemuan: responseData[key]["Memo_Koreksi_Tem"],
      };

      temuan.push(data);
    }

    context.commit('setTemuan', temuan);
    context.commit('setFetchTimestamp');
  },

  async loadTemuanById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/temuan/${payload.idTemuan}`,
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

    const data = {
      id: responseData["kode_temuan"],
      nomorLha: responseData["Nomor_LHA"],
      idLha: responseData["kode_lha"],
      nomorTemuan: responseData["Nomor_Temuan"],
      kodeJenisTemuan: responseData["Kode_Jenis_Temuan"],
      jenisTemuan: responseData["Jenis_Temuan"],
      kodeKelompokTemuan: responseData["Kode_Kelompok_Temuan"],
      kelompokTemuan: responseData["Kelompok_Temuan"],
      kodeSubKelompokTemuan: responseData["Kode_Sub_Kelompok_Temuan"],
      subKelompokTemuan: responseData["Sub_Kelompok_Temuan"],
      memoTemuan: responseData["Memo_Temuan"],
      flagTpk: responseData["Flag_TPK"],
      posisiKasus: responseData["Posisi_Kasus"],
      modusOperandi: responseData["Modus_Operandi"],
      nilaiTemuan: responseData["Nilai_Temuan"],
      jumlahRekomendasi: responseData["Jumlah_Rekomendasi"],
      jumlahSaldoRekomendasi: responseData["Jumlah_Saldo_Rekomendasi"],
      nilaiTl: responseData["Nilai_TL"],
      statusTemuan: responseData["Status_Temuan"],
      memoKoreksiTemuan: responseData["Memo_Koreksi_Tem"],
    };

    context.commit('setTemuanById', data);
  },

  async createTemuan(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/temuan',
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
}