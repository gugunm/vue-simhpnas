<template>
  <div>
    <table-penyebab
      top-title="Penyebab"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      @clicked-row="openDetail"
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
import TablePenyebab from './TablePenyebab.vue';

import mixin from './mixin';

import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

const fields = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'namaUnit',
    label: 'Nama Unit',
  },
  {
    key: 'namaPimpinan',
    label: 'Nama Pimpinan',
  },
  {
    key: 'provinsi',
    label: 'Provinsi',
  },
  {
    key: 'kabkot',
    label: 'Kab/Kota',
  },
  {
    key: 'jumlahObrik',
    label: 'Jumlah Obrik',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

export default {
  name: 'PenyebabTemuan',
  components: {
    TablePenyebab,
    ConfirmModal,
  },
  mixins: [mixin],
  data() {
    return {
      items: '',
      fields,
      isDeleteConfirm: false,
      idToDelete: null,
    };
  },
  async mounted() {
    await this.loadPenyebab();
  },

  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-penyebab',
        params: { idPenyebab: 1 },
      });
    },

    openCreate() {
      this.$router.push({
        name: 'module-create-penyebab',
      });
    },

    openEdit(item) {
      this.$router.push({
        name: 'module-edit-penyebab',
        params: { idPenyebab: 1 },
      });
    },

    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },

    async actionDelete() {
      try {
        await this.$store.dispatch('module_penyebab/deletePenyebabById', {
          idUnitKerja: this.idToDelete,
        });

        this.isDeleteConfirm = false;

        this.loadPenyebab();

        this.$toast.open({
          message: `Berhasil menghapus data dengan ID ${this.idToDelete}`,
          type: 'success',
          position: 'top-right',
          duration: 3000,
        });
      } catch (error) {
        this.$toast.open({
          message: error.message,
          type: 'error',
          position: 'top-right',
          duration: 3000,
        });
      }
    },
    async loadPenyebab(refresh = false) {
      // this.loading = true;
      try {
        await this.$store.dispatch('module_penyebab/loadPenyebab', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['module_penyebab/unitPenyebab'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      // this.loading = false;
    },
  },
};
</script>