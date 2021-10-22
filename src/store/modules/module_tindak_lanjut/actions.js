import axios from 'axios';
import { API_URL } from '@/utils/api.js'

export default {
  async loadTindakLanjut(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/tl',
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

    const tl = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_tl"],
        kodeRekomendasi: responseData[key]["kode_rekomendasi"],
        kodeTemuan: responseData[key]["kode_temuan"],
        kodeLha: responseData[key]["kode_lha"],
        nomorTl: responseData[key]["Nomor_TL"],
        nomorRekomendasi: responseData[key]["Nomor_Rekomendasi"],
        nomorTemuan: responseData[key]["Nomor_Temuan"],
        nomorLha: responseData[key]["Nomor_LHA"],
        kodeKelompokTl: responseData[key]["Kode_Kelompok_TL"],
        kelompokTl: responseData[key]["Kelompok_TL"],
        kodeSubKelompokTl: responseData[key]["Kode_Sub_Kelompok_TL"],
        subKelompokTl: responseData[key]["Sub_Kelompok_TL"],
        memoTl: responseData[key]["Memo_TL"],
        nilaiTl: responseData[key]["Nilai_TL"],
        statusTl: responseData[key]["Status_TL"],
        flagKirim: responseData[key]["Flag_kirim"],
        tanggalEntry: responseData[key]["Tanggal_Entry"],
        userEntry: responseData[key]["User_Entry"],
        tanggalKt: responseData[key]["Tanggal_KT"],
        userKt: responseData[key]["User_KT"],
        tanggalUpdate: responseData[key]["Tanggal_update"],
        userUpdate: responseData[key]["User_Update"],
        flagDalnis: responseData[key]["Flag_Dalnis"],
        tanggalDalnis: responseData[key]["Tanggal_Dalnis"],
        userDalnis: responseData[key]["User_Dalnis"],
        catatanDalnis: responseData[key]["Catatan_Dalnis"],
        flagDaltu: responseData[key]["Flag_Daltu"],
        tanggalDaltu: responseData[key]["Tanggal_Daltu"],
        userDaltu: responseData[key]["User_Daltu"],
        catatanDaltu: responseData[key]["Catatan_Daltu"],
        flagAdmin: responseData[key]["Flag_Admin"],
        tanggalAdmin: responseData[key]["Tanggal_Admin"],
        userAdmin: responseData[key]["User_Admin"],
        catatanAdmin: responseData[key]["Catatan_Admin"],
        tanggalGabung: responseData[key]["Tanggal_Gabung"],
        userGabung: responseData[key]["User_Gabung"],
        statusPostTl: responseData[key]["Status_post_tl"],
        memoKoreksiTl: responseData[key]["Memo_Koreksi_tl"],
        uploadFileTl: responseData[key]["Upload_file_TL"],
      };
      tl.push(data);
    }

    context.commit('setTindakLanjut', tl);
    context.commit('setFetchTimestamp');
  },

  async loadTindakLanjutById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/tl/${payload.idTl}`,
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
      id: responseData["kode_tl"],
      kodeRekomendasi: responseData["kode_rekomendasi"],
      kodeTemuan: responseData["kode_temuan"],
      kodeLha: responseData["kode_lha"],
      nomorTl: responseData["Nomor_TL"],
      nomorRekomendasi: responseData["Nomor_Rekomendasi"],
      nomorTemuan: responseData["Nomor_Temuan"],
      nomorLha: responseData["Nomor_LHA"],
      kodeKelompokTl: responseData["Kode_Kelompok_TL"],
      kelompokTl: responseData["Kelompok_TL"],
      kodeSubKelompokTl: responseData["Kode_Sub_Kelompok_TL"],
      subKelompokTl: responseData["Sub_Kelompok_TL"],
      memoTl: responseData["Memo_TL"],
      nilaiTl: responseData["Nilai_TL"],
      statusTl: responseData["Status_TL"],
      flagKirim: responseData["Flag_kirim"],
      tanggalEntry: responseData["Tanggal_Entry"],
      userEntry: responseData["User_Entry"],
      tanggalKt: responseData["Tanggal_KT"],
      userKt: responseData["User_KT"],
      tanggalUpdate: responseData["Tanggal_update"],
      userUpdate: responseData["User_Update"],
      flagDalnis: responseData["Flag_Dalnis"],
      tanggalDalnis: responseData["Tanggal_Dalnis"],
      userDalnis: responseData["User_Dalnis"],
      catatanDalnis: responseData["Catatan_Dalnis"],
      flagDaltu: responseData["Flag_Daltu"],
      tanggalDaltu: responseData["Tanggal_Daltu"],
      userDaltu: responseData["User_Daltu"],
      catatanDaltu: responseData["Catatan_Daltu"],
      flagAdmin: responseData["Flag_Admin"],
      tanggalAdmin: responseData["Tanggal_Admin"],
      userAdmin: responseData["User_Admin"],
      catatanAdmin: responseData["Catatan_Admin"],
      tanggalGabung: responseData["Tanggal_Gabung"],
      userGabung: responseData["User_Gabung"],
      statusPostTl: responseData["Status_post_tl"],
      memoKoreksiTl: responseData["Memo_Koreksi_tl"],
      isStored: responseData["is_stored"],
      uploadFileTl: responseData["Upload_file_TL"],
    };

    context.commit('setTindakLanjutById', data);
  },

  async createTindakLanjut(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/tl',
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

  async deleteTindakLanjutById(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/tl/${payload.idTl}`,
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
  },

  async updateTindakLanjutById(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload.data,
      baseURL: API_URL,
      url: `/api/tl/${payload.idTl}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to update data'
      );
      throw error;
    }

    return response
  },
}