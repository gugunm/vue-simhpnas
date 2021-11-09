import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadPenyebab(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/penyebab',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data penyebab'
      );
      throw error;
    }

    const penyebab = [];

    for (const key in responseData) {
      const p = {
        id: responseData[key]["kode_penyebab"],
        deskripsi: responseData[key]["diskripsi"],
      };
      penyebab.push(p);
    }

    context.commit('setPenyebab', penyebab);
    context.commit('setFetchTimestamp');
  },

  async loadPenyebabById(context, payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/penyebab/${payload.idPenyebab}`,
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

    const penyebab = {
      id: responseData["kode_penyebab"],
      deskripsi: responseData["diskripsi"],
    };

    context.commit('setPenyebabById', penyebab);
  },

  async createPenyebab(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/penyebab',
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

  async updatePenyebab(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/penyebab/${payload.kode_penyebab}`,
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

  async deletePenyebab(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/penyebab/${payload.idPenyebab}`,
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
