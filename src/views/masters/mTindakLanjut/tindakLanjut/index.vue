<template>
  <div>
    <CRow class="px-3">
      <CCol
        class="px-0"
        lg="6"
        sm="12"
      >
        <h4 class="my-0 mt-1">
          Master Tindak Lanjut
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
          />Tambah Tindak Lanjut
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
          @row-clicked="showDetailTindakLanjut"
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
  </div>
</template>

<script>
const fields = [
  {
    key: 'id',
    label: 'Kode',
    _style: 'width: 15%',
  },
  {
    key: 'deskripsi',
    label: 'Deskripsi Tindak Lanjut',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'AdvancedTables',
  data() {
    return {
      klpTindakLanjut: null,
      fields,
    };
  },
  computed: {
    items() {
      return this.klpTindakLanjut
        ? this.klpTindakLanjut.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadKlpTindakLanjut();
  },
  methods: {
    async loadKlpTindakLanjut(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_tindak_lanjut/loadKlpTindakLanjut', {
          forceRefresh: refresh,
        });
        this.klpTindakLanjut =
          this.$store.getters['m_tindak_lanjut/klpTindakLanjut'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailTindakLanjut(item) {
      this.$router.push({
        name: 'master-sub-tl',
        params: { idKlpTindakLanjut: item.id, deskripsi: item.deskripsi },
      });
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
