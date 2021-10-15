<template>
  <div>
    <CRow class="px-3">
      <CCol class="px-0" lg="12" sm="12">
        <h4 class="my-0 mt-1 mb-3 text-2xl font-semibold">
          {{ topTitle }} {{ title }} {{ descTitle | descCamelCase }}
        </h4>
      </CCol>
    </CRow>
    <CCard class="pt-0">
      <CCardHeader style="background: #f9fafb; border-bottom: none">
        <CRow class="py-2">
          <CCol lg="2" class="font-semibold py-2"> Laporan Hasil Audit </CCol>
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
            <td class="py-2 d-flex justify-content-center">
              <CButton
                v-if="isEditButton"
                color="warning"
                variant="outline"
                square
                size="sm"
                class="mr-2"
                @click="openEditModal(item)"
              >
                <p>Edit</p>
              </CButton>
              <CButton
                v-if="isDeleteButton"
                color="danger"
                variant="outline"
                square
                size="sm"
                @click="openDeleteModal(item.id)"
              >
                <p>Hapus</p>
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
  name: 'TableTim',
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
    idLha: String,
  },
  data() {
    return {
      valueLha: '',
      optionsLha: [],
    };
  },
  async mounted() {
    await this.loadLha();
    // if (this.idLha) {
    //   this.valueLha = this.optionsLha.filter((val) => val.id == this.idLha);
    // } else {
    //   this.valueLha = this.optionsLha[0];
    // }
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
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.btn-action-table {
  border: 1px solid #fc8181;
}

.style-pilih-lha .vs__selected-options .vs__dropdown-toggle input {
  padding: 6px;
}
</style>