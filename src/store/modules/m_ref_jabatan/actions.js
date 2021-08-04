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
  }
};
