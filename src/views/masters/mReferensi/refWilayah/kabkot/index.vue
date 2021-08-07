<template>
  <div>
    <master-table
      top-title="Data"
      title="Kab/Kota"
      :desc-title="'di ' + descProvinsi"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailKabkot"
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
    label: 'Nama Kab/Kota',
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
    idProvinsi: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      refKabkot: null,
      descProvinsi: null,
      fields,
      selectedItem: null,
    };
  },
  computed: {
    items() {
      return this.refKabkot
        ? this.refKabkot.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefKabkot();
    this.loadDescProvinsi();
  },
  methods: {
    async loadRefKabkot(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefKabkot', {
          idProvinsi: this.idProvinsi,
          forceRefresh: refresh,
        });
        this.refKabkot = this.$store.getters['m_ref_wilayah/refKabkot'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailKabkot(item) {
      this.$router.push({
        name: 'master-ref-wilayah-kabkot',
        params: { idKabkot: item.id, deskripsi: item.deskripsi },
      });
    },
    async loadDescProvinsi() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/provinsi/${this.idProvinsi}`,
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

      this.descProvinsi = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
