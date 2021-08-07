<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Penyebab"
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
    label: 'Deskripsi Penyebab',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'MasterPenyebab',
  components: {
    MasterTable,
  },
  data() {
    return {
      penyebab: null,
      fields,
      selectedItem: null,
    };
  },
  computed: {
    items() {
      return this.penyebab
        ? this.penyebab.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadPenyebab();
  },
  methods: {
    async loadPenyebab(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_penyebab/loadPenyebab', {
          forceRefresh: refresh,
        });
        this.penyebab = this.$store.getters['m_penyebab/penyebab'];
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
