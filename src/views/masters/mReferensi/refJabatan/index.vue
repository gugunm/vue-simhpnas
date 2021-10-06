<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Jabatan"
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
    label: 'Deskripsi Jabatan',
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
    await this.loadRefJabatan();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-jabatan',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-jabatan',
        params: { idJabatan: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_ref_jabatan/deleteRefJabatan', {
          idJabatan: this.idToDelete,
        });

        this.isDeleteConfirm = false;

        await this.loadRefJabatan();

        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadRefJabatan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jabatan/loadRefJabatan', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_ref_jabatan/refJabatan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>