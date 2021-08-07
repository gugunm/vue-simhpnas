<template>
  <div>
    <master-table
      title="Master Temuan"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailTemuan"
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
    label: 'Deskripsi Jenis Temuan',
    _style: 'width: 70%',
  },
  {
    key: 'actions',
    _style: 'width: 15%',
  },
];

export default {
  name: 'MasterJenisTemuan',
  components: { MasterTable },
  data() {
    return {
      jenisTemuan: null,
      fields,
    };
  },
  computed: {
    items() {
      return this.jenisTemuan
        ? this.jenisTemuan.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  created() {
    this.loadJenisTemuan();
  },
  methods: {
    async loadJenisTemuan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadJenisTemuan', {
          forceRefresh: refresh,
        });
        this.jenisTemuan = this.$store.getters['m_temuan/jenisTemuan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailTemuan(item) {
      this.$router.push({
        name: 'mkelompoktemuan',
        params: { idJenisTemuan: item.id },
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
