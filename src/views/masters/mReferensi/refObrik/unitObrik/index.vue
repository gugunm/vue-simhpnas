<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Unit Obrik"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailUnitObrik"
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
    label: 'Deskripsi Unit Obrik',
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
      refUnitObrik: null,
      fields,
      selectedItem: null,
    };
  },
  computed: {
    items() {
      return this.refUnitObrik
        ? this.refUnitObrik.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefUnitObrik();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-obrik',
        params: { idUnitObrik: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-obrik',
      });
    },
    async loadRefUnitObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefUnitObrik', {
          forceRefresh: refresh,
        });
        this.refUnitObrik =
          this.$store.getters['m_ref_unit_obrik/refUnitObrik'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailUnitObrik(item) {
      this.$router.push({
        name: 'master-ref-bidang-obrik',
        params: { idUnitObrik: item.id, deskripsi: item.deskripsi },
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
