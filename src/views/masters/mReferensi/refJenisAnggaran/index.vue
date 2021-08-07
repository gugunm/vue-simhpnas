<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Jenis Anggaran"
      :items="items"
      :fields="fields"
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
    label: 'Deskripsi Jenis Anggaran',
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
      refJenisAnggaran: null,
      fields,
    };
  },
  computed: {
    items() {
      return this.refJenisAnggaran
        ? this.refJenisAnggaran.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefJenisAnggaran();
  },
  methods: {
    async loadRefJenisAnggaran(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch(
          'm_ref_jenis_anggaran/loadRefJenisAnggaran',
          {
            forceRefresh: refresh,
          }
        );
        this.refJenisAnggaran =
          this.$store.getters['m_ref_jenis_anggaran/refJenisAnggaran'];
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
