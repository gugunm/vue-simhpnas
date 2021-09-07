<template>
  <div>
    <master-table
      top-title="Master"
      title="Unit Kerja"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="openViewModal"
      @open-create-modal="openCreateModal"
      @open-edit-modal="openEditModal"
      @open-delete-modal="openDeleteModal"
    />
    <!-- Form View -->
    <form-unit-kerja
      v-if="modalMode == 'view'"
      :mode="modalMode"
      :modal-title="'Detail ' + selectedItem.namaUnit"
      :selected-item="selectedItem"
      :is-show-modal="isOpenModal"
      @toggle-modal="toggleModal"
    />
    <!-- Form Create and Edit -->
    <form-unit-kerja
      v-if="modalMode === 'create' || modalMode === 'edit'"
      :mode="modalMode"
      :modal-title="modalMode === 'create' ? 'Create New Data' : `Edit Data ${selectedItem.namaUnit}`"
      :is-show-modal="isOpenModal"
      :selected-item="selectedItem"
      @toggle-modal="toggleModal"
    />
  </div>
</template>

<script>
import MasterTable from '@/views/components/MasterTable';
import FormUnitKerja from './FormUnitKerja.vue';
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
  },
];

export default {
  name: 'MasterUnitKerja',
  components: {
    MasterTable,
    FormUnitKerja,
  },
  data() {
    return {
      items: null,
      fields,
      selectedItem: '',
      modalMode: '',
      isOpenModal: false,
      error: '',
    };
  },
  watch: {
    isOpenModal: function (newStatus, oldStatus) {
      if (newStatus === false && oldStatus === true) {
        this.selectedItem = '';
        this.modalMode = '';
      }
    },
  },
  created() {
    this.loadUnitKerja();
  },
  methods: {
    toggleModal(value) {
      if (value === false) {
        this.isOpenModal = true;
      } else {
        this.isOpenModal = false;
      }
    },
    openViewModal(item) {
      this.modalMode = 'view';
      this.selectedItem = item;
      this.isOpenModal = true;
    },
    openCreateModal() {
      this.modalMode = 'create';
      this.isOpenModal = true;
    },
    openEditModal(item) {
      this.modalMode = 'edit';
      this.selectedItem = item;
      this.isOpenModal = true;
    },
    openDeleteModal(id) {
      this.isOpenModal = true;
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


