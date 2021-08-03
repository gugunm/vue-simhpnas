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
          <CIcon name="cil-lightbulb" />&nbsp;Tambah Unit Kerja
        </CButton>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
        <!-- :column-filter="{ external: true, lazy: true }"
        :column-filter-value.sync="columnFilterValue" -->
        <CDataTable
          :items="loadedItems ? loadedItems : unitKerja.slice(0, itemPerPage)"
          :fields="fields"
          :table-filter="{ external: true, lazy: true }"
          :table-filter-value.sync="tableFilterValue"
          :sorter="{ external: true, resetable: true }"
          :sorter-value.sync="sorterValue"
          :items-per-page="itemPerPage"
          :active-page="1"
          hover
          :loading="loading"
          pagination
        />
        <!-- <CPagination
          v-show="pages > 1"
          :pages="pages"
          :active-page.sync="activePage"
        /> -->
        <!-- :column-filter-value="columnFilterValue" -->
        <!-- <CDataTable
          ref="externalAgent"
          class="d-none"
          :items="unitKerja.slice(0)"
          :fields="fields"
          :table-filter-value="tableFilterValue"
          :sorter-value="sorterValue"
          :items-per-page="itemPerPage"
          :active-page="activePage"
          hover
        /> -->
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
const fields = [
  {
    key: 'id',
    label: 'ID',
    // _style: 'width:1%'
  },
  {
    key: 'namaUnit',
    label: 'Nama Unit',
    // _style: 'width:1%'
  },
  {
    key: 'namaPimpinan',
    label: 'Nama Pimpinan',
    // _style: 'width:1%'
  },
  {
    key: 'provinsi',
    label: 'Provinsi',
    // _style: 'width:1%'
  },
  {
    key: 'kabkot',
    label: 'Kab/Kota',
    // _style: 'width:1%'
  },
  {
    key: 'jumlahObrik',
    label: 'Jumlah Obrik',
    // _style: 'width:1%'
  },
  {
    key: 'jumlahObrikBersih',
    label: 'Jumlah Obrik Bersih',
    // _style: 'width:1%'
  }
]

export default {
  name: 'BackendTable',
  data () {
    return {
      // columnFilterValue: {},
      // loadedItems: unitKerja.slice(0, this.itemPerPage),
      unitKerja: null,
      fields,
      loadedItems: null,
      sorterValue: { column: null, asc: true },
      tableFilterValue: '',
      activePage: 1,
      itemPerPage: 1,
      loading: false,
      pages: 3
    }
  },
  computed: {
    reloadParams () {
      return [
        // this.columnFilterValue,
        this.sorterValue,
        this.tableFilterValue,
        this.activePage
      ]
    }
  },
  watch: {
    reloadParams () {
      this.onTableChange()
    }
  },
  created () {
    this.loadUnitKerja();
  },
  methods: {
    onTableChange () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        const agent = this.$refs.externalAgent
        this.loadedItems = agent.currentItems
        this.pages = Math.ceil(agent.sortedItems.length / 5)
      }, 1000)
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

