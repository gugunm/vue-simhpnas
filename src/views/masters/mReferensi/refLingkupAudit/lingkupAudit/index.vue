<template>
  <div>
    <master-table
      top-title="Data Group"
      title="Lingkup Audit"
      :desc-title="deskripsi"
      :items="items"
      :fields="fields"
    />
    <back-button title="Kembali" />
  </div>
</template>

<script>
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
    deskripsi: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      refLingkupAudit: null,
      fields,
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
  },
  methods: {
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
  },
};
</script>

<style>
.modal-master-detail .form-control[readonly] {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
