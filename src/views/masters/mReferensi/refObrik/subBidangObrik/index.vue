<template>
  <div>
    <master-table
      top-title="Master"
      title="Sub Bidang Obrik"
      :desc-title="descBidangObrik"
      :items="items"
      :fields="fields"
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
      :to="`/master-referensi/obrik/bidang-obrik/${idBidangObrik.slice(0, 6)}`"
    />
  </div>
</template>

<script>
import axios from 'axios';
import MasterTable from './Table.vue';
import BackButton from '@/components/BackButton';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import mixin from './mixin';

export default {
  name: 'AdvancedTables',
  components: {
    MasterTable,
    BackButton,
    ConfirmModal,
  },
  mixins: [mixin],
  props: {
    idBidangObrik: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      fields: [],
      items: null,
      descBidangObrik: null,
      idToDelete: null,
      isDeleteConfirm: false,
    };
  },
  async mounted() {
    // load data sub bidang obrik
    await this.loadRefSubBidangObrik();
    // load desc bidang obrik - data diatasnya
    await this.loadDescBidangObrik();

    this.fields = [
      {
        key: 'id',
        label: 'Kode',
        _style: 'width: 15%',
      },
      {
        key: 'deskripsi',
        label: 'Deskripsi Sub Bidang Obrik',
        _style: 'width: 70%',
      },
    ];
    if (localStorage.level != 5 || localStorage.level != 6) {
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
    openEdit(item) {
      this.$router.push({
        name: 'master-edit-ref-sub-bidang-obrik',
        params: {
          idSubBidangObrik: item.id,
          idBidangObrik: this.idBidangObrik,
        },
      });
    },

    openCreate() {
      this.$router.push({
        name: 'master-create-ref-sub-bidang-obrik',
        params: {
          idBidangObrik: this.idBidangObrik,
        },
      });
    },

    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },

    async actionDelete() {
      try {
        await this.$store.dispatch(
          'm_ref_unit_obrik/deleteSubBidangObrikById',
          {
            idSubBidangObrik: this.idToDelete,
          }
        );
        this.isDeleteConfirm = false;
        this.toastSuccess(
          `Berhasil menghapus data dengan ID ${this.idToDelete}`
        );
        this.loadRefSubBidangObrik();
      } catch (error) {
        this.toastError(error.message);
      }
    },

    async loadRefSubBidangObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefSubBidangObrik', {
          idBidangObrik: this.idBidangObrik,
          forceRefresh: refresh,
        });
        this.items = this.$store.getters['m_ref_unit_obrik/refSubBidangObrik'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadDescBidangObrik() {
      const response = await axios({
        method: 'GET',
        baseURL: this.$apiAddress,
        url: `/api/bidangobrik/${this.idBidangObrik}`,
        params: {
          token: localStorage.getItem('api_token'),
        },
      });

      if (response.status != 200) {
        const error = new Error(
          responseData.message || 'Failed to fetch data unit kerja.'
        );
        throw error;
      }

      this.descBidangObrik = await response.data.diskripsi;
    },
  },
};
</script>

