<template>
  <div>
    <master-table
      top-title="Master"
      title="Rekomendasi"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailRekomendasi"
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
    label: 'Deskripsi Rekomendasi',
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
      klpRekomendasi: null,
      fields,
    };
  },
  computed: {
    items() {
      return this.klpRekomendasi
        ? this.klpRekomendasi.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadKlpRekomendasi();
  },
  methods: {
    async loadKlpRekomendasi(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_rekomendasi/loadKlpRekomendasi', {
          forceRefresh: refresh,
        });
        this.klpRekomendasi =
          this.$store.getters['m_rekomendasi/klpRekomendasi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailRekomendasi(item) {
      this.$router.push({
        name: 'master-sub-klp-rekomendasi',
        params: { idKlpRekomendasi: item.id, deskripsi: item.deskripsi },
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
