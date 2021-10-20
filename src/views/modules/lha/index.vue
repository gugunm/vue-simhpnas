<template>
  <div>
    <TableLha
      top-title="Laporan Hasil Audit"
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
import TableLha from './TableLha.vue';
import mixin from './mixin';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

const fields = [
  {
    key: 'id',
    label: 'Nomor LHA',
  },
  // {
  //   key: 'nomorLha',
  //   label: 'Nomor LHA',
  // },
  {
    key: 'tglLha',
    label: 'Tanggal',
  },
  // {
  //   key: 'nomorST',
  //   label: 'Nomor ST',
  // },
  // {
  //   key: 'tglST',
  //   label: 'Tanggal ST',
  // },
  // {
  //   key: 'grupLingkupAudit',
  // },
  // {
  //   key: 'lingkupAudit',
  // },
  // {
  //   key: 'jenisObrik',
  // },
  {
    key: 'subBidangObrik',
    label: 'Nama Obrik',
    _style: 'width: 20%',
  },
  {
    key: 'judulLaporan',
    _style: 'width: 22%',
  },
  // {
  //   key: 'tahunAnggaran',
  //   _style: 'width: 8%',
  // },
  {
    key: 'jenisAnggaran',
    _style: 'width: 8%',
  },
  // {
  //   key: 'namaPimpinan',
  // },
  // {
  //   key: 'nipPimpinan',
  // },
  // {
  //   key: 'rencanaAnggaran',
  // },
  // {
  //   key: 'realisasiAnggaran',
  // },
  {
    key: 'anggaranYangDiaudit',
    _style: 'width: 15%',
  },
  {
    key: 'send',
    label: 'Kirim',
  },
  {
    key: 'actions',
    label: 'Aksi',
    _style: 'width: 12%',
  },
];

export default {
  name: 'LHA',
  components: {
    TableLha,
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
    await this.loadLha();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-lha',
        params: { idLha: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'module-create-lha',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'module-edit-lha',
        params: { idLha: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        const response = await this.$store.dispatch(
          'module_lha/deleteLhaById',
          {
            idLha: this.idToDelete,
          }
        );

        this.isDeleteConfirm = false;

        if (response.status == 200) {
          await this.loadLha();

          this.toastSuccess(
            `Berhasil menghapus data dengan ID ${this.idToDelete}`
          );
        }
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadLha(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_lha/loadLha', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['module_lha/lha'];
        // console.log(this.items);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>