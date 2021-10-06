<template>
  <div>
    <table-temuan
      top-title="Temuan Audit"
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
import TableTemuan from './TableTemuan.vue';
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
  },
  {
    key: 'nomorTemuan',
  },
  // {
  //   key: 'kodeJenisTemuan',
  // },
  // {
  //   key: 'kodeKelompokTemuan',
  // },
  {
    key: 'kodeSubKelompokTemuan',
    label: 'Sub Kelompok Temuan',
  },
  // {
  //   key: 'memoTemuan',
  // },
  // {
  //   key: 'flagTpk',
  // },
  // {
  //   key: 'posisiKasus',
  // },
  // {
  //   key: 'modusOperandi',
  // },
  {
    key: 'nilaiTemuan',
  },
  {
    key: 'jumlahRekomendasi',
  },
  // {
  //   key: 'jumlahSaldoRekomendasi',
  // },
  {
    key: 'nilaiTl',
    label: 'Nilai TL',
  },
  {
    key: 'statusTemuan',
  },
  // {
  //   key: 'memoKoreksiTemuan',
  // },
  {
    key: 'actions',
    _style: 'width: 10%',
  },
];

export default {
  name: 'LHA',
  components: {
    TableTemuan,
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
    await this.loadTemuan();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-temuan',
        params: { idTemuan: 1 },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'module-create-temuan',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'module-edit-temuan',
        params: { idTemuan: 1 },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('module_lha/deleteTemuanById', {
          idLha: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        this.loadTemuan();

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
    async loadTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_temuan/loadTemuan', {
          forceRefresh: refresh,
          nomorLha: 'LHA/1/2021',
        });
        this.items = this.$store.getters['module_temuan/temuan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>