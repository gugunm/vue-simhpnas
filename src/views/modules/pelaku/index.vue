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
      @on-select-lha="onSelectLha"
      @on-select-temuan="onSelectTemuan"
      @on-select-rekomendasi="onSelectRekomendasi"
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
      lha: {},
      temuan: {},
      rekomendasi: {},
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
        query: {
          idlha: this.lha.id,
          nolha: this.lha.nomorLha,
          idtemuan: this.temuan.id,
          notemuan: this.temuan.nomorTemuan,
          idrekomendasi: this.rekomendasi.id,
          norekomendasi: this.rekomendasi.nomorRekomendasi,
        },
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

    onSelectLha(selectedLha) {
      this.lha = selectedLha;
    },

    async onSelectTemuan(selectedTemuan) {
      this.temuan = selectedTemuan;
      await this.loadRekomendasi();
    },

    async onSelectRekomendasi(selectedRekomendasi) {
      this.rekomendasi = selectedRekomendasi;
      await this.loadPelaku();
    },

    async actionDelete() {
      try {
        await this.$store.dispatch('module_lha/deletePelakuById', {
          idLha: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        this.loadPelaku();

        toastSuccess(`Berhasil menghapus data dengan ID ${this.idToDelete}`);
      } catch (error) {
        toastError(error.message);
      }
    },
    async loadPelaku(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_pelaku/loadPelaku', {
          forceRefresh: refresh,
          idRekomendasi: this.rekomendasi.id,
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