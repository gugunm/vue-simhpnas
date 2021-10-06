<template>
  <div>
    <table-rekomendasi
      top-title="Rekomendasi"
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
import TableRekomendasi from './TableRekomendasi.vue';
import mixin from './mixin';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

const fields = [
  // {
  //   key: 'id',
  //   label: 'ID',
  // },
  {
    key: 'nomorLha',
    label: 'Nomor LHA',
    _style: 'width: 15%',
  },
  {
    key: 'nomorTemuan',
    _style: 'width: 15%',
  },
  {
    key: 'Rekomendasi',
  },
  {
    key: 'actions',
    _style: 'width: 10%',
  },
];

export default {
  name: 'Rekomendasi',
  components: {
    TableRekomendasi,
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
    await this.loadRekomendasi();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-rekomendasi',
        params: { idRekomendasi: 1 },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'module-create-rekomendasi',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'module-edit-rekomendasi',
        params: { idRekomendasi: 1 },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('module_lha/deleteRekomendasiById', {
          idLha: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        this.loadRekomendasi();

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
    async loadRekomendasi(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_rekomendasi/loadRekomendasi', {
          forceRefresh: refresh,
          nomorLha: 'LHA/1/2021',
        });
        this.items = this.$store.getters['module_rekomendasi/rekomendasi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>