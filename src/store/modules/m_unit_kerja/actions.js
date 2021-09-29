import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  async loadUnitKerja(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/unitkerja',
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

    const unitKerja = [];

    for (const key in responseData) {
      const uk = {
        id: responseData[key]["Kode_Unit_Audit"],
        namaUnit: responseData[key]["Nama_Unit"],
        namaPimpinan: responseData[key]["Nama_Pimpinan"],
        nipPimpinan: responseData[key]["NIP_Pimpinan"],
        alamat: responseData[key]["Alamat"],
        provinsi: responseData[key]["Provinsi"],
        kabkot: responseData[key]["Kabupaten_kota"],
        kecamatan: responseData[key]["Kecamatan"],
        kelurahan: responseData[key]["Kelurahan"],
        jumlahObrik: responseData[key]["Jumlah_Obrik"],
        jumlahObrikBersih: responseData[key]["Jumlah_Obrik_Bersih"],
        telpon: responseData[key]["telpon"],
      };
      unitKerja.push(uk);
    }

    context.commit('setUnitKerja', unitKerja);
    context.commit('setFetchTimestamp');
  },

  async loadUnitKerjaById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/unitkerja/${payload.idUnitKerja}`,
      params: {
        token: localStorage.getItem('api_token'),
      },
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data unit kerja.'
      );
      throw error;
    }

    const unitKerjaById = {
      id: responseData["Kode_Unit_Audit"],
      namaUnit: responseData["Nama_Unit"],
      namaPimpinan: responseData["Nama_Pimpinan"],
      nipPimpinan: responseData["NIP_Pimpinan"],
      alamat: responseData["Alamat"],
      provinsi: responseData["Provinsi"],
      kabkot: responseData["Kabupaten_kota"],
      kecamatan: responseData["Kecamatan"],
      kelurahan: responseData["Kelurahan"],
      jumlahObrik: responseData["Jumlah_Obrik"],
      jumlahObrikBersih: responseData["Jumlah_Obrik_Bersih"],
      telpon: responseData["telpon"],
    };

    return unitKerjaById
  },

  async createUnitKerja(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/unitkerja',
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

  async updateUnitKerja(context, payload){
    const response = await axios({
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: `/api/unitkerja/${payload.Kode_Unit_Audit}`,
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

  async deleteUnitKerjaById(context, payload){
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/unitkerja/${payload.idUnitKerja}`,
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

    // context.commit('setDeleteUnitKerjaById', payload.idUnitKerja);
    return response
  }
};
