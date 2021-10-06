<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Sub Kelompok Temuan</h3>
        <h3 v-else>Edit Sub Kelompok Temuan</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm method="POST" @submit.prevent="clickSubmitForm">
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.idSubKlpTemuan.val"
                  label="Kode Sub Kelompok Temuan"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idSubKlpTemuan.isValid"
                  @input="validateString(form.idSubKlpTemuan, { length: 2 })"
                />
                <p
                  v-if="form.idSubKlpTemuan.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *hanya 3 angka
                </p>
              </CCol>
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.descSubKlpTemuan.val"
                  label="Deskripsi Sub Kelompok Temuan"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi sub kelompok temuan"
                  :is-valid="form.descSubKlpTemuan.isValid"
                  @input="validateString(form.descSubKlpTemuan, { length: 3 })"
                />
                <p
                  v-if="form.descSubKlpTemuan.isValid == false"
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
  props: ['mode', 'selectedItem', 'idKlpTemuan'],
  data() {
    return {
      form: {
        idSubKlpTemuan: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descSubKlpTemuan: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
        rekomendasiSubKlpTemuan: {
          val: 'saran 01 02 03',
          isValid: this.mode == 'edit' || true,
        },
      },
      idJenisTemuan: this.idKlpTemuan.charAt(0),
      formIsValid: null,
      isOpenConfirm: false,
      loading: false,
      subKlpTemuan: null,
    };
  },
  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadSubKelompokTemuan', {
          idKlpTemuan: this.idKlpTemuan,
        });

        this.subKlpTemuan = this.$store.getters['m_temuan/subKelompokTemuan'];

        if (this.subKlpTemuan.length > 0) {
          const newId = this.generateNewId();
          this.form.idSubKlpTemuan.val = newId;
        } else {
          this.form.idSubKlpTemuan.val = '01';
        }
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    } else if (this.mode == 'edit') {
      this.createDataWithSelectedItem();
    }
  },
  methods: {
    generateNewId() {
      const listSubKlpTemuan = this.subKlpTemuan.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listSubKlpTemuan) + 1).toString().slice(-2);
    },

    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            Kode_Sub_Kelompok_Temuan: this.form.idSubKlpTemuan.val,
            Kode_Kelompok_Temuan: this.idKlpTemuan,
            Kode_Jenis_Temuan: this.idJenisTemuan,
            diskripsi: this.form.descSubKlpTemuan.val,
            saran_rekomendasi: this.form.rekomendasiSubKlpTemuan.val,
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
        this.form.idSubKlpTemuan.isValid,
        this.form.descSubKlpTemuan.isValid,
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