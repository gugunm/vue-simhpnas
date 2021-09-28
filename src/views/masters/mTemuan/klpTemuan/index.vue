<template>
  <div>
    <master-table
      top-title="Data"
      title="Kelompok Temuan"
      :desc-title="'- ' + descJenisTemuan"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailKlpTemuan"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
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
    label: 'Deskripsi Kelompok Temuan',
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
    idJenisTemuan: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      kelompokTemuan: null,
      fields,
      descJenisTemuan: null,
    };
  },
  computed: {
    items() {
      return this.kelompokTemuan
        ? this.kelompokTemuan.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadKelompokTemuan();
    this.loadDescJenisTemuan();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-klp-temuan',
        params: { idKlpTemuan: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-klp-temuan',
      });
    },
    async loadKelompokTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadKelompokTemuan', {
          idJenisTemuan: this.idJenisTemuan,
          forceRefresh: refresh,
        });
        this.kelompokTemuan = this.$store.getters['m_temuan/kelompokTemuan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailKlpTemuan(item) {
      console.log(item);
      this.$router.push({
        name: 'msubkelompoktemuan',
        params: { idKlpTemuan: item.id },
      });
    },
    async loadDescJenisTemuan() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/jenistemuan/${this.idJenisTemuan}`,
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

      this.descJenisTemuan = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
