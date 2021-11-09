import axios from 'axios';
import { API_URL } from '@/utils/api.js'

export default {
  async loadPenyebab(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/datapenyebab',
      params: {
        kode_temuan: payload.idTemuan,
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

    const penyebab = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_penyebab"],
        kodeTemuan: responseData[key]["kode_temuan"],
        kodeLha: responseData[key]["kode_lha"],
        nomorTemuan: responseData[key]["Nomor_Temuan"],
        nomorLha: responseData[key]["Nomor_LHA"],
        nomorPenyebab: responseData[key]["Nomor_Penyebab"],
        refKodePenyebab: responseData[key]["Ref_Kode_Penyebab"],
        deskripsi: responseData[key]["diskripsi"],
        memoPenyebab: responseData[key]["Memo_Penyebab"],        
      };
      penyebab.push(data);
    }

    context.commit('setPenyebab', penyebab);
    context.commit('setFetchTimestamp');
  },

  async loadPenyebabById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/datapenyebab/${payload.idPenyebab}`,
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

    const data = {
      id: responseData["kode_penyebab"],
      kodeTemuan: responseData["kode_temuan"],
      kodeLha: responseData["kode_lha"],
      nomorTemuan: responseData["Nomor_Temuan"],
      nomorLha: responseData["Nomor_LHA"],
      nomorPenyebab: responseData["Nomor_Penyebab"],
      refKodePenyebab: responseData["Ref_Kode_Penyebab"],
      deskripsi: responseData["diskripsi"],
      memoPenyebab: responseData["Memo_Penyebab"],        
    };

    context.commit('setPenyebabById', data);
  },

  async createPenyebab(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/datapenyebab',
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

  async deletePenyebabById(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/datapenyebab/${payload.idPenyebab}`,
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

    return response
  },

  async updatePenyebabById(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload.data,
      baseURL: API_URL,
      url: `/api/datapenyebab/${payload.idPenyebab}`,
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

    return response
  },
}