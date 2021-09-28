<template>
  <div>
    <master-table
      top-title="Data"
      title="Kecamatan"
      :desc-title="'di ' + descKabkot"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-add-button="false"
      @clicked-row="showDetailKecamatan"
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
    label: 'Nama Kecamatan',
    _style: 'width: 70%',
  },
  // {
  //   key: 'actions',
  //   _style: 'width: 15%',
  // },
];

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
    BackButton,
  },
  props: {
    idKabkot: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      refKecamatan: null,
      descKabkot: null,
      fields,
      selectedItem: null,
    };
  },
  computed: {
    items() {
      return this.refKecamatan
        ? this.refKecamatan.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefKecamatan();
    this.loadDescKabkot();
  },
  methods: {
    async loadRefKecamatan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefKecamatan', {
          idKabkot: this.idKabkot,
          forceRefresh: refresh,
        });
        this.refKecamatan = this.$store.getters['m_ref_wilayah/refKecamatan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailKecamatan(item) {
      this.$router.push({
        name: 'master-ref-wilayah-kecamatan',
        params: { idKecamatan: item.id, deskripsi: item.deskripsi },
      });
    },
    async loadDescKabkot() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/kabkota/${this.idKabkot}`,
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

      this.descKabkot = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
