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
import MasterTable from '@/components/MasterTable';

import mixin from './mixin';

import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

export default {
  name: 'MasterUnitKerja',
  components: {
    MasterTable,
    ConfirmModal,
  },
  mixins: [mixin],
  data() {
    return {
      items: '',
      fields: [],
      isDeleteConfirm: false,
      idToDelete: null,
    };
  },
  created() {
    this.loadUnitKerja();

    this.fields = [
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
    ];
    if (localStorage.level == 0 || localStorage.level == 1) {
      this.fields = [
        ...this.fields,
        {
          key: 'actions',
          _style: 'width: 15%',
        },
      ];
    }
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
    async loadUnitKerja(refresh = false) {
      // this.loading = true;
      try {
        await this.$store.dispatch('m_unit_kerja/loadUnitKerja', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_unit_kerja/unitKerja'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      // this.loading = false;
    },
  },
};
</script>


