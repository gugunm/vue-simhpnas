import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadRefPeran(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/peran',
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

    const refPeran = [];

    for (const key in responseData) {
      const peran = {
        id: responseData[key]["id_peran"],
        kodePeran: responseData[key]["kode_peran"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refPeran.push(peran);
    }

    context.commit('setRefPeran', refPeran);
    context.commit('setFetchTimestamp');
  },
};
