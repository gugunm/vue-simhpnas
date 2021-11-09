import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadRefJenisAnggaran(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/jenisanggaran',
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

    const refJenisAnggaran = [];

    for (const key in responseData) {
      const rjenisanggaran = {
        id: responseData[key]["kode_jenis_anggaran"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refJenisAnggaran.push(rjenisanggaran);
    }

    context.commit('setRefJenisAnggaran', refJenisAnggaran);
    context.commit('setFetchTimestamp');
  },

  async loadRefJenisAnggaranById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/jenisanggaran/${payload.idJenisAnggaran}`,
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

    const rjenisanggaran = {
      id: responseData["kode_jenis_anggaran"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setRefJenisAnggaranById', rjenisanggaran);
  },

  async createRefJenisAnggaran(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/jenisanggaran',
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

  async updateRefJenisAnggaran(context, payload) {
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/jenisanggaran/${payload.kode_jenis_anggaran}`,
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

  async deleteRefJenisAnggaran(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/jenisanggaran/${payload.idJenisAnggaran}`,
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
  }
};
