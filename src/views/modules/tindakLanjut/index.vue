<template>
  <div>
    <table-tindak-lanjut
      top-title="Tindak Lanjut"
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
import TableTindakLanjut from './TableTindakLanjut.vue';
import mixin from './mixin';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

const fields = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'nomorLha',
  },
  {
    key: 'nomorRekomendasi',
  },
  {
    key: 'actions',
    _style: 'width: 10%',
  },
];

export default {
  name: 'TindakLanjut',
  components: {
    TableTindakLanjut,
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
    await this.loadTindakLanjut();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-tindak-lanjut',
        params: { idTindakLanjut: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'module-create-tindak-lanjut',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'module-edit-tindak-lanjut',
        params: { idTindakLanjut: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('module_lha/deleteTindakLanjutById', {
          idRekomendasi: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        this.loadTindakLanjut();

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
    async loadTindakLanjut(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_tindak_lanjut/loadTindakLanjut', {
          forceRefresh: refresh,
          idRekomendasi: 'mZO105ro9W',
        });
        this.items = this.$store.getters['module_tindak_lanjut/tindakLanjut'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>