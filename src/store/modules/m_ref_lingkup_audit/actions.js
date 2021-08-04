import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadRefGroupLingkupAudit(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/grplingkupaudit',
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

    const refGroupLingkupAudit = [];

    for (const key in responseData) {
      const rGroupLingkupAudit = {
        id: responseData[key]["kode_grup_lingkup_audit"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refGroupLingkupAudit.push(rGroupLingkupAudit);
    }

    context.commit('setRefGroupLingkupAudit', refGroupLingkupAudit);
    context.commit('setFetchTimestamp');
  },

  async loadRefLingkupAudit(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/lingkupaudit',
      params: {
        kode_grup_lingkup_audit: payload.idGroupLingkupAudit,
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

    const refLingkupAudit = [];

    for (const key in responseData) {
      const rLingkupAudit = {
        id: responseData[key]["kode_lingkup_audit"],
        idGroupLingkupAudit: responseData[key]["kode_grup_lingkup_audit"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refLingkupAudit.push(rLingkupAudit);
    }

    context.commit('setRefLingkupAudit', refLingkupAudit);
    context.commit('setFetchTimestamp');
  },
};
