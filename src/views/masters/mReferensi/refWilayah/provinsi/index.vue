<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Provinsi"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-add-button="false"
      @clicked-row="showDetailProvinsi"
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
    label: 'Nama Provinsi',
    _style: 'width: 70%',
  },
  // {
  //   key: 'actions',
  //   _style: 'width: 15%',
  // },
];

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
  },
  data() {
    return {
      refProvinsi: null,
      fields,
      selectedItem: null,
    };
  },
  computed: {
    items() {
      return this.refProvinsi
        ? this.refProvinsi.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadRefProvinsi();
  },
  methods: {
    async loadRefProvinsi(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefProvinsi', {
          forceRefresh: refresh,
        });
        this.refProvinsi = this.$store.getters['m_ref_wilayah/refProvinsi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailProvinsi(item) {
      this.$router.push({
        name: 'master-ref-wilayah-provinsi',
        params: { idProvinsi: item.id, deskripsi: item.deskripsi },
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
