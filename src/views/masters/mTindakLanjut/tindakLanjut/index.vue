<template>
  <div>
    <master-table
      top-title="Master Kelompok"
      title="Tindak Lanjut"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailTindakLanjut"
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
    label: 'Deskripsi Tindak Lanjut',
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
      klpTindakLanjut: null,
      fields,
    };
  },
  computed: {
    items() {
      return this.klpTindakLanjut
        ? this.klpTindakLanjut.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadKlpTindakLanjut();
  },
  methods: {
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-tl',
        params: { idKlpTindakLanjut: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-create-tl',
      });
    },
    async loadKlpTindakLanjut(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_tindak_lanjut/loadKlpTindakLanjut', {
          forceRefresh: refresh,
        });
        this.klpTindakLanjut =
          this.$store.getters['m_tindak_lanjut/klpTindakLanjut'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailTindakLanjut(item) {
      this.$router.push({
        name: 'master-sub-tl',
        params: { idKlpTindakLanjut: item.id, deskripsi: item.deskripsi },
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
