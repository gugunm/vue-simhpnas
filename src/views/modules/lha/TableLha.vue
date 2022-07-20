<template>
  <div>
    <CRow class="px-3">
      <!-- <CCol class="px-0" lg="12">
        <h4 class="my-0 mt-1 mb-3 text-2xl font-semibold">
          {{ topTitle }} {{ title }} {{ descTitle | descCamelCase }}
        </h4>
      </CCol> -->
      <CCol v-if="isAddButton && isLevelAccess" class="px-0" lg="6">
        <CButton color="info" class="mb-4 px-4" @click="openCreateModal">
          <CIcon name="cil-plus" class="my-0 mb-1 mr-1" /> Tambah
        </CButton>
      </CCol>
      <CCol v-if="!isLevelAccess" class="px-0" lg="6" />
      <CCol class="px-0 mb-4 text-right" lg="6">
        <ReportLevelOne />
      </CCol>
    </CRow>

    <CCard>
      <CCardBody>
        <CDataTable
          :items="items"
          :fields="fields"
          hover
          column-filter
          sorter
          :items-per-page="5"
          pagination
          :table-filter="{ label: 'Search: ', placeholder: 'teks..' }"
          :items-per-page-select="{ label: 'Item per halaman: ' }"
        >
          <template #statusLha="{ item }">
            <td class="font-semibold text-center">
              <p>{{ item.statusLha }}</p>
            </td>
          </template>
          <template #nomor="{ item }">
            <td class="font-semibold">
              {{ item.no + "/" + items.length }}
            </td>
          </template>
          <template #nomorLha="{ item }">
            <td
              v-if="clickableRows"
              class="text-blue-500 uppercase hover:text-blue-700"
              style="cursor: pointer"
              @click="clickedRow(item)"
            >
              {{ item.nomorLha }}
            </td>
            <td v-else>
              {{ item.nomorLha }}
            </td>
          </template>
          <template #print="{ item }">
            <td>
              <TpTiga :id-lha="item.id" />
              <!-- {{ $func.convertToRupiah(item.id) }} -->
            </td>
          </template>
          <template #bidangObrik="{ item }">
            <td>
              <div class="inline-block" style="width: 200px">
                {{ item.bidangObrik }}
              </div>
            </td>
          </template>
          <template #nilaiTemuan="{ item }">
            <td>
              {{ $func.convertToRupiah(item.nilaiTemuan) }}
            </td>
          </template>
          <template #judulLaporan="{ item }">
            <td>
              <div style="width: 200px">
                {{ item.judulLaporan }}
              </div>
            </td>
          </template>
          <template #anggaranYangDiaudit="{ item }">
            <td>
              {{ $func.convertToRupiah(item.anggaranYangDiaudit) }}
            </td>
          </template>
          <template #nilaiRekomendasi="{ item }">
            <td>
              {{ $func.convertToRupiah(item.nilaiRekomendasi) }}
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
                  :color="isLhaSent(item) ? 'dark' : 'primary'"
                  variant="outline"
                  square
                  size="sm"
                  class="block mb-2"
                  :disabled="isLhaSent(item)"
                  @click="openSendModal(item.id)"
                >
                  <p v-if="isLhaSent(item)">
                    Terkirim
                  </p>
                  <p v-else class="px-2">
                    Kirim
                  </p>
                </CButton>
                <!-- <p>{{ typeof item.catatanDalnis }}</p> -->
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
            <td v-if="isLhaSent(item)" class="text-center">
              No Actions
            </td>
            <td v-else>
              <div class="flex flex-wrap justify-content-center w-24">
                <CButton
                  v-if="item.flagTemuanNihil == 0"
                  v-c-tooltip="{
                    content: 'Tambah Temuan',
                    placement: 'top'
                  }"
                  color="info"
                  variant="outline"
                  size="sm"
                  class="m-1 inline-block"
                  @click="onAddTemuan(item)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </CButton>
                <CButton
                  v-c-tooltip="{
                    content: 'Tambah Tim Audit',
                    placement: 'top'
                  }"
                  color="success"
                  variant="outline"
                  size="sm"
                  class="m-1 inline-block"
                  @click="onAddTim(item)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                    />
                  </svg>
                </CButton>
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
              </div>
            </td>
          </template>

          <!-- <template #memoDalnisDaltu="{ item }">
            <td>
              <div class="flex justify-content-center">
                <CRow>
                  <CCol>
                    <CButton
                      color="primary"
                      shape="pill"
                      size="sm"
                      class="inline-block px-3 m-1"
                      :disabled="statusDalnis(item)"
                      @click="onOpenMemoModal(item)"
                    >
                      <span>Catatan</span>
                    </CButton>
                  </CCol>
                </CRow>
              </div>
            </td>
          </template> -->

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
                  @click="onAccLha(item)"
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
                  <!-- @click="onRejectLha(item)" -->
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
                  :disabled="statusAdmin(item)"
                  @click="onPostingLha(item)"
                >
                  <span>Posting</span>
                </CButton>
                <CButton
                  color="warning"
                  variant="outline"
                  square
                  size="sm"
                  class="m-1 w-full"
                  :disabled="!statusAdmin(item)"
                  @click="onUnPostLha(item)"
                >
                  <span>Unlock</span>
                </CButton>
              </div>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
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
    <!-- <confirm-modal
      v-model="isOpenReject"
      title="Tolak Laporan"
      msg="Apakah anda yakin akan menolak laporan ini?"
      @close-modal="isOpenReject = false"
      @confirm-ok="actionRejectDalnis"
    /> -->
    <confirm-modal
      v-model="isOpenPosting"
      title="Posting LHA"
      msg="Apakah anda yakin akan memposting laporan ini?"
      @close-modal="isOpenPosting = false"
      @confirm-ok="actionPostingLha"
    />
    <confirm-modal
      v-model="isOpenUnPost"
      title="Buka LHA"
      msg="Apakah anda yakin akan membuka laporan ini?"
      @close-modal="isOpenUnPost = false"
      @confirm-ok="actionUnPostLha"
    />
  </div>
</template>

<script>
import axios from "axios";
import mixin from "./mixin";
import ConfirmModal from "@/components/Confirm/ConfirmModal.vue";
import ReportLevelOne from "@/components/Reports/ReportLevel1.vue";
import TpTiga from "@/components/Reports/TpTiga.vue";

export default {
  name: "TableLha",
  filters: {
    descCamelCase(val) {
      if (!val) return "";
      return val
        .split(" ")
        .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(" ");
    }
  },
  components: {
    ConfirmModal,
    ReportLevelOne,
    TpTiga
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
    }
  },
  data() {
    return {
      memoModal: false,
      selectedItem: null,
      textMemo: null,
      isOpenAcc: false,
      isOpenReject: false,
      isOpenPosting: false,
      isOpenUnPost: false,
      isLevelAccess: false
    };
  },
  mounted() {
    //  ${this.title} ${this.descTitle | this.descCamelCase}
    this.$store.commit("ui/setTitleHeader", `${this.topTitle}`);
    if (localStorage.level == 3 || localStorage.level == 4) {
      this.isLevelAccess = true;
    }
  },
  emits: [
    "clicked-row",
    "open-create-modal",
    "open-edit-modal",
    "open-delete-modal",
    "on-send-lha",
    "on-load-lha"
  ],
  methods: {
    onLihatCatatan(item) {
      this.memoModal = true;
      this.textMemo = item.catatanDalnis;
    },

    async onSaveMemoAndTolakLaporan() {
      try {
        const responseMemo = await this.onSaveMemo();
        const responseTolak = await this.actionRejectDalnis();

        if (responseTolak.status == 200 && responseMemo.status == 200) {
          this.memoModal = false;
          this.selectedItem = null;
          this.textMemo = "";
          this.$emit("on-load-lha");
          this.toastSuccess("Berhasil menyimpan memo");
          this.toastSuccess("Berhasil menolak laporan memo");
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
        method: "PUT",
        baseURL: this.$apiAddress,
        url: `/api/dalnisaddmemo/${this.selectedItem.id}`,
        params: {
          Catatan_Dalnis: this.textMemo,
          token: localStorage.getItem("api_token")
        }
      });
    },

    async actionRejectDalnis() {
      return await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/dalnisactiontolak/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
    },

    onAccLha(item) {
      this.isOpenAcc = true;
      this.selectedItem = item;
    },

    async actionAccDalnis() {
      const response = await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/dalnisactionacc/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
      if (response.status == 200) {
        this.isOpenAcc = false;
        this.toastSuccess("Berhasil menyetujui LHA");
        this.selectedItem = null;
        this.$emit("on-load-lha");
      } else {
        this.toastError("Terjadi kesalahan saat acc laporan");
      }
    },

    onPostingLha(item) {
      this.isOpenPosting = true;
      this.selectedItem = item;
    },

    async actionPostingLha() {
      const response = await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/adminactionacc/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
      if (response.status == 200) {
        this.isOpenPosting = false;
        this.toastSuccess("Berhasil memposting LHA");
        this.selectedItem = null;
        this.$emit("on-load-lha");
      } else {
        this.toastError("Terjadi kesalahan saat posting laporan");
      }
    },

    onUnPostLha(item) {
      this.isOpenUnPost = true;
      this.selectedItem = item;
    },

    async actionUnPostLha() {
      const response = await axios({
        method: "PATCH",
        baseURL: this.$apiAddress,
        url: `/api/adminactionunposting/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem("api_token")
        }
      });
      if (response.status == 200) {
        this.isOpenUnPost = false;
        this.toastSuccess("Berhasil membuka LHA");
        this.selectedItem = null;
        this.$emit("on-load-lha");
      } else {
        this.toastError("Terjadi kesalahan saat membuka laporan");
      }
    },

    isLhaSent(item) {
      if (item.flagKirim % 2 == 0) {
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
    openSendModal(id) {
      this.$emit("on-send-lha", id);
    },
    onAddTemuan(item) {
      this.$router.push({
        name: "module-create-temuan",
        query: {
          idlha: item.id,
          nolha: item.nomorLha,
          tpk: item.flagTpk
        }
      });
    },
    onAddTim(item) {
      this.$router.push({
        name: "module-create-tim",
        query: { idlha: item.id, nolha: item.nomorLha }
      });
    }
  }
};
</script>

<style scoped>
.btn-action-table {
  border: 1px solid #fc8181;
}
</style>
