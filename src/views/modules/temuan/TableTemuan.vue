<template>
  <div>
    <CRow class="px-3">
      <CCol class="px-0" lg="12" sm="12">
        <h4 class="my-0 mt-1 mb-3 text-2xl font-semibold">
          {{ topTitle }} {{ title }} {{ descTitle | descCamelCase }}
        </h4>
      </CCol>
    </CRow>
    <CCard>
      <CCardHeader style="background: #f9fafb; border-bottom: none">
        <CRow class="py-3">
          <CCol lg="2" class="py-2 text-base"> Laporan Hasil Audit </CCol>
          <CCol lg="8">
            <multiselect
              v-if="optionsLha"
              v-model="valueLha"
              :options="optionsLha"
              :custom-label="viewSelectSearch"
              placeholder="Select laporan"
              label="nomorLha"
              track-by="nomorLha"
              @select="onSelectLha"
            />
          </CCol>
        </CRow>
      </CCardHeader>
      <CCol>
        <CButton class="px-4 mt-3" color="info" @click="openCreateModal">
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
          :items-per-page="5"
          pagination
          :table-filter="{ label: 'Search: ', placeholder: 'teks..' }"
          :items-per-page-select="{ label: 'Item per halaman: ' }"
        >
          <template #nomorTemuan="{ item }">
            <td
              v-if="clickableRows"
              class="text-blue-500 uppercase hover:text-blue-700"
              style="cursor: pointer"
              @click="clickedRow(item)"
            >
              {{ item.nomorTemuan }}
            </td>
            <td v-else>
              {{ item.nomorTemuan }}
            </td>
          </template>
          <!-- <template #actions> -->
          <template #actions="{ item }">
            <td class="py-2 flex flex-wrap justify-content-center">
              <CButton
                v-c-tooltip="{
                  content: '+ Penyebab',
                  placement: 'top',
                }"
                color="info"
                variant="outline"
                size="sm"
                class="m-1 inline-block"
                @click="onAddPenyebab(item)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </CButton>
              <CButton
                v-c-tooltip="{
                  content: '+ Rekomendasi',
                  placement: 'top',
                }"
                color="success"
                variant="outline"
                size="sm"
                class="m-1 inline-block"
                @click="onAddRekomendasi(item)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </CButton>
              <CButton
                v-if="isEditButton"
                v-c-tooltip="{
                  content: 'Edit',
                  placement: 'top',
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
                  placement: 'top',
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
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import mixin from './mixin';

export default {
  name: 'TableTemuan',
  components: {
    Multiselect,
  },
  filters: {
    descCamelCase(val) {
      if (!val) return '';
      return val
        .split(' ')
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ');
    },
  },
  mixins: [mixin],
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
  data() {
    return {
      valueLha: '',
      optionsLha: [],
    };
  },
  async mounted() {
    await this.loadLha();
    this.valueLha = this.optionsLha[0];
    this.onSelectLha();
  },
  emits: [
    'clicked-row',
    'open-create-modal',
    'open-edit-modal',
    'open-delete-modal',
    'on-select-lha',
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
    onSelectLha(val) {
      this.$emit('on-select-lha', val);
      if (!val) {
        this.$emit('on-select-lha', this.valueLha);
      }
    },
    viewSelectSearch({ id, nomorLha, subBidangObrik }) {
      return `${nomorLha} - ${subBidangObrik}`;
    },
    onAddPenyebab(item) {
      this.$router.push({
        name: 'module-create-penyebab',
        query: {
          idlha: item.idLha,
          nolha: item.nomorLha,
          idtemuan: item.id,
          notemuan: item.nomorTemuan,
        },
      });
    },
    onAddRekomendasi(item) {
      this.$router.push({
        name: 'module-create-rekomendasi',
        query: {
          idlha: item.idLha,
          nolha: item.nomorLha,
          idtemuan: item.id,
          notemuan: item.nomorTemuan,
          nilaitemuan: item.nilaiTemuan,
        },
      });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.btn-action-table {
  border: 1px solid #fc8181;
}
</style>