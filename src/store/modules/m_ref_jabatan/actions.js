import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadRefJabatan(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/jabatan',
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

    const refJabatan = [];

    for (const key in responseData) {
      const rjabatan = {
        id: responseData[key]["kode_jabatan"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refJabatan.push(rjabatan);
    }

    context.commit('setRefJabatan', refJabatan);
    context.commit('setFetchTimestamp');
  },


  async loadRefJabatanById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/jabatan/${payload.idJabatan}`,
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

    const rjabatan = {
      id: responseData["kode_jabatan"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setRefJabatanById', rjabatan);
  },


  async createRefJabatan(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/jabatan',
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


  async updateRefJabatan(context, payload) {
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/jabatan/${payload.kode_jabatan}`,
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


  async deleteRefJabatan(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/jabatan/${payload.idJabatan}`,
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
