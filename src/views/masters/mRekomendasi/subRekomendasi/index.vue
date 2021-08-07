<template>
  <div>
    <master-table
      title="Sub Rekomendasi"
      :desc-title="descRekomendasi"
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
    label: 'Deskripsi Sub Rekomendasi',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
    BackButton,
  },
  props: {
    idKlpRekomendasi: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      subKlpRekomendasi: null,
      fields,
      descRekomendasi: null,
    };
  },
  computed: {
    items() {
      return this.subKlpRekomendasi
        ? this.subKlpRekomendasi.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefLingkupAudit();
    this.loadDescRekomendasi();
  },
  methods: {
    async loadRefLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_rekomendasi/loadSubKlpRekomendasi', {
          idKlpRekomendasi: this.idKlpRekomendasi,
          forceRefresh: refresh,
        });
        this.subKlpRekomendasi =
          this.$store.getters['m_rekomendasi/subKlpRekomendasi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadDescRekomendasi() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/klprekomendasi/${this.idKlpRekomendasi}`,
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

      this.descRekomendasi = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
