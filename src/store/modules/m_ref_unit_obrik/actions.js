import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  // UNIT OBRIK
  async loadRefUnitObrik(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/unitobrik',
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

    const refUnitObrik = [];

    for (const key in responseData) {
      const runitobrik = {
        id: responseData[key]["Kode_Unit_Obrik"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refUnitObrik.push(runitobrik);
    }

    context.commit('setRefUnitObrik', refUnitObrik);
    context.commit('setFetchTimestamp');
  },
  async loadRefUnitObrikById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/unitobrik/${payload.idUnitObrik}`,
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

    const runitobrik = {
      id: responseData["Kode_Unit_Obrik"],
      deskripsi: responseData["diskripsi"]
    };

    return runitobrik
  },
  async createUnitObrik(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/unitobrik',
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
  async updateUnitObrik(context, payload) {
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/unitobrik/${payload.Kode_Unit_Obrik}`,
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

  async deleteUnitObrikById(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/unitobrik/${payload.idUnitObrik}`,
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

  // BIDANG OBRIK
  async loadRefBidangObrik(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/bidangobrik',
      params: {
        Kode_Unit_Obrik: payload.idUnitObrik,
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

    const refBidangObrik = [];

    for (const key in responseData) {
      const rbidangobrik = {
        id: responseData[key]["Kode_Bidang_Obrik"],
        idUnitObrik: responseData[key]["Kode_Unit_Obrik"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refBidangObrik.push(rbidangobrik);
    }

    context.commit('setRefBidangObrik', refBidangObrik);
    context.commit('setFetchTimestamp');
  },
  async loadRefBidangObrikById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/bidangobrik/${payload.idBidangObrik}`,
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

    const rbidangobrik = {
      id: responseData[key]["Kode_Bidang_Obrik"],
      idUnitObrik: responseData[key]["Kode_Unit_Obrik"],
      deskripsi: responseData[key]["diskripsi"]
    };

    return rbidangobrik
  },

  // SUB BIDANG OBRIK
  async loadRefSubBidangObrik(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/subbidangobrik',
      params: {
        Kode_Bidang_Obrik: payload.idBidangObrik,
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

    const refSubBidangObrik = [];

    for (const key in responseData) {
      const rsubbidangobrik = {
        id: responseData[key]["Kode_Sub_Bidang_Obrik"],
        idBidangObrik: responseData[key]["Kode_Bidang_Obrik"],
        idUnitObrik: responseData[key]["Kode_Unit_Obrik"],
        deskripsi: responseData[key]["diskripsi"]
      };
      refSubBidangObrik.push(rsubbidangobrik);
    }

    context.commit('setRefSubBidangObrik', refSubBidangObrik);
    context.commit('setFetchTimestamp');
  },
  async loadRefSubBidangObrikById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/subbidangobrik/${payload.idSubBidangObrik}`,
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

    const rsubbidangobrik = {
      id: responseData[key]["Kode_Sub_Bidang_Obrik"],
      idBidangObrik: responseData[key]["Kode_Bidang_Obrik"],
      idUnitObrik: responseData[key]["Kode_Unit_Obrik"],
      deskripsi: responseData[key]["diskripsi"]
    };

    return rsubbidangobrik
  },
};
