<template>
  <div>
    <Form
      v-if="item"
      :selected-item="item"
      mode="edit"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';

import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idUnitKerja'],
  data() {
    return {
      loading: false,
      item: '',
      error: '',
    };
  },
  mounted() {
    this.loadUnitKerjaById();
  },
  methods: {
    async loadUnitKerjaById() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/unitkerja/${this.idUnitKerja}`,
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
        id: responseData['Kode_Unit_Obrik'],
        namaUnit: responseData['Nama_Unit'],
        namaPimpinan: responseData['Nama_Pimpinan'],
        nipPimpinan: responseData['NIP_Pimpinan'],
        alamat: responseData['Alamat'],
        provinsi: responseData['Provinsi'],
        kabkot: responseData['Kabupaten_kota'],
        kecamatan: responseData['Kecamatan'],
        kelurahan: responseData['Kelurahan'],
        jumlahObrik: responseData['Jumlah_Obrik'],
        jumlahObrikBersih: responseData['Jumlah_Obrik_Bersih'],
        telpon: responseData['telpon'],
      };

      this.item = unitKerjaById;
    },
  },
};
</script>