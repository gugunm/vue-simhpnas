import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadUserUnit(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/penggunaunitkerja',
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

    context.commit('setUserUnit', responseData);
    context.commit('setFetchTimestamp');
  },

  async loadUserUnitById(context, payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/penggunaunitkerja/${payload.idUser}`,
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

    context.commit('setUserUnitById', responseData);
  },

  async createUserUnit(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/penggunaunitkerja',
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

  async updateUserUnit(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/penggunaunitkerja/${payload.idUser}`,
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

  async deleteUserUnit(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/penggunaunitkerja/${payload.idUser}`,
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
