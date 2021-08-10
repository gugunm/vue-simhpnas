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
    <CModal
      v-if="selectedItem && modalMode == 'view'"
      add-content-classes="modal-master-detail"
      :title="'Detail ' + selectedItem.namaUnit"
      :show.sync="isOpenModal"
      size="lg"
    >
      <form-unit-kerja
        :mode="modalMode"
        :selected-item="selectedItem"
        :is-show-modal="isOpenModal"
      />
      <template #footer>
        <div />
      </template>
    </CModal>
    <!-- Form Create -->
    <CModal
      v-if="optionsWilayah.provinsi && modalMode == 'create'"
      :close-on-backdrop="false"
      add-content-classes="modal-master-detail"
      title="Create Unit Kerja"
      :show.sync="isOpenModal"
      size="lg"
    >
      <form-unit-kerja
        :mode="modalMode"
        :is-show-modal="isOpenModal"
        :options-provinsi="optionsWilayah.provinsi"
      />
      <template #footer>
        <modal-footer
          title-btn1="Cancel"
          title-btn2="Submit"
          @clicked-btn1="isOpenModal = false"
        />
      </template>
    </CModal>
    <!-- Form Edit -->
    <CModal
      v-if="selectedItem && modalMode == 'edit'"
      :close-on-backdrop="false"
      add-content-classes="modal-master-detail"
      title="Edit Unit Kerja"
      :show.sync="isOpenModal"
      size="lg"
    >
      <form-unit-kerja
        :mode="modalMode"
        :selected-item="selectedItem"
        :is-show-modal="isOpenModal"
      />
      <template #footer>
        <modal-footer
          title-btn1="Cancel"
          title-btn2="Submit Edit"
          @clicked-btn1="isOpenModal = false"
        />
      </template>
    </CModal>
  </div>
</template>

<script>
import MasterTable from '@/views/components/MasterTable';
import FormUnitKerja from './FormUnitKerja.vue';
import ModalFooter from './ModalFooter.vue';

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
    ModalFooter,
  },
  data() {
    return {
      unitKerja: null,
      fields,
      selectedItem: '',
      modalMode: '',
      isOpenModal: false,
      optionsWilayah: {
        provinsi: '',
        kabkot: '',
        kecamatan: '',
        kelurahan: '',
      },
    };
  },
  computed: {
    items() {
      return this.unitKerja
        ? this.unitKerja.map((item, idx) => {
            return { ...item, idx };
          })
        : [];
    },
  },
  watch: {
    // whenever question isShowEditModal, this function will run
    isOpenModal: function (newStatus, oldStatus) {
      if (newStatus === false) {
        this.selectedItem = '';
      }
    },
  },
  created() {
    this.loadUnitKerja();
    this.loadProvinsi();
    this.loadKabkot();
  },
  methods: {
    openViewModal(item) {
      this.modalMode = 'view';
      this.selectedItem = item;
      this.isOpenModal = true;
    },
    openCreateModal() {
      this.modalMode = 'create';
      this.selectedItem = '';
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
    async loadUnitKerja(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_unit_kerja/loadUnitKerja', {
          forceRefresh: refresh,
        });
        this.unitKerja = this.$store.getters['m_unit_kerja/unitKerja'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadProvinsi(refresh = false) {
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefProvinsi', {
          forceRefresh: refresh,
        });
        this.optionsWilayah.provinsi =
          this.$store.getters['m_ref_wilayah/refProvinsi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    async loadKabkot(refresh = false) {
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefKabkot', {
          idProvinsi: this.idProvinsi,
          forceRefresh: refresh,
        });
        this.optionsKabkot = this.$store.getters['m_ref_wilayah/refKabkot'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  },
};
</script>


