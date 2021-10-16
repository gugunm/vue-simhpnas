<template>
  <div>
    <table-temuan
      top-title="Temuan"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
      @on-select-lha="onSelectLha"
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
  {
    key: 'id',
    label: 'ID',
  },
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
      lha: {},
    };
  },
  async mounted() {
    await this.loadTemuan();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-temuan',
        params: { idTemuan: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'module-create-temuan',
        query: {
          idlha: this.lha.id,
          nolha: this.lha.nomorLha,
          tpk: this.lha.flagTpk,
        },
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'module-edit-temuan',
        params: { idTemuan: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async onSelectLha(selectedLha) {
      this.lha = selectedLha;
      await this.loadTemuan();
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('module_lha/deleteTemuanById', {
          idLha: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        this.loadTemuan();

        toastSuccess(`Berhasil menghapus data dengan ID ${this.idToDelete}`);
      } catch (error) {
        toastError(error.message);
      }
    },
    async loadTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_temuan/loadTemuan', {
          forceRefresh: refresh,
          idLha: this.lha.id,
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