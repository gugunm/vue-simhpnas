<template>
  <div>
    <master-table
      top-title="Data"
      title="Sub Tindak Lanjut"
      :desc-title="'- ' + descTindakLanjut"
      :items="items"
      :fields="fields"
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
    label: 'Deskripsi Sub Tindak Lanjut',
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
    idKlpTindakLanjut: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      subKlpTindakLanjut: null,
      fields,
      descTindakLanjut: null,
    };
  },
  computed: {
    items() {
      return this.subKlpTindakLanjut
        ? this.subKlpTindakLanjut.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadSubKlpTindakLanjut();
    this.loadDescTindakLanjut();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-sub-tl',
        params: { idSubKlpTindakLanjut: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-sub-tl',
      });
    },
    async loadSubKlpTindakLanjut(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_tindak_lanjut/loadSubKlpTindakLanjut', {
          idKlpTindakLanjut: this.idKlpTindakLanjut,
          forceRefresh: refresh,
        });
        this.subKlpTindakLanjut =
          this.$store.getters['m_tindak_lanjut/subKlpTindakLanjut'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadDescTindakLanjut() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/klptl/${this.idKlpTindakLanjut}`,
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

      this.descTindakLanjut = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
