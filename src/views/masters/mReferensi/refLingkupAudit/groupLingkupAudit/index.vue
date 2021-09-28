<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Lingkup Audit"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailGroupLingkupAudit"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
    />
  </div>
</template>

<script>
import MasterTable from '@/views/components/MasterTable';
const fields = [
  {
    key: 'id',
    label: 'Kode',
    _style: 'width: 15%',
  },
  {
    key: 'deskripsi',
    label: 'Deskripsi Group Lingkup Audit',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'MasterGroupLingkupAudit',
  components: {
    MasterTable,
  },
  data() {
    return {
      refGroupLingkupAudit: null,
      fields,
    };
  },
  computed: {
    items() {
      return this.refGroupLingkupAudit
        ? this.refGroupLingkupAudit.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefGroupLingkupAudit();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-group-lingkup-audit',
        params: { idGroupLingkupAudit: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-group-lingkup-audit',
      });
    },
    async loadRefGroupLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch(
          'm_ref_lingkup_audit/loadRefGroupLingkupAudit',
          {
            forceRefresh: refresh,
          }
        );
        this.refGroupLingkupAudit =
          this.$store.getters['m_ref_lingkup_audit/refGroupLingkupAudit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailGroupLingkupAudit(item) {
      this.$router.push({
        name: 'master-ref-lingkup-audit',
        params: { idGroupLingkupAudit: item.id, deskripsi: item.deskripsi },
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
