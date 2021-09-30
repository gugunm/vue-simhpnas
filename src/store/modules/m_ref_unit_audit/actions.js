import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  // +++++ UNIT AUDIT +++++
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

  async loadRefUnitAuditById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/unitaudit/${payload.idUnitAudit}`,
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

    const rUnitAudit = {
      id: responseData["Kode_Unit_Audit"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setRefUnitAuditById', rUnitAudit);
  },

  async createRefUnitAudit(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/unitaudit',
      params: {
        token: localStorage.getItem('api_token')
      },
    })
    const responseData = await response.data;
    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to save data'
      );
      throw error;
    }
    return response
  },

  async updateRefUnitAudit(context, payload) {
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/unitaudit/${payload.Kode_Unit_Audit}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to update data'
      );
      throw error;
    }

    return response
  },




  // +++++ SUB UNIT AUDIT +++++
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

  async loadRefSubUnitAuditById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/subunitaudit/${payload.idSubUnitAudit}`,
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

    const rSubUnitAudit = {
      id: responseData["Kode_Sub_Unit_Audit"],
      idUnitAudit: responseData["Kode_Unit_Audit"],
      deskripsi: responseData["diskripsi"]
    };

    context.commit('setRefSubUnitAuditById', rSubUnitAudit);
  },

  async createRefSubUnitAudit(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/subunitaudit',
      params: {
        token: localStorage.getItem('api_token')
      },
    })
    const responseData = await response.data;
    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to save data'
      );
      throw error;
    }
    return response
  },

  async updateRefSubUnitAudit(context, payload) {
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/subunitaudit/${payload.Kode_Sub_Unit_Audit}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to update data'
      );
      throw error;
    }

    return response
  },

  async deleteRefSubUnitAudit(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/subunitaudit/${payload.idSubUnitAudit}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to delete data'
      );
      throw error;
    }

    return response
  },
};
