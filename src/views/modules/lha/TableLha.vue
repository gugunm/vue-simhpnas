<template>
  <div>
    <CRow class="px-3">
      <CCol class="px-0" lg="12" sm="12">
        <h4 class="my-0 mt-1 mb-3 text-2xl font-semibold">
          {{ topTitle }} {{ title }} {{ descTitle | descCamelCase }}
        </h4>
      </CCol>
      <CCol v-if="isAddButton" class="px-0" lg="12" sm="12">
        <CButton color="info" class="mb-4 px-4" @click="openCreateModal">
          <CIcon name="cil-plus" class="my-0 mb-1 mr-1" /> Tambah
        </CButton>
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
          <template #send="{ item }">
            <td>
              <div class="flex justify-content-center">
                <CRow>
                  <CCol>
                    <CButton
                      color="primary"
                      variant="outline"
                      square
                      size="sm"
                      class="inline-block m-1"
                      @click="openSendModal(item.id)"
                    >
                      <span>Kirim</span>
                    </CButton>
                  </CCol>
                </CRow>
              </div>
            </td>
          </template>
          <template #actions="{ item }">
            <td>
              <div class="flex flex-wrap justify-content-center">
                <CButton
                  v-c-tooltip="{
                    content: '+ Temuan',
                    placement: 'left',
                  }"
                  color="info"
                  variant="outline"
                  square
                  size="sm"
                  class="inline-block m-1"
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
                    content: '+ Tim Audit',
                    placement: 'left',
                  }"
                  color="success"
                  variant="outline"
                  square
                  size="sm"
                  class="inline-block m-1"
                  @click="onAddTim(item)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                    />
                  </svg>
                  <!-- <p>Temuan</p> -->
                </CButton>

                <CButton
                  v-if="isEditButton"
                  v-c-tooltip="{
                    content: 'Edit LHA',
                    placement: 'left',
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
                    content: 'Hapus LHA',
                    placement: 'left',
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
          <template #actionsDalnisDaltu="{ item }">
            <td>
              <div class="flex flex-wrap justify-content-center">
                <CButton
                  v-if="isEditButton"
                  v-c-tooltip="{
                    content: 'Edit LHA',
                    placement: 'left',
                  }"
                  color="success"
                  variant="fill"
                  square
                  size="sm"
                  class="m-1 w-full"
                  @click="onAccLha(item)"
                >
                  <span>Setuju</span>
                </CButton>
                <CButton
                  v-if="isDeleteButton"
                  v-c-tooltip="{
                    content: 'Hapus LHA',
                    placement: 'left',
                  }"
                  color="danger"
                  variant="outline"
                  size="sm"
                  class="m-1 w-full"
                  @click="openDeleteModal(item.id)"
                >
                  <span>Tolak</span>
                </CButton>
              </div>
            </td>
          </template>
          <template #actionsAdmin="{ item }">
            <td>
              <div class="flex flex-wrap justify-content-center">
                <CButton
                  v-if="isEditButton"
                  v-c-tooltip="{
                    content: 'Edit LHA',
                    placement: 'left',
                  }"
                  color="info"
                  variant="fill"
                  square
                  size="sm"
                  class="m-1 w-full"
                  @click="onAccLha(item)"
                >
                  <span>Posting</span>
                </CButton>
              </div>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'TableLha',
  filters: {
    descCamelCase(val) {
      if (!val) return '';
      return val
        .split(' ')
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ');
    },
  },
  props: {
    topTitle: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    descTitle: {
      type: String,
      default: '',
    },
    items: Object,
    fields: Object,
    clickableRows: Boolean,
    isEditButton: {
      type: Boolean,
      default: true,
    },
    isDeleteButton: {
      type: Boolean,
      default: true,
    },
    isAddButton: {
      type: Boolean,
      default: true,
    },
  },
  // data() {
  //   return {
  //     level: '',
  //   };
  // },
  // mounted() {
  //   if (localStorage.level) {
  //     this.level = localStorage.level;
  //   }
  // },
  emits: [
    'clicked-row',
    'open-create-modal',
    'open-edit-modal',
    'open-delete-modal',
  ],
  methods: {
    clickedRow(item) {
      this.$emit('clicked-row', item);
    },
    openCreateModal() {
      this.$emit('open-create-modal');
    },
    openEditModal(item) {
      this.$emit('open-edit-modal', item);
    },
    openDeleteModal(id) {
      this.$emit('open-delete-modal', id);
    },
    onAddTemuan(item) {
      this.$router.push({
        name: 'module-create-temuan',
        query: {
          idlha: item.id,
          nolha: item.nomorLha,
          tpk: item.flagTpk,
        },
      });
    },
    onAddTim(item) {
      this.$router.push({
        name: 'module-create-tim',
        query: { idlha: item.id, nolha: item.nomorLha },
      });
    },
  },
};
</script>

<style scoped>
.btn-action-table {
  border: 1px solid #fc8181;
}
</style>