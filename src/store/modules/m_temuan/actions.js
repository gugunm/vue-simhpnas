import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  // +++++ JENIS TEMUAN +++++
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
  },

  async loadJenisTemuanById(context, payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/jenistemuan/${payload.idJenisTemuan}`,
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

    const jenisTemuan = {
      id: responseData["Kode_Jenis_Temuan"],
      deskripsi: responseData["diskripsi"],
    };

    context.commit('setJenisTemuanById', jenisTemuan);
  },

  async createJenisTemuan(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/jenistemuan',
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

  async updateJenisTemuan(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/jenistemuan/${payload.Kode_Jenis_Temuan}`,
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

  async deleteJenisTemuan(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/jenistemuan/${payload.idJenisTemuan}`,
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




  // +++++ KELOMPOK TEMUAN +++++
  async loadKelompokTemuan(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/klptemuan',
      params: {
        Kode_Jenis_Temuan: payload.idJenisTemuan,
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data kelompok temuan'
      );
      throw error;
    }

    const kelompokTemuan = [];

    for (const key in responseData) {
      const kt = {
        id: responseData[key]["Kode_Kelompok_Temuan"],
        idJenisTemuan: responseData[key]["Kode_Jenis_Temuan"],
        deskripsi: responseData[key]["diskripsi"],
      };
      kelompokTemuan.push(kt);
    }

    context.commit('setKelompokTemuan', kelompokTemuan);
    context.commit('setFetchTimestamp');
  },

  async loadKelompokTemuanById(context, payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/klptemuan/${payload.idKlpTemuan}`,
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

    const kelompokTemuan = {
      id: responseData["Kode_Kelompok_Temuan"],
      idJenisTemuan: responseData["Kode_Jenis_Temuan"],
      deskripsi: responseData["diskripsi"],
    };

    context.commit('setKelompokTemuanById', kelompokTemuan);
  },

  async createKelompokTemuan(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/klptemuan',
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
  async updateKelompokTemuan(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/klptemuan/${payload.Kode_Kelompok_Temuan}`,
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
  async deleteKelompokTemuan(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/klptemuan/${payload.idKlpTemuan}`,
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




  // +++++ SUB KELOMPOK TEMUAN +++++
  async loadSubKelompokTemuan(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/subklptemuan',
      params: {
        Kode_Kelompok_Temuan: payload.idKlpTemuan,
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data kelompok temuan'
      );
      throw error;
    }

    const subKelompokTemuan = [];

    for (const key in responseData) {
      const skt = {
        id: responseData[key]["Kode_Sub_Kelompok_Temuan"],
        idKlpTemuan: responseData[key]["Kode_Kelompok_Temuan"],
        idJenisTemuan: responseData[key]["Kode_Jenis_Temuan"],
        deskripsi: responseData[key]["diskripsi"],
        saran: responseData[key]["saran_rekomendasi"]
      };
      subKelompokTemuan.push(skt);
    }

    context.commit('setSubKelompokTemuan', subKelompokTemuan);
    context.commit('setFetchTimestamp');
  },

  async loadSubKelompokTemuanById(context, payload){
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/subklptemuan/${payload.idSubKlpTemuan}`,
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

    const skt = {
      id: responseData["Kode_Sub_Kelompok_Temuan"],
      idKlpTemuan: responseData["Kode_Kelompok_Temuan"],
      idJenisTemuan: responseData["Kode_Jenis_Temuan"],
      deskripsi: responseData["diskripsi"],
      saran: responseData["saran_rekomendasi"]
    };

    context.commit('setSubKelompokTemuanById', skt);

  },
  async createSubKelompokTemuan(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/subklptemuan',
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
  async updateSubKelompokTemuan(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/subklptemuan/${payload.Kode_Sub_Kelompok_Temuan}`,
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
  async deleteSubKelompokTemuan(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/subklptemuan/${payload.idSubKlpTemuan}`,
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
