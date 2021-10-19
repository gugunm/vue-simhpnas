import axios from 'axios';
import { API_URL } from '@/utils/api.js'

export default {
  async loadPelaku(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/pelaku',
      params: {
        kode_rekomendasi: payload.idRekomendasi,
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

    const pelaku = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_pelaku"],
        kodeRekomendasi: responseData[key]["kode_rekomendasi"],
        kodeTemuan: responseData[key]["kode_temuan"],
        kodeLha: responseData[key]["kode_lha"],
        nomorRekomendasi: responseData[key]["Nomor_Rekomendasi"],
        nomorTemuan: responseData[key]["Nomor_Temuan"],
        nomorLha: responseData[key]["Nomor_LHA"],
        nomorUrut: responseData[key]["Nomor_Urut"],
        nama: responseData[key]["Nama"],
        nip: responseData[key]["NIP"],
        kodeJabatan: responseData[key]["Kode_Jabatan"],
        kodeUnitObrikTl: responseData[key]["Kode_Unit_Obrik_TL"],
        unitObrik: responseData[key]["Unit_Obrik"],
        kodeBidangObrikTl: responseData[key]["Kode_Bidang_Obrik_TL"],
        bidangObrik: responseData[key]["Bidang_Obrik"],
        kodeSubBidangObrikTl: responseData[key]["Kode_Sub_Bidang_Obrik_TL"],
        subBidangObrik: responseData[key]["Sub_Bidang_Obrik"],
        memoKesalahan: responseData[key]["Memo_kesalahan"],
      };
      pelaku.push(data);
    }

    context.commit('setPelaku', pelaku);
    context.commit('setFetchTimestamp');
  },

  async loadPelakuById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/pelaku/${payload.idPelaku}`,
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
      id: responseData["kode_pelaku"],
      kodeRekomendasi: responseData["kode_rekomendasi"],
      kodeTemuan: responseData["kode_temuan"],
      kodeLha: responseData["kode_lha"],
      nomorRekomendasi: responseData["Nomor_Rekomendasi"],
      nomorTemuan: responseData["Nomor_Temuan"],
      nomorLha: responseData["Nomor_LHA"],
      nomorUrut: responseData["Nomor_Urut"],
      nama: responseData["Nama"],
      nip: responseData["NIP"],
      kodeJabatan: responseData["Kode_Jabatan"],
      jabatan: responseData["Nama_Jabatan"],
      kodeUnitObrikTl: responseData["Kode_Unit_Obrik_TL"],
      unitObrik: responseData["Unit_Obrik"],
      kodeBidangObrikTl: responseData["Kode_Bidang_Obrik_TL"],
      bidangObrik: responseData["Bidang_Obrik"],
      kodeSubBidangObrikTl: responseData["Kode_Sub_Bidang_Obrik_TL"],
      subBidangObrik: responseData["Sub_Bidang_Obrik"],
      memoKesalahan: responseData["Memo_kesalahan"],
    };

    context.commit('setPelakuById', data);
  },

  async createPelaku(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/pelaku',
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