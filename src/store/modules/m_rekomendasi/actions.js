import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadKlpRekomendasi(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/klprekomendasi',
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

    const klpRekomendasi = [];

    for (const key in responseData) {
      const mKlpRekomendasi = {
        id: responseData[key]["kode_kelompok_rekomendasi"],
        deskripsi: responseData[key]["diskripsi"]
      };
      klpRekomendasi.push(mKlpRekomendasi);
    }

    context.commit('setKlpRekomendasi', klpRekomendasi);
    context.commit('setFetchTimestamp');
  },

  async loadSubKlpRekomendasi(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/subklprekomendasi',
      params: {
        kode_kelompok_rekomendasi: payload.idKlpRekomendasi,
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

    const subKlpRekomendasi = [];

    for (const key in responseData) {
      const mSubKlpRekomendasi = {
        id: responseData[key]["kode_sub_kelompok_rekomendasi"],
        idKlpRekomendasi: responseData[key]["kode_kelompok_rekomendasi"],
        deskripsi: responseData[key]["diskripsi"]
      };
      subKlpRekomendasi.push(mSubKlpRekomendasi);
    }

    context.commit('setSubKlpRekomendasi', subKlpRekomendasi);
    context.commit('setFetchTimestamp');
  },
};
