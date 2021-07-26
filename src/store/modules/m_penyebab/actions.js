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
  }
};
