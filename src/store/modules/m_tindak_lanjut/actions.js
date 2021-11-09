import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  // +++++ KLP TINDAK LANJUT +++++
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

  async loadKlpTindakLanjutById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/klptl/${payload.idKlpTindakLanjut}`,
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

    const mKlpTindakLanjut = {
      id: responseData["kode_kelompok_tl"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setKlpTindakLanjutById', mKlpTindakLanjut);
  },

  async createKlpTindakLanjut(context,payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/klptl',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to save data'
      );
      throw error;
    }
    
    return responseData
  },

  async updateKlpTindakLanjut(context,payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/klptl/${payload.kode_kelompok_tl}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to update data'
      );
      throw error;
    }

    return responseData
  },

  async deleteKlpTindakLanjut(context,payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/klptl/${payload.idKlpTindakLanjut}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to delete data'
      );
      throw error;
    }

    return responseData
  },






  // ++++++ SUB KLP TINDAK LANJUT ++++++
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

  async loadSubKlpTindakLanjutById(context,payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/subklptl/${payload.idSubKlpTindakLanjut}`,
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

    const mSubKlpTindakLanjut = {
      id: responseData["kode_sub_kelompok_tl"],
      idKlpTindakLanjut: responseData["kode_kelompok_tl"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setSubKlpTindakLanjutById', mSubKlpTindakLanjut);
  },

  async createSubKlpTindakLanjut(context,payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/subklptl',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to save data'
      );
      throw error;
    }
    
    return responseData
  },

  async updateSubKlpTindakLanjut(context,payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/subklptl/${payload.kode_sub_kelompok_tl}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to update data'
      );
      throw error;
    }

    return responseData
  },

  async deleteSubKlpTindakLanjut(context,payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/subklptl/${payload.idSubKlpTindakLanjut}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to delete data'
      );
      throw error;
    }

    return responseData
  },

};
