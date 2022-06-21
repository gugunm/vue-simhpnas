<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">
          Create Jenis Anggaran
        </h3>
        <h3 v-else>
          Edit Jenis Anggaran
        </h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm
            method="POST"
            @submit.prevent="clickSubmitForm"
          >
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="form.idJenisAnggaran.val"
                  label="Kode Jenis Anggaran"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idJenisAnggaran.isValid"
                  @input="validateId(form.idJenisAnggaran, { length: 2 })"
                />
                <p
                  v-if="form.idJenisAnggaran.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *maksimal 2 angka
                </p>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="form.descJenisAnggaran.val"
                  label="Deskripsi Jenis Anggaran"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi jenis anggaran"
                  :is-valid="form.descJenisAnggaran.isValid"
                  @input="validateString(form.descJenisAnggaran, { length: 3 })"
                />
                <p
                  v-if="form.descJenisAnggaran.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *minimal 3 huruf
                </p>
              </CCol>
            </CRow>
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
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
                <CButton
                  type="submit"
                  color="primary"
                  class="px-4"
                >
                  <div
                    v-if="loading"
                    class="px-8"
                  >
                    <CSpinner
                      color="white"
                      size="sm"
                      class="mr-2"
                    />
                  </div>
                  <template v-else>
                    Submit Data
                  </template>
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
        idJenisAnggaran: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descJenisAnggaran: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      isOpenConfirm: false,
      formIsValid: null,
      loading: false,
      jenisAnggaran: null,
    };
  },

  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jenis_anggaran/loadRefJenisAnggaran');

        this.jenisAnggaran =
          this.$store.getters['m_ref_jenis_anggaran/refJenisAnggaran'];

        if (this.jenisAnggaran.length > 0) {
          const newId = await this.generateNewId();
          this.form.idJenisAnggaran.val = newId;
        } else {
          this.form.idJenisAnggaran.val = '1';
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
      const listJenisAnggaran = this.jenisAnggaran.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listJenisAnggaran) + 1).toString();
    },
    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            kode_jenis_anggaran: this.form.idJenisAnggaran.val,
            diskripsi: this.form.descJenisAnggaran.val,
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
        this.form.idJenisAnggaran.isValid,
        this.form.descJenisAnggaran.isValid,
      ];

      if (listValidate.every((v) => v === true)) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },

    validateId(data, options) {
      if (data.val && data.val.trim().length == options.length) {
        data.isValid = true;
      } else {
        data.isValid = false;
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