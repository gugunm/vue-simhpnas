<template>
  <div>
    <CRow class="px-3">
      <CCol
        class="px-0"
        lg="6"
        sm="12"
      >
        <h4 class="my-0 mt-1">
          Master Unit Kerja
        </h4>
      </CCol>
      <CCol
        class="px-0 text-right"
        lg="6"
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
          />Tambah Unit Kerja
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
        >
          <template #actions="{item}">
            <td class="py-2 d-flex justify-content-around">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="openModalDetails(item)"
              >
                <font-awesome-icon :icon="['fas', 'eye']" />
                <!-- <CIcon name="cil-lightbulb" /> -->
              </CButton>
              <CButton
                color="warning"
                variant="outline"
                square
                size="sm"
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
    <CModal
      v-if="selectedItem != null"
      :title="'Detail ' + selectedItem.namaUnit"
      :show.sync="isShowModal"
      size="lg"
      add-content-classes="modal-master-detail"
    >
      <template>
        <CCardBody>
          <CForm>
            <CInput
              label="ID Unit"
              :value="selectedItem.id"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Nama Unit"
              :value="selectedItem.namaUnit"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Nama Pimpinan"
              :value="selectedItem.namaPimpinan"
              horizontal
              :readonly="true"
            />
            <CInput
              label="NIP Pimpinan"
              :value="selectedItem.nipPimpinan"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Alamat"
              :value="selectedItem.alamat"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Provinsi"
              :value="selectedItem.provinsi"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Kab/Kota"
              :value="selectedItem.kabkot"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Kecamatan"
              :value="selectedItem.kecamatan"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Kelurahan"
              :value="selectedItem.kelurahan"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Jumlah Obrik"
              :value="selectedItem.jumlahObrik"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Jumlah Obrik Bersih"
              :value="selectedItem.jumlahObrikBersih"
              horizontal
              :readonly="true"
            />
            <CInput
              label="Telpon"
              :value="selectedItem.telpon"
              horizontal
              :readonly="true"
            />
          </CForm>
        </CCardBody>
      </template>
      <footer>
        <modal-footer>
          <button>OKEE</button>
        </modal-footer>
      </footer>
    </CModal>
  </div>
</template>

<script>
const fields = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'namaUnit',
    label: 'Nama Unit',
  },
  {
    key: 'namaPimpinan',
    label: 'Nama Pimpinan',
  },
  {
    key: 'provinsi',
    label: 'Provinsi',
  },
  {
    key: 'kabkot',
    label: 'Kab/Kota',
  },
  {
    key: 'jumlahObrik',
    label: 'Jumlah Obrik',
  },
  {
    key: 'actions'
  }
]

export default {
  name: 'AdvancedTables',
  data () {
    return {
      unitKerja: null,
      fields,
      isShowModal: false,
      selectedItem: null
    }
  },
  computed: {
    items() {
      return this.unitKerja ? this.unitKerja.map((item, idx) => { return {...item, idx}}) : [];
    }
  },
  created () {
    this.loadUnitKerja();
  },
  methods: {
    openModalDetails(item) {
      this.selectedItem = item;
      this.isShowModal = true;
    },
    async loadUnitKerja(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_unit_kerja/loadUnitKerja', {
          forceRefresh: refresh,
        });
        this.unitKerja = this.$store.getters['m_unit_kerja/unitKerja'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  }
}
</script>

<style>
.modal-master-detail .form-control[readonly]{
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
