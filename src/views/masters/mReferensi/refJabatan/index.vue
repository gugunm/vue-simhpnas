<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Jabatan"
      :items="items"
      :fields="fields"
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
    label: 'Deskripsi Jabatan',
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
      refJabatan: null,
      fields,
    };
  },
  computed: {
    items() {
      return this.refJabatan
        ? this.refJabatan.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefJabatan();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-jabatan',
        params: { idJabatan: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-jabatan',
      });
    },
    async loadRefJabatan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jabatan/loadRefJabatan', {
          forceRefresh: refresh,
        });
        this.refJabatan = this.$store.getters['m_ref_jabatan/refJabatan'];
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
