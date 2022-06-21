<template>
  <div>
    <master-table
      top-title="Master"
      title="Sub Klp. Temuan"
      :desc-title="'Sub Klp. Temuan - ' + descKlpTemuan"
      :items="items"
      :fields="fields"
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
    <back-button
      title="Kembali"
      :to="/master-kelompok-temuan/ + idKlpTemuan.charAt(0)"
    />
  </div>
</template>

<script>
import axios from "axios";
import MasterTable from "@/components/MasterTable";
import BackButton from "@/components/BackButton";
import ConfirmModal from "@/components/Confirm/ConfirmModal.vue";
import mixin from "./mixin";

export default {
  name: "AdvancedTables",
  components: {
    MasterTable,
    BackButton,
    ConfirmModal
  },
  mixins: [mixin],
  props: {
    idKlpTemuan: {
      type: String,
      default: "0"
    },
    idJenisTemuan: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      fields: [],
      items: null,
      descKlpTemuan: null,
      idToDelete: null,
      isDeleteConfirm: false
    };
  },
  async mounted() {
    await this.loadSubKelompokTemuan();
    await this.loadDescKlpTemuan();

    this.fields = [
      {
        key: "id",
        label: "Kode",
        _style: "width: 15%"
      },
      {
        key: "deskripsi",
        label: "Deskripsi Sub Kelompok Temuan",
        _style: "width: 55%"
      },
      {
        key: "saran",
        label: "Rekomendasi",
        _style: "width: 20%"
      }
    ];
    if (localStorage.level == 0 || localStorage.level == 1) {
      this.fields = [
        ...this.fields,
        {
          key: "actions",
          _style: "width: 15%"
        }
      ];
    }
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: "master-create-sub-klp-temuan",
        params: {
          idKlpTemuan: this.idKlpTemuan,
          idJenisTemuan: this.idJenisTemuan
        }
      });
    },

    openEdit(item) {
      this.$router.push({
        name: "master-edit-sub-klp-temuan",
        params: {
          idSubKlpTemuan: item.id,
          idKlpTemuan: this.idKlpTemuan
        }
      });
    },

    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },

    async actionDelete() {
      try {
        await this.$store.dispatch("m_temuan/deleteSubKelompokTemuan", {
          idSubKelompokTemuan: this.idToDelete
        });
        this.isDeleteConfirm = false;
        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
        this.loadSubKelompokTemuan();
      } catch (error) {
        this.toastError(error.message);
      }
    },

    async loadSubKelompokTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("m_temuan/loadSubKelompokTemuan", {
          idKlpTemuan: this.idKlpTemuan,
          forceRefresh: refresh
        });
        this.items = this.$store.getters["m_temuan/subKelompokTemuan"];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },
    async loadDescKlpTemuan() {
      const response = await axios({
        method: "GET",
        baseURL: this.$apiAddress,
        url: `/api/klptemuan/${this.idKlpTemuan}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });

      if (response.status != 200) {
        const error = new Error(
          responseData.message || "Failed to fetch data unit kerja."
        );
        throw error;
      }

      this.descKlpTemuan = await response.data.diskripsi;
    }
  }
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
