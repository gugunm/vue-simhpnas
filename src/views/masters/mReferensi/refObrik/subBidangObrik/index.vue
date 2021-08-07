<template>
  <div>
    <master-table
      top-title="Master"
      title="Sub Bidang Obrik"
      :desc-title="descBidangObrik"
      :items="items"
      :fields="fields"
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
    label: 'Deskripsi Sub Bidang Obrik',
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
    idBidangObrik: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      refSubBidangObrik: null,
      fields,
      descBidangObrik: null,
    };
  },
  computed: {
    items() {
      return this.refSubBidangObrik
        ? this.refSubBidangObrik.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefSubBidangObrik();
    this.loadDescBidangObrik();
  },
  methods: {
    async loadRefSubBidangObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefSubBidangObrik', {
          idBidangObrik: this.idBidangObrik,
          forceRefresh: refresh,
        });
        this.refSubBidangObrik =
          this.$store.getters['m_ref_unit_obrik/refSubBidangObrik'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadDescBidangObrik() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/bidangobrik/${this.idBidangObrik}`,
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

      this.descBidangObrik = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
