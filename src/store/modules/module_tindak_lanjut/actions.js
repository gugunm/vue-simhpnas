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
        sub_Kelompok_Tl: responseData[key]["Sub_Kelompok_TL"],
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
}