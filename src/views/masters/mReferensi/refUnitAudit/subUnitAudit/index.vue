<template>
  <div>
    <master-table
      top-title="Master"
      title="Sub Unit Audit"
      :desc-title="'pada ' + descUnitAudit"
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
    <back-button title="Kembali" to="/master-referensi/unit-audit" />
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
    label: 'Deskripsi Sub Unit Audit',
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
    idUnitAudit: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      fields,
      items: null,
      descUnitAudit: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadRefSubUnitAudit();
    await this.loadDescUnitAudit();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-sub-unit-audit',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-sub-unit-audit',
        params: { idSubUnitAudit: item.id, idUnitAudit: this.idUnitAudit },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_ref_unit_audit/deleteRefSubUnitAudit', {
          idSubUnitAudit: this.idToDelete,
        });

        this.isDeleteConfirm = false;

        await this.loadRefSubUnitAudit();

        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadRefSubUnitAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefSubUnitAudit', {
          idUnitAudit: this.idUnitAudit,
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_ref_unit_audit/refSubUnitAudit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadDescUnitAudit() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/unitaudit/${this.idUnitAudit}`,
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

      this.descUnitAudit = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
