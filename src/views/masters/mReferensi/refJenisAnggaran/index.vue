<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Jenis Anggaran"
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
    label: 'Deskripsi Jenis Anggaran',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'AdvancedTables',
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
    await this.loadRefJenisAnggaran();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-jenis-anggaran',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-jenis-anggaran',
        params: { idJenisAnggaran: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch(
          'm_ref_jenis_anggaran/deleteRefJenisAnggaran',
          {
            idJenisAnggaran: this.idToDelete,
          }
        );

        this.isDeleteConfirm = false;

        await this.loadRefJenisAnggaran();

        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadRefJenisAnggaran(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch(
          'm_ref_jenis_anggaran/loadRefJenisAnggaran',
          {
            forceRefresh: refresh,
          }
        );
        this.items =
          this.$store.getters['m_ref_jenis_anggaran/refJenisAnggaran'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>
