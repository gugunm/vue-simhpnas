import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadRefJenisObrik(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/jenisobrik',
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

    const refJenisObrik = [];

    for (const key in responseData) {
      const rjenisobrik = {
        id: responseData[key]["kode_jenis_obrik"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refJenisObrik.push(rjenisobrik);
    }

    context.commit('setRefJenisObrik', refJenisObrik);
    context.commit('setFetchTimestamp');
  },


  async loadRefJenisObrikById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/jenisobrik/${payload.idJenisObrik}`,
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

    const rjenisobrik = {
      id: responseData["kode_jenis_obrik"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setRefJenisObrikById', rjenisobrik);
  },

  async createRefJenisObrik(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/jenisobrik',
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

  async updateRefJenisObrik(context, payload) {
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/jenisobrik/${payload.kode_jenis_obrik}`,
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

  async deleteRefJenisObrik(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/jenisobrik/${payload.idJenisObrik}`,
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
  }
};
