<template>
  <div>
    <TableLha
      top-title="Laporan Hasil Audit"
      :items="items"
      :fields="fields"
      :clickable-rows="level != 2"
      :is-edit-button="true"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
      @on-send-lha="onSendLha"
      @on-load-lha="onLoadLha"
    />
    <Loading :active.sync="loading" :is-full-page="true" />
    <confirm-modal
      v-model="isDeleteConfirm"
      title="Hapus data"
      msg="Apakah anda yakin akan menghapus data ini?"
      @close-modal="isDeleteConfirm = false"
      @confirm-ok="actionDelete"
    />
    <confirm-modal
      v-model="isSendLhaConfirm"
      title="Kirim LHA"
      msg="Apakah anda yakin akan mengirim data ini?"
      @close-modal="isSendLhaConfirm = false"
      @confirm-ok="actionSendLha"
    />
  </div>
</template>

<script>
import TableLha from "./TableLha.vue";
import mixin from "./mixin";
import ConfirmModal from "@/components/Confirm/ConfirmModal.vue";

import Loading from "vue-loading-overlay";

const fields = [
  {
    key: "statusLha",
    label: "Status LHA",
    align: "center"
  },
  {
    key: "nomorLha",
    label: "Nomor LHA"
  },
  {
    key: "tglLha",
    label: "Tanggal"
  },
  {
    key: "judulLaporan",
    _style: "width: 50%"
  },
  {
    key: "bidangObrik",
    label: "Nama Obrik"
    // _style: 'width: 30%',
  },

  {
    key: "jenisAnggaran"
    // _style: 'width: 8%',
  },

  {
    key: "anggaranYangDiaudit"
    // _style: 'width: 15%',
  },
  {
    key: "jumlahTemuan"
  },
  {
    key: "nilaiTemuan"
  },
  {
    key: "jumlahRekomendasi"
  },
  {
    key: "nilaiRekomendasi"
  },
  {
    key: "jumlahTl",
    label: "Jumlah TL"
  },
  {
    key: "nilaiTl",
    label: "Nilai TL"
  }
];

const fieldsKtOperator = [
  {
    key: "nomor",
    label: "No"
  },
  {
    key: "print",
    label: "Print"
  },
  {
    key: "actions",
    label: "Aksi",
    _style: "width: 20%"
  },
  {
    key: "send",
    label: "Kirim"
  }
];

const fieldsDalnisDaltu = [
  {
    key: "nomor",
    label: "No"
  },
  {
    key: "print"
  },
  // {
  //   key: 'memoDalnisDaltu',
  //   label: 'Memo',
  //   _style: 'width: 10%',
  // },
  {
    key: "actionsDalnisDaltu",
    label: "Aksi",
    _style: "width: 10%"
  }
];

const fieldsAdmin = [
  {
    key: "nomor",
    label: "No"
  },
  {
    key: "actionsAdmin",
    label: "Aksi",
    _style: "width: 10%"
  }
];

export default {
  name: "LHA",
  components: {
    TableLha,
    ConfirmModal,
    Loading
  },
  mixins: [mixin],
  data() {
    return {
      items: "",
      fields: [],
      isDeleteConfirm: false,
      idToDelete: null,
      isSendLhaConfirm: false,
      idToSend: null,
      level: "",
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
    await this.loadLha();

    this.level = localStorage.level;
    if (this.level == 2) {
      this.fields = [...fieldsAdmin, ...fields];
    } else if (this.level == 3 || this.level == 4) {
      this.fields = [...fieldsKtOperator, ...fields];
    } else if (this.level == 5 || this.level == 6) {
      this.fields = [...fieldsDalnisDaltu, ...fields];
    } else {
      this.fields = fields;
    }
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: "module-detail-lha",
        params: { idLha: item.id }
      });
    },
    openCreate() {
      this.$router.push({
        name: "module-create-lha"
      });
    },
    openEdit(item) {
      this.$router.push({
        name: "module-edit-lha",
        params: { idLha: item.id }
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        const response = await this.$store.dispatch(
          "module_lha/deleteLhaById",
          {
            idLha: this.idToDelete
          }
        );

        this.isDeleteConfirm = false;

        if (response.status == 200) {
          await this.loadLha();

          this.toastSuccess(response.data["dataPelaku"]);
          this.toastSuccess(response.data["dataRekomendasi"]);
          this.toastSuccess(response.data["dataPenyebab"]);
          this.toastSuccess(response.data["dataTemuan"]);
          this.toastSuccess(response.data["dataTimAudit"]);
          this.toastSuccess(response.data["dataLha"]);
        }
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadLha(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("module_lha/loadLha", {
          forceRefresh: refresh
        });
        this.items = this.$store.getters["module_lha/lha"];

        this.items = this.items.map((item, index) => ({
          no: index + 1,
          ...item
        }));
      } catch (error) {
        this.toastError(error.message);
      }
      this.loading = false;
    },

    onSendLha(id) {
      this.isSendLhaConfirm = true;
      this.idToSend = id;
    },

    async actionSendLha() {
      try {
        const res = await this.$store.dispatch("module_lha/sendLhaById", {
          idLha: this.idToSend
        });

        this.isSendLhaConfirm = false;

        if (res.status == 200) {
          await this.loadLha();
          this.toastSuccess("Berhasil mengirim LHA");
        }
      } catch (error) {
        this.isSendLhaConfirm = false;

        this.toastError(error.message);
      }
    },

    async onLoadLha() {
      await this.loadLha();
    }
  }
};
</script>
