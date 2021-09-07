<template>
  <div>
    <master-table
      top-title="Master"
      title="Unit Kerja"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="false"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-delete-modal="openDeleteModal"
    />
  </div>
</template>

<script>
import MasterTable from '@/views/components/MasterTable';
import { loadItemsComponent } from './fetchApiFunctions';

const fields = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'namaUnit',
    label: 'Nama Unit',
  },
  {
    key: 'namaPimpinan',
    label: 'Nama Pimpinan',
  },
  {
    key: 'provinsi',
    label: 'Provinsi',
  },
  {
    key: 'kabkot',
    label: 'Kab/Kota',
  },
  {
    key: 'jumlahObrik',
    label: 'Jumlah Obrik',
  },
  {
    key: 'actions',
    label: 'Delete',
  },
];

export default {
  name: 'MasterUnitKerja',
  components: {
    MasterTable,
  },
  data() {
    return {
      items: '',
      fields,
    };
  },
  created() {
    this.loadUnitKerja();
  },
  methods: {
    openDeleteModal(id) {
      this.isOpenModal = true;
    },
    openDetail(item) {
      this.$router.push({
        name: 'master-unit-kerja-detail',
        params: { idUnitKerja: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'master-unit-kerja-create',
      });
    },
    loadUnitKerja(refresh = false) {
      loadItemsComponent({
        refresh: refresh,
        self: this,
        storeAction: 'm_unit_kerja/loadUnitKerja',
        storeGetter: 'm_unit_kerja/unitKerja',
      });
    },
  },
};
</script>


