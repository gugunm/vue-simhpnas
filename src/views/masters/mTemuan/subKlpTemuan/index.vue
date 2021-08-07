<template>
  <div>
    <master-table
      top-title="Data"
      title="Sub Klp. Temuan"
      :desc-title="'- ' + descKlpTemuan"
      :items="items"
      :fields="fields"
    />
    <back-button title="Kembali" />
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';
import MasterTable from '@/views/components/MasterTable';
import BackButton from '@/views/components/BackButton';

const fields = [
  {
    key: 'id',
    label: 'Kode',
    _style: 'width: 15%',
  },
  {
    key: 'deskripsi',
    label: 'Deskripsi Sub Kelompok Temuan',
    _style: 'width: 55%',
  },
  {
    key: 'saran',
    label: 'Rekomendasi',
    _style: 'width: 20%',
  },
  {
    key: 'actions',
    _style: 'width: 10%',
  },
];

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
    BackButton,
  },
  props: {
    idKlpTemuan: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      subKelompokTemuan: null,
      fields,
      descKlpTemuan: null,
    };
  },
  computed: {
    items() {
      return this.subKelompokTemuan
        ? this.subKelompokTemuan.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadSubKelompokTemuan();
    this.loadDescKlpTemuan();
  },
  methods: {
    async loadSubKelompokTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadSubKelompokTemuan', {
          idKlpTemuan: this.idKlpTemuan,
          forceRefresh: refresh,
        });
        this.subKelompokTemuan =
          this.$store.getters['m_temuan/subKelompokTemuan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadDescKlpTemuan() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/klptemuan/${this.idKlpTemuan}`,
        params: {
          token: localStorage.getItem('api_token'),
        },
      });

      if (response.status != 200) {
        const error = new Error(
          responseData.message || 'Failed to fetch data unit kerja.'
        );
        throw error;
      }

      this.descKlpTemuan = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
