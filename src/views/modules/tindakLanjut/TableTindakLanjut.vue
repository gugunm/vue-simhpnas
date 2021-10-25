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
              <div class="flex justify-content-center">
                <CRow>
                  <CCol>
                    <CButton
                      :color="isTlSent(item) ? 'dark' : 'primary'"
                      variant="outline"
                      square
                      size="sm"
                      class="inline-block m-1"
                      :disabled="isTlSent(item)"
                      @click="onOpenSend(item)"
                    >
                      <span v-if="isTlSent(item)">Terkirim</span>
                      <span v-else>Kirim</span>
                    </CButton>
                  </CCol>
                </CRow>
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
                  :disabled="!statusAdmin(item)"
                  @click="onUnPostTl(item)"
                >
                  <span>Unlock</span>
                </CButton>
              </div>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
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
import axios from 'axios';
import { API_URL } from '@/utils/api.js';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import Multiselect from 'vue-multiselect';
import mixin from './mixin';

export default {
  name: 'TableTindakLanjut',
  components: {
    Multiselect,
    ConfirmModal,
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
      isOpenSend: false,
      isOpenPosting: false,
      isOpenUnPost: false,
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
    'on-load-tl',
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

    viewSelectSearchRekomendasi({
      id,
      nomorRekomendasi,
      kodeSubKelompokRekomendasi,
      subKelompokRekomendasi,
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
        method: 'PATCH',
        baseURL: API_URL,
        url: `/api/kirimtl/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem('api_token'),
        },
      });
      if (response.status == 200) {
        this.isOpenSend = false;
        this.toastSuccess('Berhasil mengirim laporan');
        this.selectedItem = null;
        this.$emit('on-load-tl');
      } else {
        this.toastError('Terjadi kesalahan saat mengirim laporan');
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
        method: 'PATCH',
        baseURL: API_URL,
        url: `/api/adminactionacctl/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem('api_token'),
        },
      });
      if (response.status == 200) {
        this.isOpenPosting = false;
        this.toastSuccess('Berhasil memposting TL');
        this.selectedItem = null;
        this.$emit('on-load-tl');
      } else {
        this.toastError('Terjadi kesalahan saat posting laporan');
      }
    },

    async actionUnPostTl() {
      const response = await axios({
        method: 'PATCH',
        baseURL: API_URL,
        url: `/api/adminactionunpostingtl/${this.selectedItem.id}`,
        params: {
          token: localStorage.getItem('api_token'),
        },
      });
      if (response.status == 200) {
        this.isOpenUnPost = false;
        this.toastSuccess('Berhasil membuka TL');
        this.selectedItem = null;
        this.$emit('on-load-tl');
      } else {
        this.toastError('Terjadi kesalahan saat membuka laporan');
      }
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