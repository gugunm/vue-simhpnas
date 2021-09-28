<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Unit Audit"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailUnitAudit"
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
    label: 'Deskripsi Unit Audit',
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
  },
  data() {
    return {
      refUnitAudit: null,
      fields,
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
    this.loadRefUnitAudit();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-unit-audit',
        params: { idUnitAudit: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-unit-audit',
      });
    },
    async loadRefUnitAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefUnitAudit', {
          forceRefresh: refresh,
        });
        this.refUnitAudit =
          this.$store.getters['m_ref_unit_audit/refUnitAudit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailUnitAudit(item) {
      this.$router.push({
        name: 'master-ref-sub-unit-audit',
        params: { idUnitAudit: item.id, deskripsi: item.deskripsi },
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
