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
          <!-- size="md" -->
        </CButton>
      </CCol>
    </CRow>
    <CCard>
      <!-- <CCardHeader style="background: #f9fafb; border-bottom: none">
        <CRow class="py-3 px-3">
          <CCol class="text-left px-0" lg="6" sm="12">
            <CButton color="info" class="px-4" @click="openCreateModal">
              <CIcon name="cil-plus" class="my-0 mb-1 mr-1" /> Tambah
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader> -->
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
          <!-- :clickable-rows="clickableRows"
          @row-clicked="clickedRow" -->
          <template #id="{ item }">
            <td
              v-if="clickableRows"
              class="text-blue-500 uppercase hover:text-blue-700"
              style="cursor: pointer"
              @click="clickedRow(item)"
            >
              {{ item.id }}
            </td>
            <td v-else>
              {{ item.id }}
            </td>
          </template>
          <!-- <template #actions> -->
          <template #actions="{ item }">
            <td>
              <CRow>
                <CCol>
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
                        fill-rule="evenodd"
                        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </CButton>
                  <CButton
                    v-c-tooltip="{
                      content: '+ Tim Audit',
                      placement: 'right',
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
                </CCol>
              </CRow>
              <CRow class="">
                <CCol>
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
                    <!-- <font-awesome-icon :icon="['fas', 'pen']" /> -->
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
                    <!-- <span>Edit</span> -->
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
                    <!-- <font-awesome-icon :icon="['fas', 'trash-alt']" /> -->
                    <!-- <p>Hapus</p> -->
                  </CButton>
                </CCol>
              </CRow>
            </td>
          </template>
          <template #send="{ item }">
            <td>
              <CRow>
                <CCol>
                  <CButton
                    v-if="isDeleteButton"
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