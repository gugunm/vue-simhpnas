<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Sub Bidang Obrik</h3>
        <h3 v-else>Edit Sub Bidang Obrik</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm method="POST" @submit.prevent="clickSubmitForm">
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.idSubBidangObrik.val"
                  label="Kode Sub Bidang Obrik"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idSubBidangObrik.isValid"
                  @input="validateString(form.idSubBidangObrik, { length: 3 })"
                />
                <p
                  v-if="form.idSubBidangObrik.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *hanya 3 angka
                </p>
              </CCol>
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.descSubBidangObrik.val"
                  label="Deskripsi Sub Bidang Obrik"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi sub bidang obrik"
                  :is-valid="form.descSubBidangObrik.isValid"
                  @input="
                    validateString(form.descSubBidangObrik, { length: 3 })
                  "
                />
                <p
                  v-if="form.descSubBidangObrik.isValid == false"
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
  props: ['mode', 'selectedItem', 'idbidangobrik'],
  data() {
    return {
      form: {
        idSubBidangObrik: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descSubBidangObrik: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      formIsValid: null,
      isOpenConfirm: false,
      loading: false,
      subBidangObrik: null,
    };
  },
  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefSubBidangObrik', {
          idBidangObrik: this.idbidangobrik,
        });
        this.subBidangObrik =
          this.$store.getters['m_ref_unit_obrik/refSubBidangObrik'];
        if (this.subBidangObrik.length > 0) {
          const newId = this.generateNewId();
          this.form.idSubBidangObrik.val = newId;
        } else {
          this.form.idSubBidangObrik.val = '001';
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
      const listSubBidangObrik = this.subBidangObrik.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listSubBidangObrik) + 1).toString().slice(-3);
    },

    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            Kode_Sub_Bidang_Obrik: this.form.idSubBidangObrik.val,
            Kode_Bidang_Obrik: this.idbidangobrik,
            Kode_Unit_Obrik: this.idunitobrik,
            diskripsi: this.form.descSubBidangObrik.val,
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
        this.form.idSubBidangObrik.isValid,
        this.form.descSubBidangObrik.isValid,
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