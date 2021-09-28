<template>
  <div>
    <master-table
      top-title="Data Group"
      title="Lingkup Audit"
      :desc-title="descGroupLingkupAudit.split(' ').slice(1,).join(' ')"
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
    label: 'Deskripsi Lingkup Audit',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'MasterLingkupAudit',
  components: {
    MasterTable,
    BackButton,
  },
  props: {
    idGroupLingkupAudit: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      refLingkupAudit: null,
      fields,
      descGroupLingkupAudit: null,
    };
  },
  computed: {
    items() {
      return this.refLingkupAudit
        ? this.refLingkupAudit.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefLingkupAudit();
    this.loadDescGroupLingkupAudit();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-lingkup-audit',
        params: { idLingkupAudit: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-lingkup-audit',
      });
    },
    async loadRefLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_lingkup_audit/loadRefLingkupAudit', {
          idGroupLingkupAudit: this.idGroupLingkupAudit,
          forceRefresh: refresh,
        });
        this.refLingkupAudit =
          this.$store.getters['m_ref_lingkup_audit/refLingkupAudit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadDescGroupLingkupAudit() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/grplingkupaudit/${this.idGroupLingkupAudit}`,
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

      this.descGroupLingkupAudit = await response.data.diskripsi;
    },
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
