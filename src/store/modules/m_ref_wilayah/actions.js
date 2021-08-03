import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

export default {
  /** Load Provinsi */
  async loadRefProvinsi(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/provinsi',
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

    const refProvinsi = [];

    for (const key in responseData) {
      const rw = {
        id: responseData[key]["Kode_Provinsi"],
        deskripsi: responseData[key]["diskripsi"],
      };
      refProvinsi.push(rw);
    }

    context.commit('setRefProvinsi', refProvinsi);
    context.commit('setFetchTimestamp');
  },

  /** Load Kabupaten dan Kota */
  async loadRefKabkot(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/kabkota',
      params: {
        Kode_Provinsi: payload.idProvinsi,
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

    const refKabkot = [];

    for (const key in responseData) {
      const rkabkot = {
        id: responseData[key]["Kode_KabupatenKota"],
        idProvinsi: responseData[key]["Kode_Provinsi"],
        deskripsi: responseData[key]["diskripsi"],
      };
      refKabkot.push(rkabkot);
    }

    context.commit('setRefKabkot', refKabkot);
    context.commit('setFetchTimestamp');
  },

  /** Load Kecamatan */
  async loadRefKecamatan(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/kecamatan',
      params: {
        Kode_KabupatenKota: payload.idKabkot,
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

    const refKecamatan = [];

    for (const key in responseData) {
      const rkecamatan = {
        id: responseData[key]["Kode_Kecamatan"],
        idKabkot: responseData[key]["Kode_KabupatenKota"],
        idProvinsi: responseData[key]["Kode_Provinsi"],
        deskripsi: responseData[key]["diskripsi"],
      };
      refKecamatan.push(rkecamatan);
    }

    context.commit('setRefKecamatan', refKecamatan);
    context.commit('setFetchTimestamp');
  },

  /** Load Kelurahan */
  async loadRefKelurahan(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/kelurahan',
      params: {
        Kode_Kecamatan: payload.idKecamatan,
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

    const refKelurahan = [];

    for (const key in responseData) {
      const rkelurahan = {
        id: responseData[key]["Kode_Kelurahan"],
        idKecamatan: responseData[key]["Kode_Kecamatan"],
        idKabkot: responseData[key]["Kode_KabupatenKota"],
        idProvinsi: responseData[key]["Kode_Provinsi"],
        deskripsi: responseData[key]["diskripsi"],
      };
      refKelurahan.push(rkelurahan);
    }

    context.commit('setRefKelurahan', refKelurahan);
    context.commit('setFetchTimestamp');
  },
};
