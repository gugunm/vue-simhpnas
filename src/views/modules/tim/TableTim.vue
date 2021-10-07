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
        <CRow class="py-3 px-3">
          <CCol v-if="isAddButton" class="text-left px-0" lg="6" sm="12">
            <CButton color="info" class="px-4" @click="openCreateModal">
              <CIcon name="cil-plus" class="my-0 mb-1 mr-1" /> Tambah
            </CButton>
            <!-- <p class="mb-2 inline-block mr-3 font-semibold">
              Laporan Hasil Audit
            </p>
            <v-select
              v-model="nomorLha"
              class="inline-block w-2/3"
              :options="optionsLha"
              label="id"
              placeholder="Pilih LHA"
              :clearable="false"
            >
              <template v-slot:option="option">
                <div class="my-2">
                  <div class="text-xs mb-1">
                    <span class="font-bold">{{ option.id }}</span>
                    <span> - </span>
                    <span>{{ option.namaObrik }}</span>
                  </div>
                  <em class="">
                    {{ option.judulLaporan }}
                  </em>
                </div>
              </template>
            </v-select> -->
          </CCol>
          <CCol class="text-right" lg="6" sm="12">
            <p class="mb-2 inline-block mr-3 font-semibold">Tahun</p>
            <v-select
              v-model="nomorLha"
              class="inline-block w-32"
              :options="optionsLha"
              label="tahun"
              placeholder="Pilih Tahun"
              :clearable="false"
            >
              <template v-slot:option="option">
                <div class="my-2">
                  <p>{{ option.tahun }}</p>
                </div>
              </template>
            </v-select>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          :items="items"
          :fields="fields"
          hover
          column-filter
          sorter
          :table-filter="{ label: 'Search: ', placeholder: 'teks..' }"
          items-per-page-select
          :items-per-page="5"
          pagination
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
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const lhas = [
  {
    tahun: 2018,
  },
  {
    tahun: 2019,
  },
  {
    tahun: 2020,
  },
  {
    tahun: 2021,
  },
];

export default {
  name: 'TableTim',
  components: {
    vSelect,
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
      nomorLha: null,
      optionsLha: lhas,
    };
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
  },
};
</script>

<style scoped>
.btn-action-table {
  border: 1px solid #fc8181;
}
</style>