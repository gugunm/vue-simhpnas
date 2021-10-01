<template>
  <div>
    <master-table
      title="Sub Rekomendasi"
      :desc-title="descRekomendasi"
      :items="items"
      :fields="fields"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
    />
    <confirm-modal
      v-model="isDeleteConfirm"
      title="Hapus data"
      msg="Apakah anda yakin akan menghapus data ini?"
      @close-modal="isDeleteConfirm = false"
      @confirm-ok="actionDelete"
    />
    <back-button title="Kembali" to="/master-rekomendasi/" />
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';
import MasterTable from '@/views/components/MasterTable';
import BackButton from '@/views/components/BackButton';
import ConfirmModal from '@/views/components/ConfirmModal.vue';
import mixin from './mixin';

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
    ConfirmModal,
  },
  mixins: [mixin],
  props: {
    idKlpRekomendasi: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      fields,
      items: null,
      descRekomendasi: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadSubKlpRekomendasi();
    await this.loadDescRekomendasi();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-sub-klp-rekomendasi',
        params: {
          idKlpRekomendasi: this.idKlpRekomendasi,
        },
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-sub-klp-rekomendasi',
        params: {
          idSubKlpRekomendasi: item.id,
          idKlpRekomendasi: this.idKlpRekomendasi,
        },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_rekomendasi/deleteSubKlpRekomendasi', {
          idSubKlpRekomendasi: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        await this.loadSubKlpRekomendasi();

        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },

    async loadSubKlpRekomendasi(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_rekomendasi/loadSubKlpRekomendasi', {
          idKlpRekomendasi: this.idKlpRekomendasi,
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_rekomendasi/subKlpRekomendasi'];
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
