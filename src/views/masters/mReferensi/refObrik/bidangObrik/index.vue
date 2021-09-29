<template>
  <div>
    <master-table
      top-title="Master"
      title="Bidang Obrik"
      :desc-title="descUnitObrik"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      @clicked-row="showDetailBidangObrik"
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
    <back-button
      title="Kembali"
      to="/master-referensi/obrik"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';
import MasterTable from '@/views/components/MasterTable';
import BackButton from '@/views/components/BackButton';
import ConfirmModal from '@/views/components/ConfirmModal.vue';
import mixin from './mixin';

const fields = [
  {
    key: 'id',
    label: 'Kode',
    _style: 'width: 15%',
  },
  {
    key: 'deskripsi',
    label: 'Deskripsi Bidang Obrik',
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
    BackButton,
    ConfirmModal,
  },
  mixins: [mixin],
  props: {
    idUnitObrik: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      fields,
      items: null,
      descUnitObrik: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    await this.loadRefBidangObrik();
    await this.loadDescUnitObrik();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'master-create-ref-bidang-obrik',
        params: { idUnitObrik: this.idUnitObrik },
      });
    },

    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-bidang-obrik',
        params: { idBidangObrik: item.id, idUnitObrik: this.idUnitObrik },
      });
    },

    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },

    async actionDelete() {
      try {
        await this.$store.dispatch('m_ref_unit_obrik/deleteBidangObrikById', {
          idBidangObrik: this.idToDelete,
        });
        this.isDeleteConfirm = false;
        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
        this.loadRefBidangObrik();
      } catch (error) {
        this.toastError(error.message);
      }
    },

    async loadRefBidangObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefBidangObrik', {
          idUnitObrik: this.idUnitObrik,
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_ref_unit_obrik/refBidangObrik'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    showDetailBidangObrik(item) {
      this.$router.push({
        name: 'master-ref-sub-bidang-obrik',
        params: { idBidangObrik: item.id, deskripsi: item.deskripsi },
      });
    },

    async loadDescUnitObrik() {
      const response = await axios({
        method: 'GET',
        baseURL: API_URL,
        url: `/api/unitobrik/${this.idUnitObrik}`,
        params: {
          token: localStorage.getItem('api_token'),
        },
      });

      if (response.status != 200) {
        const error = new Error(responseData.message || 'Failed to fetch data');
        throw error;
      }

      this.descUnitObrik = await response.data.diskripsi;
    },
  },
};
</script>

