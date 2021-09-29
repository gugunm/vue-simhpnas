<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">
          Create Bidang Obrik
        </h3>
        <h3 v-else>
          Edit Bidang Obrik
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
                  v-model="form.idBidangObrik.val"
                  label="Kode Bidang Obrik"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idBidangObrik.isValid"
                  @input="validateString(form.idBidangObrik, {length:3})"
                />
                <p
                  v-if="form.idBidangObrik.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *hanya 3 angka
                </p>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="form.descBidangObrik.val"
                  label="Deskripsi Bidang Obrik"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi bidang obrik"
                  :is-valid="form.descBidangObrik.isValid"
                  @input="validateString(form.descBidangObrik, {length:3})"
                />
                <p
                  v-if="form.descBidangObrik.isValid == false"
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
import ConfirmModal from '@/views/components/ConfirmModal.vue';
import mixin from './mixin';

export default {
  components: {
    ConfirmModal,
  },
  mixins: [mixin],
  props: ['mode', 'selectedItem', 'idunitobrik'],
  data() {
    return {
      form: {
        idBidangObrik: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descBidangObrik: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      formIsValid: null,
      isOpenConfirm: false,
      loading: false,
      bidangObrik: null,
    };
  },
  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefBidangObrik', {
          idUnitObrik: this.idunitobrik,
        });
        this.bidangObrik =
          this.$store.getters['m_ref_unit_obrik/refBidangObrik'];
        if (this.bidangObrik.length > 0) {
          const newId = this.generateNewId();
          this.form.idBidangObrik.val = newId;
        } else {
          this.form.idBidangObrik.val = '001';
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
      const listBidangObrik = this.bidangObrik.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listBidangObrik) + 1).toString().slice(-3);
    },
    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            Kode_Bidang_Obrik: this.form.idBidangObrik.val,
            Kode_Unit_Obrik: this.idunitobrik,
            diskripsi: this.form.descBidangObrik.val,
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
        this.form.idBidangObrik.isValid,
        this.form.descBidangObrik.isValid,
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