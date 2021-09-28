<template>
  <div>
    <master-table
      top-title="Master"
      title="Sub Unit Audit"
      :desc-title="'pada ' + descUnitAudit"
      :items="items"
      :fields="fields"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
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
    label: 'Deskripsi Sub Unit Audit',
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
    idUnitAudit: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      refUnitAudit: null,
      fields,
      descUnitAudit: null,
    };
  },
  computed: {
    items() {
      return this.refUnitAudit
        ? this.refUnitAudit.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefSubUnitAudit();
    this.loadDescBidangObrik();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-sub-unit-audit',
        params: { idSubUnitAudit: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-sub-unit-audit',
      });
    },
    async loadRefSubUnitAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefSubUnitAudit', {
          idUnitAudit: this.idUnitAudit,
          forceRefresh: refresh,
        });
        this.refUnitAudit =
          this.$store.getters['m_ref_unit_audit/refSubUnitAudit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadDescBidangObrik() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/unitaudit/${this.idUnitAudit}`,
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

      this.descUnitAudit = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
