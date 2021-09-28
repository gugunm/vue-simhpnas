<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Jenis Obrik"
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
    label: 'Deskripsi Jenis Obrik',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'AdvancedTables',
  components: { MasterTable },
  data() {
    return {
      refJenisObrik: null,
      fields,
      selectedItem: null,
    };
  },
  computed: {
    items() {
      return this.refJenisObrik
        ? this.refJenisObrik.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefJenisObrik();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-jenis-obrik',
        params: { idJenisObrik: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-jenis-obrik',
      });
    },
    async loadRefJenisObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jenis_obrik/loadRefJenisObrik', {
          forceRefresh: refresh,
        });
        this.refJenisObrik =
          this.$store.getters['m_ref_jenis_obrik/refJenisObrik'];
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
