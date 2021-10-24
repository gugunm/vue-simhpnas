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
    <confirm-modal
      v-model="isDeleteConfirm"
      title="Hapus data"
      msg="Apakah anda yakin akan menghapus data ini?"
      @close-modal="isDeleteConfirm = false"
      @confirm-ok="actionDelete"
    />
    <back-button title="Kembali" to="/master-temuan/" />
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';
import MasterTable from '@/components/MasterTable';
import BackButton from '@/components/BackButton';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import mixin from './mixin';

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
    BackButton,
    ConfirmModal,
  },
  mixins: [mixin],
  props: {
    idJenisTemuan: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      fields: [],
      items: null,
      descJenisTemuan: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadKelompokTemuan();
    await this.loadDescJenisTemuan();

    this.fields = [
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
    ];
    if (localStorage.level == 0 || localStorage.level == 1) {
      this.fields = [
        ...this.fields,
        {
          key: 'actions',
          _style: 'width: 15%',
        },
      ];
    }
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-klp-temuan',
        params: {
          idJenisTemuan: this.idJenisTemuan,
        },
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-klp-temuan',
        params: { idKlpTemuan: item.id, idJenisTemuan: this.idJenisTemuan },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_temuan/deleteKelompokTemuan', {
          idKlpTemuan: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        await this.loadKelompokTemuan();

        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },

    async loadKelompokTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadKelompokTemuan', {
          idJenisTemuan: this.idJenisTemuan,
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_temuan/kelompokTemuan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailKlpTemuan(item) {
      // console.log(item);
      this.$router.push({
        name: 'msubkelompoktemuan',
        params: { idKlpTemuan: item.id, idJenisTemuan: this.idJenisTemuan },
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
