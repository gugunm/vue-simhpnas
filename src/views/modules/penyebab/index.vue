<template>
  <div>
    <table-penyebab
      top-title="Penyebab"
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
    <Loading
      :active.sync="loading"
      :is-full-page="true"
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
import TablePenyebab from "./TablePenyebab.vue";
import mixin from "./mixin";
import ConfirmModal from "@/components/Confirm/ConfirmModal.vue";
import Loading from "vue-loading-overlay";

const fields = [
  {
    key: "nomorPenyebab",
    label: "Nomor Penyebab",
    _style: "width: 15%"
  },
  // {
  //   key: 'nomorTemuan',
  // },
  // {
  //   key: 'nomorLha',
  // },
  // {
  //   key: 'nomorPenyebab',
  // },
  {
    key: "deskripsi"
  },
  {
    key: "memoPenyebab"
  },
  {
    key: "actions",
    label: "Aksi",
    _style: "width: 12%"
  }
];

export default {
  name: "PenyebabTemuan",
  components: {
    TablePenyebab,
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
      temuan: {}
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
    await this.loadPenyebab();
  },

  methods: {
    openDetail(item) {
      this.$router.push({
        name: "module-detail-penyebab",
        params: { idPenyebab: item.id }
      });
    },

    openCreate() {
      this.$router.push({
        name: "module-create-penyebab",
        query: {
          idlha: this.lha.id,
          nolha: this.lha.nomorLha,
          idtemuan: this.temuan.id,
          notemuan: this.temuan.nomorTemuan
        }
      });
    },

    openEdit(item) {
      this.$router.push({
        name: "module-edit-penyebab",
        params: { idPenyebab: item.id }
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

    onSelectLha(selectedLha) {
      this.lha = selectedLha;
    },

    async onSelectTemuan(selectedTemuan) {
      this.temuan = selectedTemuan;
      // this.$router.push({
      //   path: '/penyebab',
      //   query: {
      //     filterlha: this.lha.id,
      //     filtertemuan: this.temuan.id ? this.temuan.id : '',
      //   },
      // });
      history.pushState(
        {},
        null,
        `/#${this.$route.path}?filterlha=${encodeURIComponent(
          this.lha.id
        )}&filtertemuan=${encodeURIComponent(this.temuan.id)}`
      );
      await this.loadPenyebab();
    },

    async actionDelete() {
      try {
        const response = await this.$store.dispatch(
          "module_penyebab/deletePenyebabById",
          {
            idPenyebab: this.idToDelete
          }
        );

        this.isDeleteConfirm = false;

        if (response.status == 200) {
          await this.loadPenyebab();

          this.toastSuccess(
            `Berhasil menghapus data dengan ID ${this.idToDelete}`
          );
        }
      } catch (error) {
        this.toastError(error.message);
      }
    },

    async loadPenyebab(refresh = false) {
      this.loading = true;
      try {
        if (this.temuan != "empty") {
          await this.$store.dispatch("module_penyebab/loadPenyebab", {
            idTemuan: this.temuan.id,
            forceRefresh: refresh
          });
          this.items = this.$store.getters["module_penyebab/penyebab"];
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
