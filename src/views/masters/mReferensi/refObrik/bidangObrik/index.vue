<template>
  <div>
    <CRow class="px-3">
      <CCol
        class="px-0"
        lg="8"
        sm="12"
      >
        <h4 class="my-0 mb-3">
          Bidang Obrik pada {{ descUnitObrik }}
        </h4>
      </CCol>
      <CCol
        class="px-0 text-right"
        lg="4"
        sm="12"
      >
        <CButton
          color="primary"
          class="mb-3"
        >
          <CIcon
            name="cil-plus"
            size="lg"
            class="my-0 mb-1 mr-2"
          />Tambah Bidang Obrik
        </CButton>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
        <CDataTable
          :items="items"
          :fields="fields"
          column-filter
          table-filter
          items-per-page-select
          :items-per-page="5"
          hover
          sorter
          pagination
          clickable-rows
          @row-clicked="showDetailBidangObrik"
        >
          <!-- <template #actions="{item}"> -->
          <template #actions>
            <td class="py-2 d-flex justify-content-center">
              <CButton
                color="warning"
                variant="outline"
                square
                size="sm"
                class="mr-3"
              >
                <font-awesome-icon :icon="['fas', 'pen']" />
                <!-- <CIcon name="cil-pencil" /> -->
              </CButton>
              <CButton
                color="danger"
                variant="outline"
                square
                size="sm"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']" />
                <!-- <CIcon name="cil-trash" /> -->
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <CButton
      color="primary"
      class="mb-3"
      @click="$router.go(-1)"
    >
      <font-awesome-icon
        class="mr-1"
        :icon="['fas', 'chevron-left']"
      /> Kembali
    </CButton>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';

const fields = [
  {
    key: 'id',
    label: 'ID KabKot',
    _style: "width: 15%"
  },
  {
    key: 'deskripsi',
    _style: "width: 70%"
  },
  {
    key:'actions',
    _style: "width: 15%",
  }
]

export default {
  name: 'AdvancedTables',
  props: {
    idUnitObrik: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      refBidangObrik: null,
      descUnitObrik: null,
      fields,
      selectedItem: null,
    }
  },
  computed: {
    items() {
      return this.refBidangObrik ? this.refBidangObrik.map((item, idx) => { return {...item, idx}}) : [];
    }
  },
  created () {
    this.loadRefBidangObrik();
    this.loadDescUnitObrik();
  },
  methods: {
    async loadRefBidangObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefBidangObrik', {
          idUnitObrik: this.idUnitObrik,
          forceRefresh: refresh,
        });
        this.refBidangObrik = this.$store.getters['m_ref_unit_obrik/refBidangObrik'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailBidangObrik(item) {
      this.$router.push({ name: 'master-ref-sub-bidang-obrik', params: { idBidangObrik: item.id, deskripsi: item.deskripsi } })
    },
    async loadDescUnitObrik(){
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/unitobrik/${this.idUnitObrik}`,
        params: {
          token: localStorage.getItem('api_token')
        },
      })

      if (response.status != 200) {
        const error = new Error(
          responseData.message || 'Failed to fetch data unit kerja.'
        );
        throw error;
      }

      this.descUnitObrik = await response.data.diskripsi
    }
  }
}
</script>

<style>
.modal-master-detail .form-control[readonly]{
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
