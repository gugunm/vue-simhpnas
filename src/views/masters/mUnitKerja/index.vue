<template>
  <div>
    <master-table
      top-title="Master"
      title="Unit Kerja"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
    />
    <confirm-modal
      v-model="isDeleteConfirm"
      title="Hapus data"
      msg="Apakah anda yakin akan menghapus data ini?"
      @close-modal="isDeleteConfirm = false"
      @confirm-ok="actionDelete"
    />
  </div>
</template>

<script>
import MasterTable from '@/views/components/MasterTable';
import { loadItemsComponent } from './fetchApiFunctions';

import ConfirmModal from '../../components/ConfirmModal.vue';

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
    label: 'Actions',
  },
];

export default {
  name: 'MasterUnitKerja',
  components: {
    MasterTable,
    ConfirmModal,
  },
  data() {
    return {
      items: '',
      fields,
      isDeleteConfirm: false,
      idToDelete: null,
    };
  },
  created() {
    this.loadUnitKerja();
  },
  methods: {
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_unit_kerja/deleteUnitKerjaById', {
          idUnitKerja: this.idToDelete,
        });
        this.isDeleteConfirm = false;
        this.loadUnitKerja();
        this.$toast.open({
          message: `Berhasil menghapus data dengan ID ${this.idToDelete}`,
          type: 'success',
          position: 'top-right',
          duration: 3000,
        });
      } catch (error) {
        this.$toast.open({
          message: error.message,
          type: 'error',
          position: 'top-right',
          duration: 3000,
        });
      }
    },
    openDetail(item) {
      this.$router.push({
        name: 'master-unit-kerja-detail',
        params: { idUnitKerja: item.id },
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-unit-kerja-edit',
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


