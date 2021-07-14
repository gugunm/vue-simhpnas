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
          />&nbsp;Tambah Unit Kerja
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
          <template
            #actions
          >
            <td class="py-2 d-flex justify-content-around">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
              >
                <CIcon name="cil-lightbulb" />
              </CButton>
              <CButton
                color="warning"
                variant="outline"
                square
                size="sm"
              >
                <CIcon name="cil-pencil" />
              </CButton>
              <CButton
                color="danger"
                variant="outline"
                square
                size="sm"
              >
                <CIcon name="cil-trash" />
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
const items = [
    { id: "unit1", namaUnit: "Unit 1", namaPimpinan: "Nama Pimpinan", nipPimpinan: "199209162020121007", alamat: "Alamat 1", provinsi: "Provinsi Unit 1", kabkot: "Kabkot Unit 1", kecamatan: "Kecamatan Unit 1", kelurahan: "Kelurahan Unit 1", jumlahObrik: 20, jumlahObrikBersih: 20, telpon: "02134567890"},
    { id: "unit2", namaUnit: "Unit 2", namaPimpinan: "Nama Pimpinan 2", nipPimpinan: "199209162020121007", alamat: "Alamat 2", provinsi: "Provinsi Unit 2", kabkot: "Kabkot Unit 2", kecamatan: "Kecamatan Unit 2", kelurahan: "Kelurahan Unit 2", jumlahObrik: 20, jumlahObrikBersih: 20, telpon: "02134567890"},
    { id: "unit3", namaUnit: "Unit 3", namaPimpinan: "Nama Pimpinan 3", nipPimpinan: "199209162020121007", alamat: "Alamat 3", provinsi: "Provinsi Unit 3", kabkot: "Kabkot Unit 3", kecamatan: "Kecamatan Unit 3", kelurahan: "Kelurahan Unit 3", jumlahObrik: 20, jumlahObrikBersih: 20, telpon: "02134567890"},
    { id: "unit4", namaUnit: "Unit 4", namaPimpinan: "Nama Pimpinan 4", nipPimpinan: "199209162020121007", alamat: "Alamat 4", provinsi: "Provinsi Unit 4", kabkot: "Kabkot Unit 4", kecamatan: "Kecamatan Unit 4", kelurahan: "Kelurahan Unit 4", jumlahObrik: 20, jumlahObrikBersih: 20, telpon: "02134567890"},
    { id: "unit5", namaUnit: "Unit 5", namaPimpinan: "Nama Pimpinan 5", nipPimpinan: "199209162020121007", alamat: "Alamat 5", provinsi: "Provinsi Unit 5", kabkot: "Kabkot Unit 5", kecamatan: "Kecamatan Unit 5", kelurahan: "Kelurahan Unit 5", jumlahObrik: 20, jumlahObrikBersih: 20, telpon: "02134567890"},
    { id: "unit6", namaUnit: "Unit 6", namaPimpinan: "Nama Pimpinan 6", nipPimpinan: "199209162020121007", alamat: "Alamat 6", provinsi: "Provinsi Unit 6", kabkot: "Kabkot Unit 6", kecamatan: "Kecamatan Unit 6", kelurahan: "Kelurahan Unit 6", jumlahObrik: 20, jumlahObrikBersih: 20, telpon: "02134567890"},
]

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
      // items: items.map((item) => { return {...item}}),
      unitKerja: null,
      fields,
      details: [],
      collapseDuration: 0
    }
  },
  computed: {
    items() {
      return this.unitKerja ? this.unitKerja.map((item) => { return {...item}}) : [];
    }
  },
  created () {
    this.loadUnitKerja();
  },
  methods: {
    async loadUnitKerja(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('unit_kerja/loadUnitKerja', {
          forceRefresh: refresh,
        });
        this.unitKerja = this.$store.getters['unit_kerja/unitKerja'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  }
}
</script>
