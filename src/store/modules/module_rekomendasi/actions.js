import axios from 'axios';
import { API_URL } from '@/utils/api.js'

export default {
  async loadRekomendasi(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/rekomendasi',
      params: {
        kode_temuan: payload.idTemuan,
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

    const rekomendasi = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_rekomendasi"],
        kodeTemuan: responseData[key]["kode_temuan"],
        nomorTemuan: responseData[key]["Nomor_Temuan"],
        kodeLha: responseData[key]["kode_lha"],
        nomorLha: responseData[key]["Nomor_LHA"],
        nomorRekomendasi: responseData[key]["Nomor_Rekomendasi"],
        kodeKelompokRekomendasi: responseData[key]["Kode_Kelompok_Rekomendasi"],
        kelompokRekomendasi: responseData[key]["Kelompok_Rekomendasi"],
        kodeSubKelompokRekomendasi: responseData[key]["Kode_Sub_Kelompok_Rekomendasi"],
        subKelompokRekomendasi: responseData[key]["Sub_Kelompok_Rekomendasi"],
        memoRekomendasi: responseData[key]["Memo_Rekomendasi"],
        flagPelaku: responseData[key]["Flag_Pelaku"],
        nilaiRekomendasi: responseData[key]["Nilai_Rekomendasi"],
        nilaiTL: responseData[key]["Nilai_TL"],
        statusRekomendasi: responseData[key]["Status_Rekomendasi"],
        memoKoreksiRek: responseData[key]["Memo_Koreksi_rek"],
        kodeUnitObrikTl: responseData[key]["Kode_Unit_Obrik_TL"],
        unitObrik: responseData[key]["Unit_Obrik"],
        kodeBidangObrikTl: responseData[key]["Kode_Bidang_Obrik_TL"],
        bidangObrik: responseData[key]["Bidang_Obrik"],
        kodeSubBidangObrikTl: responseData[key]["Kode_Sub_Bidang_Obrik_TL"],
        subBidangObrik: responseData[key]["Sub_Bidang_Obrik"],

      };
      rekomendasi.push(data);
    }

    context.commit('setRekomendasi', rekomendasi);
    context.commit('setFetchTimestamp');
  },
}