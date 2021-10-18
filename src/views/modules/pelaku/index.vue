<template>
  <div>
    <table-pelaku
      top-title="Pelaku"
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
import TablePelaku from './TablePelaku.vue';
import mixin from './mixin';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

const fields = [
  { key: 'id' },
  {
    key: 'nomorLha',
    label: 'Nomor LHA',
    _style: 'width: 15%',
  },
  {
    key: 'nip',
    _style: 'width: 15%',
  },
  {
    key: 'nama',
  },
  {
    key: 'actions',
    _style: 'width: 10%',
  },
];

export default {
  name: 'Pelaku',
  components: {
    TablePelaku,
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
    await this.loadPelaku();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-pelaku',
        params: { idPelaku: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'module-create-pelaku',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'module-edit-pelaku',
        params: { idPelaku: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('module_lha/deletePelakuById', {
          idLha: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        this.loadPelaku();

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
    async loadPelaku(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_pelaku/loadPelaku', {
          forceRefresh: refresh,
          idRekomendasi: 'Vylrej7OqX',
        });
        this.items = this.$store.getters['module_pelaku/pelaku'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>