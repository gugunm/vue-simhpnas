<template>
  <div>
    <CRow class="px-3">
      <CCol
        class="px-0"
        lg="6"
        sm="12"
      >
        <h4 class="my-0 mt-1">
          Master Sub Kelompok Temuan
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
          />Tambah Sub Kelompok Temuan
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
const fields = [
  {
    key: 'id',
    label: 'ID Jenis Temuan',
    _style: "width: 15%"
  },
  {
    key: 'deskripsi',
    _style: "width: 55%"
  },
  {
    key: 'saran',
    label: 'Rekomendasi',
    _style: "width: 20%"
  },
  {
    key:'actions',
    _style: "width: 10%",
  }
]

export default {
  name: 'AdvancedTables',
  props: {
    idKlpTemuan: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      subKelompokTemuan: null,
      fields,
      selectedItem: null
    }
  },
  computed: {
    items() {
      return this.subKelompokTemuan ? this.subKelompokTemuan.map((item, idx) => { return {...item, idx}}) : [];
    }
  },
  created () {
    this.loadSubKelompokTemuan();
  },
  methods: {
    async loadSubKelompokTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadSubKelompokTemuan', {
          idKlpTemuan: this.idKlpTemuan,
          forceRefresh: refresh,
        });
        this.subKelompokTemuan = this.$store.getters['m_temuan/subKelompokTemuan'];
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
