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
          <CCol lg="2" class="py-2 text-base"> Laporan Hasil Audit </CCol>
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
        <CRow class="pb-3 pt-2">
          <CCol lg="2" class="py-2 text-base"> Nomor Temuan </CCol>
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
      </CCardHeader>
      <CRow v-if="valueTemuan" class="px-3 pt-3">
        <CCol lg="2" class="border-r">
          <p class="text-base mb-1">Nilai Temuan</p>
          <p>{{ $func.convertToRupiah(valueTemuan.nilaiTemuan) }}</p>
        </CCol>
        <CCol lg="10">
          <p class="text-base mb-1">Memo Temuan</p>
          <p class="break-words">
            {{ valueTemuan.memoTemuan }}
          </p>
        </CCol>
      </CRow>
      <CCol>
        <div v-if="valueTemuan">
          <CButton
            v-if="!statusReview"
            class="px-4 mt-4"
            color="info"
            @click="openCreateModal"
          >
            <CIcon name="cil-plus" class="my-0 mb-1 mr-1" /> Tambah
          </CButton>
        </div>
        <div v-else class="text-center py-4">
          <h5 class="h5 text-base pb-2 text-red-400">
            LHA tidak memiliki temuan
          </h5>
          <CButton
            v-if="valueLha.isTemuanNihil == 0"
            class="px-4"
            color="info"
            @click="$emit('on-add-temuan', valueLha)"
          >
            Tambah Temuan
          </CButton>
        </div>
      </CCol>
      <CCardBody v-if="valueTemuan">
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
          <template #nomorPenyebab="{ item }">
            <td
              v-if="clickableRows"
              class="text-blue-500 uppercase hover:text-blue-700"
              style="cursor: pointer"
              @click="clickedRow(item)"
            >
              {{ item.nomorPenyebab }}
            </td>
            <td v-else>
              {{ item.nomorPenyebab }}
            </td>
          </template>

          <template #actions="{ item }">
            <td v-if="statusReview">No Actions</td>
            <td v-else class="py-2 d-flex justify-content-center">
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
  name: 'TablePenyebab',
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
    /* props ini dapat dari query params parent */
    filterlha: {
      type: String,
      default: null,
    },
    /* props ini dapat dari query params */
    filtertemuan: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      valueLha: '',
      optionsLha: [],
      valueTemuan: '',
      optionsTemuan: [],
    };
  },
  computed: {
    statusReview: function () {
      return Number(this.valueLha.flagKirim) % 2 == 0 ? false : true;
    },
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
          (data) => data.id == this.filterlha
        )[0];
      } else {
        /** execute ketika click */
        this.valueLha = this.optionsLha[0];
      }
      /** lempar value lha ke parent */
      this.$emit('on-select-lha', this.valueLha);

      await this.loadTemuan({ id: this.valueLha.id });

      if (this.optionsTemuan.length > 0 && this.filtertemuan) {
        /** execute ketika lha punya temuan dan setelah create dan edit */
        this.valueTemuan = this.optionsTemuan.filter(
          (data) => data.id == this.filtertemuan
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
        this.valueTemuan = '';
        /* lempar temuan ke parent */
        this.$emit('on-select-temuan', 'empty');
      }
    },

    /**
     * Method ini dipanggil ketika user memilih LHA
     */
    async onSelectLha(val) {
      /* lempar value lha yang dipilih ke parent */
      this.$emit('on-select-lha', val);

      await this.loadTemuan({ id: val.id });

      if (this.optionsTemuan.length > 0) {
        /* execute ketika lha memiliki temuan */
        this.valueTemuan = this.optionsTemuan[0];
        /* lempar value temuan ke parent */
        this.onSelectTemuan();
      } else {
        /* execute ketika lha tidak memiliki temuan */
        this.valueTemuan = '';
        /* lempar value temuan ke parent */
        this.$emit('on-select-temuan', 'empty');
      }
    },

    /**
     * Method ini dipanggil ketika user select temuan setelah select lha
     * atau dipanggil saat click menu dan setelah create & update
     */
    onSelectTemuan(val) {
      if (val) {
        /* lempar value temuan ke parent, ini jika select temuan menggunakan select*/
        this.$emit('on-select-temuan', val);
      } else {
        /* execute ketika selectnya tidak menggunakan autocomplete */
        this.$emit('on-select-temuan', this.valueTemuan);
      }
    },

    viewSelectSearchLha({ id, nomorLha, bidangObrik }) {
      return `${nomorLha} - ${bidangObrik}`;
    },
    viewSelectSearchTemuan({
      id,
      nomorTemuan,
      subKelompokTemuan,
      kodeSubKelompokTemuan,
    }) {
      return `${nomorTemuan} - (${kodeSubKelompokTemuan}) ${subKelompokTemuan} `;
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