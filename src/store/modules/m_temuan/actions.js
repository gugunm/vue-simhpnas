import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadJenisTemuan(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/jenistemuan',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data jenis temuan'
      );
      throw error;
    }

    const jenisTemuan = [];

    for (const key in responseData) {
      const jt = {
        id: responseData[key]["Kode_Jenis_Temuan"],
        deskripsi: responseData[key]["diskripsi"],
      };
      jenisTemuan.push(jt);
    }

    context.commit('setJenisTemuan', jenisTemuan);
    context.commit('setFetchTimestamp');
  },

  async loadKelompokTemuan(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/klptemuan',
      params: {
        Kode_Jenis_Temuan: payload.idJenisTemuan,
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    // console.log("Kelompok Temuan : ", responseData)

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data kelompok temuan'
      );
      throw error;
    }

    const kelompokTemuan = [];

    for (const key in responseData) {
      const kt = {
        id: responseData[key]["Kode_Kelompok_Temuan"],
        deskripsi: responseData[key]["diskripsi"],
      };
      kelompokTemuan.push(kt);
    }

    context.commit('setKelompokTemuan', kelompokTemuan);
    context.commit('setFetchTimestamp');
  },

  async loadSubKelompokTemuan(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/subklptemuan',
      params: {
        Kode_Kelompok_Temuan: payload.idKlpTemuan,
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    // console.log("Sub Kelompok Temuan : ", responseData)

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data kelompok temuan'
      );
      throw error;
    }

    const subKelompokTemuan = [];

    for (const key in responseData) {
      const skt = {
        id: responseData[key]["Kode_Sub_Kelompok_Temuan"],
        deskripsi: responseData[key]["diskripsi"],
        saran: responseData[key]["saran_rekomendasi"]
      };
      subKelompokTemuan.push(skt);
    }

    context.commit('setSubKelompokTemuan', subKelompokTemuan);
    context.commit('setFetchTimestamp');
  }
};
