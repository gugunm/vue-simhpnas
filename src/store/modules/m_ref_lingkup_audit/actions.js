import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  // +++++ GROUP LINGKUP AUDIT +++++
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
        responseData.message || 'Failed to fetch data'
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


  async loadRefGroupLingkupAuditById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/grplingkupaudit/${payload.idGroupLingkupAudit}`,
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

    const rGroupLingkupAudit = {
      id: responseData["kode_grup_lingkup_audit"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setRefGroupLingkupAuditById', rGroupLingkupAudit);
  },


  async createRefGroupLingkupAudit(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/grplingkupaudit',
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

  async updateRefGroupLingkupAudit(context, payload) {
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/grplingkupaudit/${payload.kode_grup_lingkup_audit}`,
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

    return responseData
  },

  async deleteRefGroupLingkupAudit(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/grplingkupaudit/${payload.idGroupLingkupAudit}`,
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

    return responseData
  },




  // ++++++ LINGKUP AUDIT ++++++
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


  async loadRefLingkupAuditById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/lingkupaudit/${payload.idLingkupAudit}`,
      params: {
        token: localStorage.getItem('api_token'),
      },
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data'
      );
      throw error;
    }

    const rLingkupAudit = {
      id: responseData["kode_lingkup_audit"],
      idGroupLingkupAudit: responseData["kode_grup_lingkup_audit"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setRefLingkupAuditById', rLingkupAudit)
  },


  async createRefLingkupAudit(context, payload) {
    // console.log(payload)
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/lingkupaudit',
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

  async updateRefLingkupAudit(context, payload) {
    // console.log('UPDATE LINGKUP AUDIT')
    // console.log(payload)
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/lingkupaudit/${payload.kode_lingkup_audit}`,
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

    return responseData
  },

  async deleteRefLingkupAudit(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/lingkupaudit/${payload.idLingkupAudit}`,
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

    return responseData
  },


};
