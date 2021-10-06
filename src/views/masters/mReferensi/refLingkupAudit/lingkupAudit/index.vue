<template>
  <div>
    <master-table
      top-title="Data Group"
      title="Lingkup Audit"
      :desc-title="descGroupLingkupAudit.split(' ').slice(1).join(' ')"
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
    <back-button title="Kembali" to="/master-referensi/lingkup-audit" />
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';
import MasterTable from '@/components/MasterTable';
import BackButton from '@/components/BackButton';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import mixin from './mixin';

const fields = [
  {
    key: 'id',
    label: 'Kode',
    _style: 'width: 15%',
  },
  {
    key: 'deskripsi',
    label: 'Deskripsi Lingkup Audit',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'MasterLingkupAudit',
  components: {
    MasterTable,
    BackButton,
    ConfirmModal,
  },
  mixins: [mixin],
  props: {
    idGroupLingkupAudit: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      fields,
      items: null,
      descGroupLingkupAudit: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadRefLingkupAudit();
    await this.loadDescGroupLingkupAudit();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-lingkup-audit',
        params: {
          idGroupLingkupAudit: this.idGroupLingkupAudit,
        },
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-lingkup-audit',
        params: {
          idLingkupAudit: item.id,
          idGroupLingkupAudit: this.idGroupLingkupAudit,
        },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch(
          'm_ref_lingkup_audit/deleteRefLingkupAudit',
          {
            idLingkupAudit: this.idToDelete,
          }
        );
        this.isDeleteConfirm = false;
        await this.loadRefLingkupAudit();
        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadRefLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_lingkup_audit/loadRefLingkupAudit', {
          idGroupLingkupAudit: this.idGroupLingkupAudit,
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_ref_lingkup_audit/refLingkupAudit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadDescGroupLingkupAudit() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/grplingkupaudit/${this.idGroupLingkupAudit}`,
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

      this.descGroupLingkupAudit = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
