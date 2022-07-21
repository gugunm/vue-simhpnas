<template>
  <div>
    <!-- <CRow class="px-3">
      <CCol
        class="px-0"
        lg="12"
        sm="12"
      >
        <h4 class="my-0 mt-1 mb-3 text-2xl font-semibold">
          {{ topTitle }} {{ title }} {{ descTitle | descCamelCase }}
        </h4>
      </CCol>
    </CRow> -->
    <CCard>
      <CCardHeader style="background: #f9fafb; border-bottom: none">
        <CRow class="pt-3 pb-2">
          <CCol lg="3" class="py-2 text-base">
            Laporan Hasil Audit
          </CCol>
          <CCol lg="8">
            <multiselect
              v-if="optionsLha"
              v-model="valueLha"
              :options="optionsLha"
              :custom-label="viewSelectSearchLha"
              placeholder="Select LHA"
              label="nomorLha"
              track-by="nomorLha"
              @select="onSelectLha"
            />
          </CCol>
        </CRow>
        <CRow class="pb-2 pt-2">
          <CCol lg="3" class="py-2 text-base">
            Nomor Temuan
          </CCol>
          <CCol lg="8">
            <multiselect
              v-if="optionsTemuan"
              v-model="valueTemuan"
              :options="optionsTemuan"
              :custom-label="viewSelectSearchTemuan"
              placeholder="Select temuan"
              label="nomorTemuan"
              track-by="nomorTemuan"
              @select="onSelectTemuan"
            />
          </CCol>
        </CRow>
        <CRow class="pb-3 pt-2">
          <CCol lg="3" class="py-2 text-base">
            Nomor Rekomendasi
          </CCol>
          <CCol lg="8">
            <multiselect
              v-if="optionsRekomendasi"
              v-model="valueRekomendasi"
              :options="optionsRekomendasi"
              :custom-label="viewSelectSearchRekomendasi"
              placeholder="Select rekomendasi"
              label="nomorRekomendasi"
              track-by="nomorRekomendasi"
              @select="onSelectRekomendasi"
            />
          </CCol>
        </CRow>
      </CCardHeader>
      <div v-if="valueLha.flagTemuanNihil == 1">
        <CCol class="text-center">
          <h5 class="h5 text-base tracking-wide py-4 text-red-400">
            Temuan Nihil
          </h5>
        </CCol>
      </div>
      <div v-else>
        <div v-if="!valueRekomendasi">
          <CCol class="text-center">
            <h5 class="h5 text-base tracking-wide py-4 text-red-400">
              Temuan belum ada rekomendasi
            </h5>
          </CCol>
        </div>
        <div v-else>
          <CRow class="px-3 pt-3">
            <CCol lg="2">
              <p class="text-base mb-1">
                Nilai Rekomendasi
              </p>
              <p>
                {{ $func.convertToRupiah(valueRekomendasi.nilaiRekomendasi) }}
              </p>
            </CCol>
            <CCol lg="2" class="border-r">
              <p class="text-base mb-1">
                Total Nilai TL
              </p>
              <p>{{ $func.convertToRupiah(valueRekomendasi.nilaiTL) }}</p>
            </CCol>
            <CCol lg="8">
              <p class="text-base mb-1">
                Memo Rekomendasi
              </p>
              <p class="break-words">
                {{ valueRekomendasi.memoRekomendasi }}
              </p>
            </CCol>
          </CRow>
          <CCol>
            <CButton
              v-if="isLevelAccess"
              class="px-4 mt-4"
              color="info"
              @click="openCreateModal"
            >
              <CIcon name="cil-plus" class="my-0 mb-1 mr-1" /> Tambah
            </CButton>
          </CCol>
          <CCardBody>
            <CDataTable
              :items="items"
              :fields="fields"
              hover
              column-filter
              sorter
              :items-per-page="10"
              pagination
              :table-filter="{ label: 'Search: ', placeholder: 'teks..' }"
              :items-per-page-select="{ label: 'Item per halaman: ' }"
            >
              <template #nomorTl="{ item }">
                <td
                  v-if="clickableRows"
                  class="text-blue-500 uppercase hover:text-blue-700"
                  style="cursor: pointer"
                  @click="clickedRow(item)"
                >
                  {{ item.nomorTl }}
                </td>
                <td v-else>
                  {{ item.nomorTl }}
                </td>
              </template>
              <template #nilaiTl="{ item }">
                <td>
                  {{ $func.convertToRupiah(item.nilaiTl) }}
                </td>
              </template>
              <template #send="{ item }">
                <td>
                  <div class="flex flex-col justify-center w-24">
                    <CButton
                      :color="isTlSent(item) ? 'dark' : 'primary'"
                      variant="outline"
                      square
                      size="sm"
                      class="block mb-2"
                      :disabled="isTlSent(item)"
                      @click="onOpenSend(item)"
                    >
                      <span v-if="isTlSent(item)">Terkirim</span>
                      <span v-else>Kirim</span>
                    </CButton>
                    <CButton
                      v-if="item.catatanDalnis"
                      color="warning"
                      variant="fill"
                      square
                      size="sm"
                      class="block"
                      @click="onLihatCatatan(item)"
                    >
                      <p>Lihat Catatan</p>
                    </CButton>
                  </div>
                </td>
              </template>
              <template #actions="{ item }">
                <td v-if="isTlSent(item)" class="text-center">
                  <p>No Actions</p>
                </td>
                <td v-else class="py-2 d-flex justify-content-center">
                  <CButton
                    v-if="isEditButton"
                    v-c-tooltip="{
                      content: 'Edit',
                      placement: 'top'
                    }"
                    color="warning"
                    variant="outline"
                    square
                    size="sm"
                    class="m-1 inline-block"
                    @click="openEditModal(item)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </CButton>
                  <CButton
                    v-if="isDeleteButton"
                    v-c-tooltip="{
                      content: 'Hapus',
                      placement: 'top'
                    }"
                    color="danger"
                    variant="outline"
                    size="sm"
                    class="m-1 inline-block"
                    @click="openDeleteModal(item.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </CButton>
                </td>
              </template>

              <template #memoDalnisDaltu="{ item }">
                <td>
                  {{ item.catatanDalnis }}
                </td>
              </template>

              <template #actionsDalnisDaltu="{ item }">
                <td>
                  <div class="flex flex-wrap justify-content-center w-24">
                    <CButton
                      color="success"
                      variant="fill"
                      square
                      size="sm"
                      class="m-1 w-full"
                      :disabled="
                        $func.isGenap(item.flagKirim) ||
                          $func.isGanjil(item.flagDalnis)
                      "
                      @click="onAccTl(item)"
                    >
                      <span>Setuju</span>
                    </CButton>
                    <CButton
                      color="danger"
                      variant="outline"
                      size="sm"
                      class="m-1 w-full"
                      :disabled="
                        $func.isGenap(item.flagKirim) ||
                          $func.isGanjil(item.flagDalnis)
                      "
                      @click="onOpenMemoModal(item)"
                    >
                      <!-- :disabled="statusDalnis(item)" -->
                      <span>Tolak</span>
                    </CButton>
                  </div>
                </td>
              </template>

              <template #actionsAdmin="{ item }">
                <td>
                  <div class="flex flex-wrap justify-content-center">
                    <CButton
                      color="info"
                      variant="fill"
                      square
                      size="sm"
                      class="m-1 w-full"
                      :disabled="$func.isGanjil(item.flagAdmin)"
                      @click="onPostingTl(item)"
                    >
                      <span>Posting</span>
                    </CButton>
                    <CButton
                      color="warning"
                      variant="outline"
                      square
                      size="sm"
                      class="m-1 w-full"
                      :disabled="$func.isGenap(item.flagAdmin)"
                      @click="onUnPostTl(item)"
                    >
                      <span>Unlock</span>
                    </CButton>
                  </div>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </div>
      </div>
    </CCard>
    <CModal
      :title="isLevelAccess ? 'Catatan Dalnis' : 'Tambah Memo'"
      :close-on-backdrop="isLevelAccess"
      size="lg"
      :color="isLevelAccess ? 'warning' : 'danger'"
      :show.sync="memoModal"
    >
      <div class="text-right">
        <CTextarea
          v-model="textMemo"
          class="custom-textarea py-2"
          rows="10"
          :disabled="isLevelAccess"
          placeholder="Tuliskan memo disini.."
        />
        <CButton
          v-if="!isLevelAccess"
          color="danger"
          class="mb-2"
          @click="onSaveMemoAndTolakLaporan"
        >
          Simpan Memo & Tolak Laporan
        </CButton>
      </div>

      <template #footer-wrapper>
        <div />
      </template>
    </CModal>
    <confirm-modal
      v-model="isOpenAcc"
      title="ACC Laporan"
      msg="Apakah anda yakin akan menyetujui laporan ini?"
      @close-modal="isOpenAcc = false"
      @confirm-ok="actionAccDalnis"
    />
    <confirm-modal
      v-model="isOpenSend"
      title="Kirim Laporan"
      msg="Apakah anda yakin akan mengirim laporan ini?"
      @close-modal="isOpenSend = false"
      @confirm-ok="actionSend"
    />
    <confirm-modal
      v-model="isOpenPosting"
      title="Posting TL"
      msg="Apakah anda yakin akan memposting laporan ini?"
      @close-modal="isOpenPosting = false"
      @confirm-ok="actionPostingTl"
    />
    <confirm-modal
      v-model="isOpenUnPost"
      title="Buka Tl"
      msg="Apakah anda yakin akan membuka laporan ini?"
      @close-modal="isOpenUnPost = false"
      @confirm-ok="actionUnPostTl"
    />
  </div>
</template>

<script>
import axios from "axios";
import ConfirmModal from "@/components/Confirm/ConfirmModal.vue";
import Multiselect from "vue-multiselect";
import mixin from "./mixin";

export default {
  name: "TableTindakLanjut",
  components: {
    Multiselect,
    ConfirmModal
  },
  filters: {
    descCamelCase(val) {
      if (!val) return "";
      return val
        .split(" ")
        .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(" ");
    }
  },
  mixins: [mixin],
  props: {
    topTitle: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    descTitle: {
      type: String,
      default: ""
    },
    items: Object,
    fields: Object,
    clickableRows: Boolean,
    isEditButton: {
      type: Boolean,
      default: true
    },
    isDeleteButton: {
      type: Boolean,
      default: true
    },
    isAddButton: {
      type: Boolean,
      default: true
    },
    /* props ini dapat dari query params parent */
    filterlha: {
      type: String,
      default: null
    },
    /* props ini dapat dari query params */
    filtertemuan: {
      type: String,
      default: null
    },

    /* props ini dapat dari query params */
    filterrekomendasi: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      valueLha: "",
      optionsLha: [],
      valueTemuan: "",
      optionsTemuan: [],
      valueRekomendasi: "",
      optionsRekomendasi: [],
      isOpenSend: false,
      isOpenPosting: false,
      isOpenUnPost: false,
      isLevelAccess: false,
      memoModal: false,
      selectedItem: null,
      textMemo: null,
      isOpenAcc: false
    };
  },
  async mounted() {
    this.$store.commit("ui/setTitleHeader", `${this.topTitle}`);
    if (localStorage.level == 3 || localStorage.level == 4) {
      this.isLevelAccess = true;
    }
    await this.selectLhaMounted();
  },
  emits: [
    "clicked-row",
    "open-create-modal",
    "open-edit-modal",
    "open-delete-modal",
    "on-select-lha",
    "on-select-temuan",
    "on-select-rekomendasi",
    "on-load-tl"
  ],
  methods: {
    clickedRow(item) {
      this.$emit("clicked-row", item);
    },
    openCreateModal() {
      this.$emit("open-create-modal");
    },
    openEditModal(item) {
      this.$emit("open-edit-modal", item);
    },
    openDeleteModal(id) {
      this.$emit("open-delete-modal", id);
    },

    onLihatCatatan(item) {
      this.memoModal = true;
      this.textMemo = item.catatanDalnis;
    },

    async onSaveMemoAndTolakLaporan() {
      try {
        const responseMemo = await this.onSaveMemo();
        const responseTolak = await this.actionRejectDalnis();

        if (responseMemo.status == 200 && responseTolak.status == 200) {
          this.memoModal = false;
          this.selectedItem = null;
          this.textMemo = "";
          this.$emit("on-load-tl");
          this.toastSuccess("Berhasil menyimpan memo");
          this.toastSuccess("Berhasil menolak laporan");
        } else {
          this.toastError(
            "Terjadi kesalahan saat simpan memo dan tolak laporan"
          );
        }
      } catch (error) {
        this.toastError("Terjadi kesalahan saat simpan memo dan tolak laporan");
      }
    },

    onOpenMemoModal(item) {
      this.memoModal = true;
      this.selectedItem = item;
    },

    async onSaveMemo() {
      return await axios({
        method: "POST",
        baseURL: this.$apiAddress,
        data: {
          _method: "PATCH",
          Catatan_Dalnis: this.textMemo
        },
        url: `/api/dalnisaddmemotl/${this.selectedItem.id}`,
        params: {
          // _method: 'PATCH',
          // Catatan_Dalnis: this.textMemo,
          token: localStorage.getItem("api_token")
        }
      });
    },

    async actionRejectDalnis() {
      return await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/dalnisactiontolaktl/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
    },

    onAccTl(item) {
      this.isOpenAcc = true;
      this.selectedItem = item;
    },

    async actionAccDalnis() {
      const response = await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/dalnisactionacctl/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
      if (response.status == 200) {
        this.isOpenAcc = false;
        this.toastSuccess("Berhasil menyetujui Tindak Lanjut");
        this.selectedItem = null;
        this.$emit("on-load-tl");
      } else {
        this.toastError("Terjadi kesalahan saat acc laporan");
      }
    },

    /**
     * Method ini dipanggil ketika component mounted
     * * mounted dipanggil ketika beberapa kondisi
     * * - Saat menu di click, tanpa ada query parameter
     * * - Saat setelah create dan edit, dengan disertai parameter
     */
    async selectLhaMounted() {
      await this.loadLha();

      if (this.filterlha) {
        /** execute ketika setelah create dan edit */
        this.valueLha = this.optionsLha.filter(
          data => data.id == this.filterlha
        )[0];
      } else {
        /** execute ketika click */
        this.valueLha = this.optionsLha[0];
      }
      /** lempar value lha ke parent */
      this.$emit("on-select-lha", this.valueLha);

      await this.loadTemuan({ id: this.valueLha.id });

      if (this.optionsTemuan.length > 0 && this.filtertemuan) {
        /** execute ketika lha punya temuan dan setelah create dan edit */
        this.valueTemuan = this.optionsTemuan.filter(
          data => data.id == this.filtertemuan
        )[0];
        /** pilih temuan sesuai valuenya */
        this.onSelectTemuan();
      } else if (this.optionsTemuan.length > 0) {
        /* execute ketika lha punya temuan, saat click menu */
        this.valueTemuan = this.optionsTemuan[0];
        /* pilih temuan yang pertama di lha itu */
        this.onSelectTemuan();
      } else {
        /* execute ketika lha tidak punya temuan */
        this.valueTemuan = "";
        /* lempar temuan ke parent */
        this.$emit("on-select-temuan", "empty");
      }

      await this.loadRekomendasi({ id: this.valueTemuan.id });

      if (this.optionsRekomendasi.length > 0 && this.filterrekomendasi) {
        /** execute ketika temuan punya rek dan setelah create dan edit */
        this.valueRekomendasi = this.optionsRekomendasi.filter(
          data => data.id == this.filterrekomendasi
        )[0];
        /** pilih rek sesuai valuenya */
        this.onSelectRekomendasi();
      } else if (this.optionsRekomendasi.length > 0) {
        /* execute ketika temuan punya rekomendasi - saat click menu */
        this.valueRekomendasi = this.optionsRekomendasi[0];
        /* pilih rekomendasi yang pertama di temuan itu */
        this.onSelectRekomendasi();
      } else {
        /* execute ketika temuan tidak punya rek */
        this.valueRekomendasi = "";
        /* lempar rek ke parent */
        this.$emit("on-select-rekomendasi", "empty");
      }
    },

    /**
     * Method ini dipanggil ketika user memilih LHA
     */
    async onSelectLha(val) {
      /* lempar value lha yang dipilih ke parent */
      this.$emit("on-select-lha", val);

      await this.loadTemuan({ id: val.id });

      if (this.optionsTemuan.length > 0) {
        /* execute ketika lha memiliki temuan */
        this.valueTemuan = this.optionsTemuan[0];
        /* lempar value temuan ke parent */
        this.onSelectTemuan();
      } else {
        /* execute ketika lha tidak memiliki temuan */
        this.valueTemuan = "";
        /* lempar value temuan ke parent */
        this.$emit("on-select-temuan", "empty");
        this.valueRekomendasi = "";
        /* lempar value rek ke parent */
        this.$emit("on-select-rekomendasi", "empty");
      }
    },

    async onSelectTemuan(val) {
      /* lempar value temuan ke parent, ini jika select temuan menggunakan select*/
      if (val) {
        this.valueTemuan = val;
        this.$emit("on-select-temuan", this.valueTemuan);
      } else {
        /* execute ketika selectnya tidak menggunakan autocomplete */
        this.$emit("on-select-temuan", this.valueTemuan);
      }

      await this.loadRekomendasi({ id: this.valueTemuan.id });

      if (this.optionsRekomendasi.length > 0) {
        /* execute ketika temuan memiliki rek */
        this.valueRekomendasi = this.optionsRekomendasi[0];
        /* lempar value rek ke parent */
        this.onSelectRekomendasi();
      } else {
        /* execute ketika temuan tidak punya rek */
        this.valueRekomendasi = "";
        /* lempar rek ke parent */
        this.$emit("on-select-rekomendasi", "empty");
      }
    },

    onSelectRekomendasi(val) {
      if (val) {
        this.valueRekomendasi = val;
        this.$emit("on-select-rekomendasi", this.valueRekomendasi);
      } else {
        this.$emit("on-select-rekomendasi", this.valueRekomendasi);
      }
    },

    viewSelectSearchLha({ id, nomorLha, bidangObrik }) {
      return `${nomorLha} - ${bidangObrik}`;
    },

    viewSelectSearchTemuan({
      id,
      nomorTemuan,
      subKelompokTemuan,
      kodeSubKelompokTemuan
    }) {
      return `${nomorTemuan} - (${kodeSubKelompokTemuan}) ${subKelompokTemuan} `;
    },

    viewSelectSearchRekomendasi({
      id,
      nomorRekomendasi,
      kodeSubKelompokRekomendasi,
      subKelompokRekomendasi
    }) {
      return `${nomorRekomendasi} - (${kodeSubKelompokRekomendasi}) ${subKelompokRekomendasi}`;
    },

    isTlSent(item) {
      if (item.flagKirim % 2 == 0) {
        return false;
      } else {
        return true;
      }
    },

    onOpenSend(item) {
      this.isOpenSend = true;
      this.selectedItem = item;
    },

    async actionSend() {
      const response = await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/kirimtl/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
      if (response.status == 200) {
        this.isOpenSend = false;
        // this.toastSuccess('Berhasil mengirim laporan');
        this.toastSuccess(response.data.message);
        this.selectedItem = null;
        this.$emit("on-load-tl");
      } else {
        // this.toastError('Terjadi kesalahan saat mengirim laporan');
        this.toastError(response.data.message);
      }
    },

    isCatatanDalnis(item) {
      if (!item.catatanDalnis) {
        return false;
      } else {
        return true;
      }
    },

    statusDalnis(item) {
      if (item.flagDalnis % 2 == 0) {
        return false;
      } else {
        return true;
      }
    },

    statusAdmin(item) {
      if (item.flagAdmin % 2 == 0) {
        return false;
      } else {
        return true;
      }
    },

    onPostingTl(item) {
      this.isOpenPosting = true;
      this.selectedItem = item;
    },

    onUnPostTl(item) {
      this.isOpenUnPost = true;
      this.selectedItem = item;
    },

    async actionPostingTl() {
      const response = await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/adminactionacctl/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
      if (response.status == 200) {
        this.isOpenPosting = false;
        this.toastSuccess("Berhasil memposting TL");
        this.selectedItem = null;
        this.$emit("on-load-tl");
      } else {
        this.toastError("Terjadi kesalahan saat posting laporan");
      }
    },

    async actionUnPostTl() {
      const response = await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/adminactionunpostingtl/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
      if (response.status == 200) {
        this.isOpenUnPost = false;
        this.toastSuccess("Berhasil membuka TL");
        this.selectedItem = null;
        this.$emit("on-load-tl");
      } else {
        this.toastError("Terjadi kesalahan saat membuka laporan");
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.btn-action-table {
  border: 1px solid #fc8181;
}
</style>
