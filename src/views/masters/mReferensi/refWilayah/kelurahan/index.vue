<template>
  <div>
    <master-table
      top-title="Master"
      title="Kelurahan"
      :desc-title="'di Kec. ' + descKecamatan"
      :items="items"
      :fields="fields"
      :is-add-button="false"
    />
    <back-button title="Kembali" />
  </div>
</template>

<script>
import axios from "axios";
import MasterTable from "@/components/MasterTable";
import BackButton from "@/components/BackButton";

const fields = [
  {
    key: "id",
    label: "Kode",
    _style: "width: 15%"
  },
  {
    key: "deskripsi",
    label: "Nama Kelurahan",
    _style: "width: 70%"
  }
  // {
  //   key: 'actions',
  //   _style: 'width: 15%',
  // },
];

export default {
  name: "AdvancedTables",
  components: {
    MasterTable,
    BackButton
  },
  props: {
    idKecamatan: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      refKelurahan: null,
      fields,
      descKecamatan: null
    };
  },
  computed: {
    items() {
      return this.refKelurahan
        ? this.refKelurahan.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    }
  },
  created() {
    this.loadRefKelurahan();
    this.loadDescKecamatan();
  },
  methods: {
    async loadRefKelurahan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("m_ref_wilayah/loadRefKelurahan", {
          idKecamatan: this.idKecamatan,
          forceRefresh: refresh
        });
        this.refKelurahan = this.$store.getters["m_ref_wilayah/refKelurahan"];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },
    async loadDescKecamatan() {
      const response = await axios({
        method: "GET",
        baseURL: this.$apiAddress,
        url: `/api/kecamatan/${this.idKecamatan}`,
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

      this.descKecamatan = await response.data.diskripsi;
    }
  }
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
