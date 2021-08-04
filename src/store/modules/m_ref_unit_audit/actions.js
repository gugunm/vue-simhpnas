import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadRefUnitAudit(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/unitaudit',
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

    const refUnitAudit = [];

    for (const key in responseData) {
      const rUnitAudit = {
        id: responseData[key]["Kode_Unit_Audit"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refUnitAudit.push(rUnitAudit);
    }

    context.commit('setRefUnitAudit', refUnitAudit);
    context.commit('setFetchTimestamp');
  },

  async loadRefSubUnitAudit(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/subunitaudit',
      params: {
        Kode_Unit_Audit: payload.idUnitAudit,
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

    const refSubUnitAudit = [];

    for (const key in responseData) {
      const rSubUnitAudit = {
        id: responseData[key]["Kode_Sub_Unit_Audit"],
        idUnitAudit: responseData[key]["Kode_Unit_Audit"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refSubUnitAudit.push(rSubUnitAudit);
    }

    context.commit('setRefSubUnitAudit', refSubUnitAudit);
    context.commit('setFetchTimestamp');
  },
};
