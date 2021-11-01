<template>
  <div>
    <table-rekomendasi
      top-title="Rekomendasi"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      :filterlha="$route.query.filterlha"
      :filtertemuan="$route.query.filtertemuan"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
      @on-select-lha="onSelectLha"
      @on-select-temuan="onSelectTemuan"
      @on-add-temuan="onAddTemuan"
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
  {
    key: 'nomorRekomendasi',
    label: 'Nomor Rekomendasi',
  },
  // { key: 'nomorRekomendasi' },
  // { key: 'kodeTemuan' },
  // { key: 'nomorTemuan' },
  // { key: 'kodeLha' },
  // { key: 'nomorLha' },
  // { key: 'kodeKelompokRekomendasi' },
  // { key: 'kelompokRekomendasi' },
  // { key: 'kodeSubKelompokRekomendasi' },
  { key: 'subKelompokRekomendasi' },
  // { key: 'memoRekomendasi' },
  // { key: 'flagPelaku' },
  { key: 'nilaiRekomendasi' },
  // { key: 'nilaiTL' },
  // { key: 'statusRekomendasi' },
  // { key: 'memoKoreksiRek' },
  // { key: 'kodeUnitObrikTl' },
  { key: 'unitObrik' },
  // { key: 'kodeBidangObrikTl' },
  // { key: 'bidangObrik' },
  // { key: 'kodeSubBidangObrikTl' },
  // { key: 'subBidangObrik' },
  {
    key: 'actions',
    _style: 'width: 12%',
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
      lha: {},
      temuan: {},
    };
  },
  watch: {
    $route(to, before) {
      if (
        to.meta.reload == true &&
        to.name == before.name &&
        Object.keys(to.query).length == 0
      ) {
        this.$router.go();
      }
    },
  },
  async mounted() {
    await this.loadRekomendasi();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-rekomendasi',
        params: { idRekomendasi: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'module-create-rekomendasi',
        query: {
          idlha: this.lha.id,
          nolha: this.lha.nomorLha,
          idtemuan: this.temuan.id,
          notemuan: this.temuan.nomorTemuan,
          nilaitemuan: this.temuan.nilaiTemuan,
        },
      });
    },

    openEdit(item) {
      this.$router.push({
        name: 'module-edit-rekomendasi',
        params: { idRekomendasi: item.id },
      });
    },

    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },

    onAddTemuan(lha) {
      this.$router.push({
        name: 'module-create-temuan',
        query: {
          idlha: lha.id,
          nolha: lha.nomorLha,
          tpk: lha.flagTpk,
        },
      });
    },

    onSelectLha(selectedLha) {
      this.lha = selectedLha;
    },

    async onSelectTemuan(selectedTemuan) {
      this.temuan = selectedTemuan;
      this.$router.push({
        path: '/rekomendasi',
        query: {
          filterlha: this.lha.id,
          filtertemuan: this.temuan.id,
        },
      });
      await this.loadRekomendasi();
    },

    async actionDelete() {
      try {
        const response = await this.$store.dispatch(
          'module_rekomendasi/deleteRekomendasiById',
          {
            idRekomendasi: this.idToDelete,
          }
        );

        this.isDeleteConfirm = false;

        if (response.status == 200) {
          await this.loadRekomendasi();

          this.toastSuccess(
            `Berhasil menghapus data dengan ID ${this.idToDelete}`
          );
        }
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadRekomendasi(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_rekomendasi/loadRekomendasi', {
          forceRefresh: refresh,
          idTemuan: this.temuan.id,
        });
        this.items = this.$store.getters['module_rekomendasi/rekomendasi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    // mgR1oZM85x
  },
};
</script>