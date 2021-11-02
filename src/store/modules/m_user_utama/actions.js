import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadUserUtama(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/pengguna',
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

    context.commit('setUserUtama', responseData);
    context.commit('setFetchTimestamp');
  },

  async loadUserUtamaById(context, payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/pengguna/${payload.idUser}`,
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

    context.commit('setUserUtamaById', responseData);
  },

  async createUserUtama(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/pengguna',
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

  async updateUserUtama(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/pengguna/${payload.idUser}`,
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

  async deleteUserUtama(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/pengguna/${payload.idUser}`,
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
