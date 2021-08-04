import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadKlpTindakLanjut(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/klptl',
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

    const klpTindakLanjut = [];

    for (const key in responseData) {
      const mKlpTindakLanjut = {
        id: responseData[key]["kode_kelompok_tl"],
        deskripsi: responseData[key]["diskripsi"]
      };
      klpTindakLanjut.push(mKlpTindakLanjut);
    }

    context.commit('setKlpTindakLanjut', klpTindakLanjut);
    context.commit('setFetchTimestamp');
  },

  async loadSubKlpTindakLanjut(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/subklptl',
      params: {
        kode_kelompok_tl: payload.idKlpTindakLanjut,
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

    const subKlpTindakLanjut = [];

    for (const key in responseData) {
      const mSubKlpTindakLanjut = {
        id: responseData[key]["kode_sub_kelompok_tl"],
        idKlpTindakLanjut: responseData[key]["kode_kelompok_tl"],
        deskripsi: responseData[key]["diskripsi"]
      };
      subKlpTindakLanjut.push(mSubKlpTindakLanjut);
    }

    context.commit('setSubKlpTindakLanjut', subKlpTindakLanjut);
    context.commit('setFetchTimestamp');
  },
};
