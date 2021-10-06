<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Lingkup Audit"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailGroupLingkupAudit"
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
  </div>
</template>

<script>
import MasterTable from '@/components/MasterTable';
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
    label: 'Deskripsi Group Lingkup Audit',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'MasterGroupLingkupAudit',
  components: {
    MasterTable,
    ConfirmModal,
  },
  mixins: [mixin],
  data() {
    return {
      fields,
      items: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadRefGroupLingkupAudit();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-group-lingkup-audit',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-group-lingkup-audit',
        params: { idGroupLingkupAudit: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch(
          'm_ref_lingkup_audit/deleteRefGroupLingkupAudit',
          {
            idGroupLingkupAudit: this.idToDelete,
          }
        );
        this.isDeleteConfirm = false;
        await this.loadRefGroupLingkupAudit();
        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadRefGroupLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch(
          'm_ref_lingkup_audit/loadRefGroupLingkupAudit',
          {
            forceRefresh: refresh,
          }
        );
        this.items =
          this.$store.getters['m_ref_lingkup_audit/refGroupLingkupAudit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailGroupLingkupAudit(item) {
      this.$router.push({
        name: 'master-ref-lingkup-audit',
        params: { idGroupLingkupAudit: item.id, deskripsi: item.deskripsi },
      });
    },
  },
};
</script>

