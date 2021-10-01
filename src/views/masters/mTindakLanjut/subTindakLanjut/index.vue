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
    <confirm-modal
      v-model="isDeleteConfirm"
      title="Hapus data"
      msg="Apakah anda yakin akan menghapus data ini?"
      @close-modal="isDeleteConfirm = false"
      @confirm-ok="actionDelete"
    />
    <back-button title="Kembali" to="/master-tindak-lanjut/" />
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
    ConfirmModal,
  },
  mixins: [mixin],
  props: {
    idKlpTindakLanjut: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      fields,
      items: null,
      descTindakLanjut: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadSubKlpTindakLanjut();
    await this.loadDescTindakLanjut();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-sub-tl',
        params: {
          idKlpTindakLanjut: this.idKlpTindakLanjut,
        },
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-sub-tl',
        params: {
          idSubKlpTindakLanjut: item.id,
          idKlpTindakLanjut: this.idKlpTindakLanjut,
        },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_tindak_lanjut/deleteSubKlpTindakLanjut', {
          idSubKlpTindakLanjut: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        await this.loadSubKlpTindakLanjut();

        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },

    async loadSubKlpTindakLanjut(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_tindak_lanjut/loadSubKlpTindakLanjut', {
          idKlpTindakLanjut: this.idKlpTindakLanjut,
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_tindak_lanjut/subKlpTindakLanjut'];
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
