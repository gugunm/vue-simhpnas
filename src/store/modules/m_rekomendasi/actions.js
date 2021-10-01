import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  // +++++ KLP REKOMENDASI +++++
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

  async loadKlpRekomendasiById(context, payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/klprekomendasi/${payload.idKlpRekomendasi}`,
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

    const mKlpRekomendasi = {
      id: responseData["kode_kelompok_rekomendasi"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setKlpRekomendasiById', mKlpRekomendasi);
  },

  async createKlpRekomendasi(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/klprekomendasi',
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

  async updateKlpRekomendasi(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/klprekomendasi/${payload.kode_kelompok_rekomendasi}`,
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

    return responseData
  },

  async deleteKlpRekomendasi(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/klprekomendasi/${payload.idKlpRekomendasi}`,
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

    return responseData
  },




  // +++++ SUB KLP REKOMENDASI +++++
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

  async loadSubKlpRekomendasiById(context, payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/subklprekomendasi/${payload.idSubKlpRekomendasi}`,
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

    const mSubKlpRekomendasi = {
      id: responseData["kode_sub_kelompok_rekomendasi"],
      idKlpRekomendasi: responseData["kode_kelompok_rekomendasi"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setSubKlpRekomendasiById', mSubKlpRekomendasi);
  },

  async createSubKlpRekomendasi(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/subklprekomendasi',
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

  async updateSubKlpRekomendasi(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/subklprekomendasi/${payload.kode_sub_kelompok_rekomendasi}`,
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

    return responseData
  },

  async deleteSubKlpRekomendasi(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/subklprekomendasi/${payload.idSubKlpRekomendasi}`,
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

    return responseData
  },

};
