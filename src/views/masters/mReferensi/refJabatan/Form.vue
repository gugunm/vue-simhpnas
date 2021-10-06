<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Jabatan</h3>
        <h3 v-else>Edit Jabatan</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm method="POST" @submit.prevent="clickSubmitForm">
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.idJabatan.val"
                  label="Kode Jabatan"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idJabatan.isValid"
                  @input="validateString(form.idJabatan, { length: 1 })"
                />
                <p
                  v-if="form.idJabatan.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *tidak boleh kosong
                </p>
              </CCol>
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.descJabatan.val"
                  label="Deskripsi Jabatan"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi jabatan"
                  :is-valid="form.descJabatan.isValid"
                  @input="validateString(form.descJabatan, { length: 3 })"
                />
                <p
                  v-if="form.descJabatan.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *minimal 3 huruf
                </p>
              </CCol>
            </CRow>
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CButton
                  v-if="mode != 'view'"
                  variant="outline"
                  color="dark"
                  @click="isOpenConfirm = true"
                >
                  Kembali
                </CButton>
              </CCol>
              <CCol
                v-if="mode == 'create' || mode == 'edit'"
                sm="12"
                md="6"
                class="content-center justify-end pr-3"
              >
                <CButton type="submit" color="primary" class="px-4">
                  <div v-if="loading" class="px-8">
                    <CSpinner color="white" size="sm" class="mr-2" />
                  </div>
                  <template v-else> Submit Data </template>
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
    <confirm-modal
      v-model="isOpenConfirm"
      @close-modal="isOpenConfirm = false"
      @confirm-ok="$router.go(-1)"
    />
  </CRow>
</template>

<script>
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import mixin from './mixin';

export default {
  components: {
    ConfirmModal,
  },
  mixins: [mixin],
  props: ['mode', 'selectedItem'],
  data() {
    return {
      form: {
        idJabatan: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descJabatan: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      isOpenConfirm: false,
      formIsValid: null,
      loading: false,
      jabatan: null,
    };
  },

  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jabatan/loadRefJabatan');

        this.jabatan = this.$store.getters['m_ref_jabatan/refJabatan'];

        if (this.jabatan.length > 0) {
          const newId = await this.generateNewId();
          this.form.idJabatan.val = newId;
        } else {
          this.form.idJabatan.val = '1';
        }
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    } else {
      this.createDataWithSelectedItem();
    }
  },
  methods: {
    async generateNewId() {
      const listJabatan = this.jabatan.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listJabatan) + 1).toString();
    },
    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            kode_jabatan: this.form.idJabatan.val,
            diskripsi: this.form.descJabatan.val,
          },
        });
      } else {
        this.toastError('Terdapat data yang belum valid');
      }

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    checkForm() {
      const listValidate = [
        this.form.idJabatan.isValid,
        this.form.descJabatan.isValid,
      ];

      if (listValidate.every((v) => v === true)) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    validateString(data, options) {
      if (data.val && data.val.trim().length >= options.length) {
        data.isValid = true;
      } else {
        data.isValid = false;
      }
    },
  },
};
</script>