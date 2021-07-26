import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadJenisTemuan(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/jenistemuan',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data jenis temuan'
      );
      throw error;
    }

    const jenisTemuan = [];

    for (const key in responseData) {
      const jt = {
        id: responseData[key]["Kode_Jenis_Temuan"],
        deskripsi: responseData[key]["diskripsi"],
      };
      jenisTemuan.push(jt);
    }

    context.commit('setJenisTemuan', jenisTemuan);
    context.commit('setFetchTimestamp');
  }
};
