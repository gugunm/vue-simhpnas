<template>
  <div>
    <master-table
      top-title="Master"
      title="Bidang Obrik"
      :desc-title="descUnitObrik"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailBidangObrik"
    />
    <back-button title="Kembali" />
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';
import MasterTable from '@/views/components/MasterTable';
import BackButton from '@/views/components/BackButton';

const fields = [
  {
    key: 'id',
    label: 'Kode',
    _style: 'width: 15%',
  },
  {
    key: 'deskripsi',
    label: 'Deskripsi Bidang Obrik',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
    BackButton,
  },
  props: {
    idUnitObrik: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      refBidangObrik: null,
      descUnitObrik: null,
      fields,
      selectedItem: null,
    };
  },
  computed: {
    items() {
      return this.refBidangObrik
        ? this.refBidangObrik.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
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
        this.refBidangObrik =
          this.$store.getters['m_ref_unit_obrik/refBidangObrik'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailBidangObrik(item) {
      this.$router.push({
        name: 'master-ref-sub-bidang-obrik',
        params: { idBidangObrik: item.id, deskripsi: item.deskripsi },
      });
    },
    async loadDescUnitObrik() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/unitobrik/${this.idUnitObrik}`,
        params: {
          token: localStorage.getItem('api_token'),
        },
      });

      if (response.status != 200) {
        const error = new Error(
          responseData.message || 'Failed to fetch data unit kerja.'
        );
        throw error;
      }

      this.descUnitObrik = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
