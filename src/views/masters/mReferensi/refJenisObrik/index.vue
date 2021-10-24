<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Jenis Obrik"
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

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
    ConfirmModal,
  },
  mixins: [mixin],
  data() {
    return {
      fields: [],
      items: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadRefJenisObrik();
    this.fields = [
      {
        key: 'id',
        label: 'Kode',
        _style: 'width: 15%',
      },
      {
        key: 'deskripsi',
        label: 'Deskripsi Jenis Obrik',
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
        name: 'master-create-ref-jenis-obrik',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-jenis-obrik',
        params: { idJenisObrik: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_ref_jenis_obrik/deleteRefJenisObrik', {
          idJenisObrik: this.idToDelete,
        });

        this.isDeleteConfirm = false;

        await this.loadRefJenisObrik();

        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadRefJenisObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jenis_obrik/loadRefJenisObrik', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_ref_jenis_obrik/refJenisObrik'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
