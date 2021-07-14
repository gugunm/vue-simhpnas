<template>
  <CCard>
    <CCardBody>
      <CDataTable
        :items="items"
        :fields="fields"
        column-filter
        table-filter
        items-per-page-select
        :items-per-page="5"
        :loading="loading"
        hover
        sorter
        pagination
      >
        <!-- <template #status="{item}"> -->
        <template>
          <td>
            <span>A</span>
            <!-- <CBadge :color="getBadge(item.status)">
              {{ item.alamat }}
            </CBadge> -->
          </td>
        </template>
        <!-- <template #show_details="{item, index}">
          <td class="py-2">
            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(item, index)"
            >
              {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
            </CButton>
          </td>
        </template> -->
        <template #details="{item}">
          <CCollapse
            :show="Boolean(item._toggled)"
            :duration="collapseDuration"
          >
            <CCardBody>
              <CMedia :aside-image-props="{ height: 102 }">
                <h4>
                  {{ item.id }}
                </h4>
                <p class="text-muted">
                  User since: {{ item.alamat }}
                </p>
                <CButton
                  size="sm"
                  color="info"
                  class=""
                >
                  User Settings
                </CButton>
                <CButton
                  size="sm"
                  color="danger"
                  class="ml-1"
                >
                  Delete
                </CButton>
              </CMedia>
            </CCardBody>
          </CCollapse>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
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
  // {
  //   key: 'jumlahObrikBersih',
  //   label: 'Jumlah Obrik Bersih',
  // }
]

export default {
  name: 'AdvancedTables',
  data () {
    return {
      // items: unitKerja ? unitKerja.map((item, id) => { return {...item, id}}) : [],
      unitKerja: null,
      fields,
      details: [],
      collapseDuration: 0,
      loading: false,
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
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
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
