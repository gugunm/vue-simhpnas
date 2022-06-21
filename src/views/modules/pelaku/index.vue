<template>
  <div>
    <table-pelaku
      top-title="Pelaku"
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
      @on-add-temuan="onAddTemuan"
      @on-add-rekomendasi="onAddRekomendasi"
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
import TablePelaku from "./TablePelaku.vue";
import mixin from "./mixin";
import ConfirmModal from "@/components/Confirm/ConfirmModal.vue";
import Loading from "vue-loading-overlay";

const fields = [
  {
    key: "nip",
    label: "NIP"
  },
  // {
  //   key: 'nomorLha',
  //   label: 'Nomor LHA',
  //   _style: 'width: 15%',
  // },
  // {
  //   key: 'nip',
  //   _style: 'width: 15%',
  // },
  {
    key: "jabatan"
  },
  {
    key: "nama"
  },
  {
    key: "actions",
    _style: "width: 10%"
  }
];

export default {
  name: "Pelaku",
  components: {
    TablePelaku,
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
      lha: {},
      temuan: {},
      rekomendasi: {},
      loading: false
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
    await this.loadPelaku();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: "module-detail-pelaku",
        params: { idPelaku: item.id }
      });
    },
    openCreate() {
      this.$router.push({
        name: "module-create-pelaku",
        query: {
          idlha: this.lha.id,
          nolha: this.lha.nomorLha,
          idtemuan: this.temuan.id,
          notemuan: this.temuan.nomorTemuan,
          idrekomendasi: this.rekomendasi.id,
          norekomendasi: this.rekomendasi.nomorRekomendasi
        }
      });
    },
    openEdit(item) {
      this.$router.push({
        name: "module-edit-pelaku",
        params: { idPelaku: item.id }
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },

    onAddTemuan(lha) {
      this.$router.push({
        name: "module-create-temuan",
        query: {
          idlha: lha.id,
          nolha: lha.nomorLha,
          tpk: lha.flagTpk
        }
      });
    },

    onAddRekomendasi(temuan) {
      this.$router.push({
        name: "module-create-rekomendasi",
        query: {
          idlha: temuan.idLha,
          nolha: temuan.nomorLha,
          idtemuan: temuan.id,
          notemuan: temuan.nomorTemuan,
          nilaitemuan: temuan.nilaiTemuan
        }
      });
    },

    onSelectLha(selectedLha) {
      this.lha = selectedLha;
    },

    async onSelectTemuan(selectedTemuan) {
      this.temuan = selectedTemuan;
      if (this.temuan != "empty") {
        await this.loadRekomendasi({ id: this.temuan.id });
      }
    },

    async onSelectRekomendasi(selectedRekomendasi) {
      this.rekomendasi = selectedRekomendasi;
      // this.$router.push({
      //   path: '/pelaku',
      //   query: {
      //     filterlha: this.lha.id,
      //     filtertemuan: this.temuan.id ? this.temuan.id : '',
      //     filterrekomendasi: this.rekomendasi.id ? this.rekomendasi.id : '',
      //   },
      // });
      history.pushState(
        {},
        null,
        `/#${this.$route.path}?filterlha=${encodeURIComponent(
          this.lha.id
        )}&filtertemuan=${encodeURIComponent(
          this.temuan.id
        )}&filterrekomendasi=${encodeURIComponent(this.rekomendasi.id)}`
      );
      await this.loadPelaku();
    },

    async actionDelete() {
      try {
        const response = await this.$store.dispatch(
          "module_pelaku/deletePelakuById",
          {
            idPelaku: this.idToDelete
          }
        );

        this.isDeleteConfirm = false;

        if (response.status == 200) {
          await this.loadPelaku();

          this.toastSuccess(
            `Berhasil menghapus data dengan ID ${this.idToDelete}`
          );
        }
      } catch (error) {
        this.toastError(error.message);
      }
    },

    async loadPelaku(refresh = false) {
      this.loading = true;
      try {
        if (this.rekomendasi != "empty" || this.temuan != "empty") {
          await this.$store.dispatch("module_pelaku/loadPelaku", {
            forceRefresh: refresh,
            idRekomendasi: this.rekomendasi.id
          });
          this.items = this.$store.getters["module_pelaku/pelaku"];
        } else {
          this.items = [];
        }
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    }
  }
};
</script>
