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
  }
};
