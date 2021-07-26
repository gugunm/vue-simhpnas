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
        id: responseData[key]["Kode_Unit_Obrik"],
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
  }
};
