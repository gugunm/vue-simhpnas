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
  }
};
