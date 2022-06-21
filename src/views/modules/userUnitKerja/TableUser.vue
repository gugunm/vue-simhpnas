<template>
  <div>
    <CRow class="px-3">
      <!-- <CCol
        class="px-0"
        lg="12"
        sm="12"
      >
        <h4 class="my-0 mt-1 mb-3 text-2xl font-semibold">
          {{ topTitle }}
        </h4>
      </CCol> -->
      <CCol class="px-0 mb-4" lg="12" sm="12">
        <CButton color="info" class="px-4" @click="openCreateModal">
          <CIcon name="cil-plus" class="my-0 mb-1 mr-1" /> Tambah
        </CButton>
      </CCol>
    </CRow>
    <CCard class="pt-0">
      <CCardBody>
        <CDataTable
          v-if="items"
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
          <template #actions="{ item }">
            <td class="py-2 d-flex justify-content-center">
              <CButton
                v-if="isEditButton"
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
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </CButton>
              <CButton
                v-if="isDeleteButton"
                color="danger"
                variant="outline"
                size="sm"
                class="m-1 inline-block"
                @click="openDeleteModal(item.kodeUser)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </CButton>
              <CButton
                color="info"
                variant="outline"
                size="sm"
                class="m-1 inline-block"
                @click="openResetPasswordModal(item.kodeUser)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "TableUser",
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
    return {};
  },
  async mounted() {
    this.$store.commit("ui/setTitleHeader", `${this.topTitle}`);
  },
  emits: [
    "clicked-row",
    "open-create-modal",
    "open-edit-modal",
    "open-delete-modal"
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
    openResetPasswordModal(id) {
      this.$emit("open-reset-password", id);
    }
  }
};
</script>
