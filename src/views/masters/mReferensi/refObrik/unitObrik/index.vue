<template>
  <div>
    <master-table
      top-title="Master Referensi"
      title="Unit Obrik"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailUnitObrik"
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
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import mixin from './mixin';

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
    ConfirmModal,
  },
  mixins: [mixin],
  data() {
    return {
      fields: [],
      items: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadRefUnitObrik();

    this.fields = [
      {
        key: 'id',
        label: 'Kode',
        _style: 'width: 15%',
      },
      {
        key: 'deskripsi',
        label: 'Deskripsi Unit Obrik',
        _style: 'width: 70%',
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
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-obrik',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-obrik',
        params: { idUnitObrik: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('m_ref_unit_obrik/deleteUnitObrikById', {
          idUnitObrik: this.idToDelete,
        });
        this.isDeleteConfirm = false;
        this.loadRefUnitObrik();
        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
      } catch (error) {
        this.toastError(error.message);
      }
    },
    async loadRefUnitObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefUnitObrik', {
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_ref_unit_obrik/refUnitObrik'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    showDetailUnitObrik(item) {
      this.$router.push({
        name: 'master-ref-bidang-obrik',
        params: { idUnitObrik: item.id, deskripsi: item.deskripsi },
      });
    },
  },
};
</script>
