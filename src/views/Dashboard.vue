<template>
  <div>
    <CRow class="mb-4">
      <CCol>
        <h3 class="h3">Halo, Selamat Datang</h3>
        <h6 class="h5 capitalize">
          {{ namaUnit }}
        </h6>
      </CCol>
    </CRow>
    <WidgetsDropdown :data="dashData" />
    <!-- <SamplePDF class="mb-4" /> -->
    <!-- <TpTiga /> -->
  </div>
</template>

<script>
import WidgetsDropdown from '@/components/Widgets/WidgetsDropdown.vue';
// import SamplePDF from '@/components/Reports/ReportLevel1.vue';
// import TpTiga from '@/components/Reports/TpTiga.vue';
import axios from 'axios';

export default {
  name: 'Dashboard',
  components: {
    WidgetsDropdown,
    // SamplePDF,
    // TpTiga,
  },
  data() {
    return {
      namaUnit: '',
      dashData: '',
    };
  },
  async mounted() {
    await this.loadDashboardData();

    const result = localStorage.getItem('namaUnit');
    this.namaUnit = result.toLowerCase();
  },
  methods: {
    async loadDashboardData() {
      const response = await axios({
        method: 'GET',
        baseURL: this.$apiAddress,
        url: '/api/dashboard',
        params: {
          token: localStorage.getItem('api_token'),
        },
      });

      if (response.status == 200) {
        this.dashData = await response.data;
      } else {
        this.toastError('Gagal load data dashboard');
      }
    },
  },
};
</script>
