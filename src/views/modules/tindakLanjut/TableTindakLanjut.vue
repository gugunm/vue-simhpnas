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
        <CRow class="pt-3 pb-2">
          <CCol lg="3" class="py-2 text-base"> Laporan Hasil Audit </CCol>
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
          <CCol lg="3" class="py-2 text-base"> Nomor Temuan </CCol>
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
          <CCol lg="3" class="py-2 text-base"> Nomor Rekomendasi </CCol>
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
      <CCol>
        <CButton class="px-4 mt-4" color="info" @click="openCreateModal">
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
  name: 'TableTindakLanjut',
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
      valueTemuan: '',
      optionsTemuan: [],
      valueRekomendasi: '',
      optionsRekomendasi: [],
    };
  },
  async mounted() {
    await this.selectLhaMounted();
  },
  emits: [
    'clicked-row',
    'open-create-modal',
    'open-edit-modal',
    'open-delete-modal',
    'on-select-lha',
    'on-select-temuan',
    'on-select-rekomendasi',
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

    async selectLhaMounted() {
      await this.loadLha();
      this.valueLha = this.optionsLha[0];
      this.$emit('on-select-lha', this.valueLha);

      await this.loadTemuan({ id: this.valueLha.id });
      this.valueTemuan = this.optionsTemuan[0];
      this.$emit('on-select-temuan', this.valueTemuan);

      await this.loadRekomendasi({ id: this.valueTemuan.id });
      this.valueRekomendasi = this.optionsRekomendasi[0];
      this.$emit('on-select-rekomendasi', this.valueRekomendasi);
    },

    async onSelectLha(val) {
      this.$emit('on-select-lha', val);

      await this.loadTemuan({ id: val.id });
      this.valueTemuan = this.optionsTemuan[0];
      this.$emit('on-select-temuan', this.valueTemuan);

      await this.loadRekomendasi({ id: this.valueTemuan.id });
      this.valueRekomendasi = this.optionsRekomendasi[0];
      this.$emit('on-select-rekomendasi', this.valueRekomendasi);
    },

    async onSelectTemuan(val) {
      this.$emit('on-select-temuan', val);

      await this.loadRekomendasi({ id: val.id });
      this.valueRekomendasi = this.optionsRekomendasi[0];
      this.$emit('on-select-rekomendasi', this.valueRekomendasi);
    },

    onSelectRekomendasi(val) {
      this.$emit('on-select-rekomendasi', val);
    },

    viewSelectSearchLha({ id, nomorLha, subBidangObrik }) {
      return `${nomorLha} - ${subBidangObrik}`;
    },

    viewSelectSearchTemuan({ id, nomorTemuan }) {
      return `${nomorTemuan}`;
    },

    viewSelectSearchRekomendasi({ id, nomorRekomendasi }) {
      return `${nomorRekomendasi}`;
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