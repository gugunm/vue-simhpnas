<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Unit Audit"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-delete-button="false"
      @clicked-row="showDetailUnitAudit"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
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
    _style: 'width: 75%',
  },
  {
    key: 'actions',
    _style: 'width: 10%',
  },
];

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
  },
  data() {
    return {
      fields,
      items: null,
    };
  },
  async mounted() {
    await this.loadRefUnitAudit();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-unit-audit',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-unit-audit',
        params: { idUnitAudit: item.id },
      });
    },
    async loadRefUnitAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefUnitAudit', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_ref_unit_audit/refUnitAudit'];
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
