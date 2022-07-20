<template>
  <div>
    <table-temuan
      top-title="Temuan"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      :filterlha="$route.query.filterlha"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
      @on-select-lha="onSelectLha"
    />
    <Loading :active.sync="loading" :is-full-page="true" />
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
import TableTemuan from "./TableTemuan.vue";
import mixin from "./mixin";
import ConfirmModal from "@/components/Confirm/ConfirmModal.vue";
import Loading from "vue-loading-overlay";
const fields = [
  {
    key: "nomorTemuan",
    label: "Nomor Temuan"
  },
  // {
  //   key: 'nomorLha',
  //   label: 'Nomor LHA',
  // },
  // {
  //   key: 'nomorTemuan',
  // },
  {
    key: "jenisTemuan"
  },
  {
    key: "kelompokTemuan"
  },
  {
    key: "subKelompokTemuan"
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
    key: "nilaiTemuan"
  },
  // {
  //   key: 'jumlahRekomendasi',
  // },
  // {
  //   key: 'jumlahSaldoRekomendasi',
  // },
  // {
  //   key: 'nilaiTl',
  //   label: 'Nilai TL',
  // },
  // {
  //   key: 'statusTemuan',
  // },
  // {
  //   key: 'memoKoreksiTemuan',
  // },
  {
    key: "actions",
    _style: "width: 12%"
  }
];

export default {
  name: "Temuan",
  components: {
    TableTemuan,
    ConfirmModal,
    Loading
  },
  mixins: [mixin],
  data() {
    return {
      items: "",
      fields,
      isDeleteConfirm: false,
      idToDelete: null,
      lha: {}
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
    }
  },

  async mounted() {
    // await this.loadTemuan();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: "module-detail-temuan",
        params: { idTemuan: item.id }
      });
    },
    openCreate() {
      this.$router.push({
        name: "module-create-temuan",
        query: {
          idlha: this.lha.id,
          nolha: this.lha.nomorLha,
          tpk: this.lha.flagTpk
        }
      });
    },
    openEdit(item) {
      this.$router.push({
        name: "module-edit-temuan",
        params: { idTemuan: item.id }
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async onSelectLha(selectedLha) {
      this.lha = selectedLha;
      // this.$router.push({
      //   path: '/temuan',
      //   query: {
      //     filterlha: this.lha.id,
      //   },
      // });
      // this.$route.query.filterlha = this.lha.id;
      history.pushState(
        {},
        null,
        `/#${this.$route.path}?filterlha=${encodeURIComponent(this.lha.id)}`
      );
      await this.loadTemuan();
    },
    async actionDelete() {
      try {
        const response = await this.$store.dispatch(
          "module_temuan/deleteTemuanById",
          {
            idTemuan: this.idToDelete
          }
        );

        this.isDeleteConfirm = false;

        if (response.status == 200) {
          await this.loadTemuan();

          this.toastSuccess(
            `Berhasil menghapus data dengan ID ${this.idToDelete}`
          );
        }
      } catch (error) {
        this.toastError(error.message);
      }
    }
  }
};
</script>
