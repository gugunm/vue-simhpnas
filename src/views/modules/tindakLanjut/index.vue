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
import TableTindakLanjut from './TableTindakLanjut.vue';
import mixin from './mixin';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

const fields = [
  {
    key: 'id',
    label: 'Nomor TL',
  },
  // {
  //   key: 'nomorLha',
  // },
  // {
  //   key: 'nomorTemuan',
  // },
  // {
  //   key: 'nomorRekomendasi',
  // },
  // {
  //   key: 'nomorTl',
  // },
  {
    key: 'nilaiTl',
    label: 'Nilai TL',
  },
  {
    key: 'statusTl',
    label: 'Status TL',
  },
  {
    key: 'subKelompokTl',
    label: 'Kelompok TL',
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
      lha: {},
      temuan: {},
      rekomendasi: {},
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
        query: {
          idlha: this.lha.id,
          nolha: this.lha.nomorLha,
          idtemuan: this.temuan.id,
          notemuan: this.temuan.nomorTemuan,
          idrekomendasi: this.rekomendasi.id,
          norekomendasi: this.rekomendasi.nomorRekomendasi,
          nilairekomendasi: this.rekomendasi.nilaiRekomendasi,
        },
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

    onSelectLha(selectedLha) {
      this.lha = selectedLha;
    },

    async onSelectTemuan(selectedTemuan) {
      this.temuan = selectedTemuan;
      await this.loadRekomendasi();
    },

    async onSelectRekomendasi(selectedRekomendasi) {
      this.rekomendasi = selectedRekomendasi;
      await this.loadTindakLanjut();
    },

    async actionDelete() {
      try {
        const response = await this.$store.dispatch(
          'module_tindak_lanjut/deleteTindakLanjutById',
          {
            idTl: this.idToDelete,
          }
        );

        this.isDeleteConfirm = false;

        if (response.status == 200) {
          await this.loadTindakLanjut();

          this.toastSuccess(
            `Berhasil menghapus data dengan ID ${this.idToDelete}`
          );
        }
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadTindakLanjut(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_tindak_lanjut/loadTindakLanjut', {
          forceRefresh: refresh,
          idRekomendasi: this.rekomendasi.id,
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