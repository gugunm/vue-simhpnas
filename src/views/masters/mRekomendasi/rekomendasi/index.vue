<template>
  <div>
    <master-table
      top-title="Master"
      title="Rekomendasi"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailRekomendasi"
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
    label: 'Deskripsi Rekomendasi',
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
    await this.loadKlpRekomendasi();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-klp-rekomendasi',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-klp-rekomendasi',
        params: { idKlpRekomendasi: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_rekomendasi/deleteKlpRekomendasi', {
          idKlpRekomendasi: this.idToDelete,
        });
        this.isDeleteConfirm = false;
        await this.loadKlpRekomendasi();
        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadKlpRekomendasi(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_rekomendasi/loadKlpRekomendasi', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_rekomendasi/klpRekomendasi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailRekomendasi(item) {
      this.$router.push({
        name: 'master-sub-klp-rekomendasi',
        params: { idKlpRekomendasi: item.id, deskripsi: item.deskripsi },
      });
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
