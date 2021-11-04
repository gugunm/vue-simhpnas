<template>
  <div>
    <CRow>
      <CCol>
        <CAlert color="success" close-button :show.sync="alertResetPass">
          <span>
            Berhasil reset password dengan password :
            <b>{{ msgResetPass }}</b>
          </span>
        </CAlert>
      </CCol>
    </CRow>
    <table-user
      top-title="Manajemen User"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
      @open-reset-password="openResetPassword"
    />
    <confirm-modal
      v-model="isDeleteConfirm"
      title="Hapus data"
      msg="Apakah anda yakin akan menghapus data ini?"
      @close-modal="isDeleteConfirm = false"
      @confirm-ok="actionDelete"
    />
    <confirm-modal
      v-model="isResetConfirm"
      title="Reset Password"
      msg="Apakah anda yakin akan mereset password untuk user ini?"
      @close-modal="isResetConfirm = false"
      @confirm-ok="actionReset"
    />
  </div>
</template>

<script>
import TableUser from './TableUser.vue';
import mixin from './mixin';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

const fields = [
  {
    key: 'name',
    label: 'Nama',
  },
  {
    key: 'email',
  },
  {
    key: 'unitAudit',
  },
  {
    key: 'subUnitAudit',
  },
  {
    key: 'deskripsiLevel',
  },
  {
    key: 'actions',
    label: 'Aksi',
    _style: 'width: 12%',
  },
];

export default {
  name: 'UserUnit',
  components: {
    TableUser,
    ConfirmModal,
  },
  mixins: [mixin],
  data() {
    return {
      items: [],
      fields,
      isDeleteConfirm: false,
      idToDelete: null,
      isResetConfirm: false,
      idToReset: null,
      alertResetPass: false,
      msgResetPass: '',
    };
  },
  async mounted() {
    await this.loadUserUnit();
  },
  methods: {
    openCreate() {
      this.$router.push({
        name: 'module-create-user-unit-kerja',
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'module-edit-user-unit-kerja',
        params: { idUserUnitKerja: item.kodeUser },
      });
    },

    openResetPassword(id) {
      this.idToReset = id;
      this.isResetConfirm = true;
    },
    async actionReset() {
      try {
        const response = await this.$store.dispatch(
          'm_user_utama/resetPasswordUserUtama',
          {
            idUser: this.idToReset,
          }
        );

        this.isResetConfirm = false;

        if (response.status == 200) {
          await this.loadUserUnit();

          // this.toastSuccess(response.data.message);
          this.msgResetPass = response.data.message;
          this.alertResetPass = true;
        } else {
          this.toastError(response.data.message);
        }
      } catch (error) {
        this.toastError(error.message);
      }
    },

    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async actionDelete() {
      try {
        const response = await this.$store.dispatch(
          'm_user_unit/deleteUserUnitKerja',
          {
            idUser: this.idToDelete,
          }
        );

        this.isDeleteConfirm = false;

        if (response.status == 200) {
          await this.loadUserUnit();
          this.toastSuccess(response.data.message);
        } else {
          this.toastError(response.data.message);
        }
      } catch (error) {
        this.toastError(response.data.message);
      }
    },
    async loadUserUnit() {
      try {
        await this.$store.dispatch('m_user_unit/loadUserUnit');

        this.items = this.$store.getters['m_user_unit/userUnit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  },
};
</script>