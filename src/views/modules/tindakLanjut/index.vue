<template>
  <div>
    <table-tindak-lanjut
      top-title="Tindak Lanjut"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      :filterlha="$route.query.filterlha"
      :filtertemuan="$route.query.filtertemuan"
      :filterrekomendasi="$route.query.filterrekomendasi"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
      @on-select-lha="onSelectLha"
      @on-select-temuan="onSelectTemuan"
      @on-select-rekomendasi="onSelectRekomendasi"
      @on-load-tl="onLoadTl"
      @on-add-temuan="onAddTemuan"
      @on-add-rekomendasi="onAddRekomendasi"
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
    key: 'nomorTl',
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
  // {
  //   key: 'statusTl',
  //   label: 'Status TL',
  // },
  {
    key: 'subKelompokTl',
    label: 'Kelompok TL',
  },
];

const fieldsKtOperator = [
  {
    key: 'send',
    label: 'Kirim',
    _style: 'width: 7%',
  },
  {
    key: 'actions',
    label: 'Aksi',
    _style: 'width: 10%',
  },
];

const fieldsDalnisDaltu = [
  {
    key: 'memoDalnisDaltu',
    label: 'Memo',
    _style: 'width: 10%',
  },
  {
    key: 'actionsDalnisDaltu',
    label: 'Aksi',
    _style: 'width: 10%',
  },
];

const fieldsAdmin = [
  {
    key: 'actionsAdmin',
    label: 'Aksi',
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
      fields: [],
      isDeleteConfirm: false,
      idToDelete: null,
      lha: {},
      temuan: {},
      rekomendasi: {},
      level: '',
    };
  },
  watch: {
    $route(to, before) {
      if (
        to.meta.reload == true &&
        to.name == before.name &&
        Object.keys(to.query).length == 0
      ) {
        // this.$router.go();
        window.location.reload();
      }
    },
  },

  async mounted() {
    await this.loadTindakLanjut();
    this.level = localStorage.level;
    if (this.level == 2) {
      this.fields = [...fields, ...fieldsAdmin];
    } else if (this.level == 3 || this.level == 4) {
      this.fields = [...fields, ...fieldsKtOperator];
    } else if (this.level == 5 || this.level == 6) {
      this.fields = [...fields, ...fieldsDalnisDaltu];
    } else {
      this.fields = fields;
    }
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

    onAddRekomendasi(temuan) {
      this.$router.push({
        name: 'module-create-rekomendasi',
        query: {
          idlha: temuan.idLha,
          nolha: temuan.nomorLha,
          idtemuan: temuan.id,
          notemuan: temuan.nomorTemuan,
          nilaitemuan: temuan.nilaiTemuan,
        },
      });
    },

    onSelectLha(selectedLha) {
      this.lha = selectedLha;
    },

    async onSelectTemuan(selectedTemuan) {
      this.temuan = selectedTemuan;
      if (this.temuan != 'empty') {
        await this.loadRekomendasi({ id: this.temuan.id });
      }
    },

    async onSelectRekomendasi(selectedRekomendasi) {
      this.rekomendasi = selectedRekomendasi;
      this.$router.push({
        path: '/tindak-lanjut',
        query: {
          filterlha: this.lha.id,
          filtertemuan: this.temuan.id ? this.temuan.id : '',
          filterrekomendasi: this.rekomendasi.id ? this.rekomendasi.id : '',
        },
      });
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
        if (this.rekomendasi != 'empty' || this.temuan != 'empty') {
          await this.$store.dispatch('module_tindak_lanjut/loadTindakLanjut', {
            forceRefresh: refresh,
            idRekomendasi: this.rekomendasi.id,
          });
          this.items = this.$store.getters['module_tindak_lanjut/tindakLanjut'];
        } else {
          this.items = [];
        }
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async onLoadTl() {
      await this.loadTindakLanjut();
    },
  },
};
</script>