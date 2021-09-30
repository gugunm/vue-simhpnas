<template>
  <div>
    <master-table
      top-title="Master"
      title="Jenis Temuan"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailTemuan"
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
import MasterTable from '@/views/components/MasterTable';
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
    label: 'Deskripsi Jenis Temuan',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'MasterJenisTemuan',
  components: { MasterTable, ConfirmModal },
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
    await this.loadJenisTemuan();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-temuan',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-temuan',
        params: { idJenisTemuan: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_temuan/deleteJenisTemuan', {
          idJenisTemuan: this.idToDelete,
        });
        this.isDeleteConfirm = false;
        await this.loadJenisTemuan();
        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadJenisTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadJenisTemuan', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_temuan/jenisTemuan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailTemuan(item) {
      this.$router.push({
        name: 'mkelompoktemuan',
        params: { idJenisTemuan: item.id },
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
