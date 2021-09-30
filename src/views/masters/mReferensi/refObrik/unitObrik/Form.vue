<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Unit Obrik</h3>
        <h3 v-else>Edit Unit Obrik</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm method="POST" @submit.prevent="clickSubmitForm">
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.idUnitObrik.val"
                  label="Kode Unit Obrik"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idUnitObrik.isValid"
                  @input="validateString(form.idUnitObrik, { length: 2 })"
                />
                <p
                  v-if="form.idUnitObrik.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *hanya 2 angka
                </p>
              </CCol>
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.descUnitObrik.val"
                  label="Deskripsi Unit Obrik"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi unit obrik"
                  :is-valid="form.descUnitObrik.isValid"
                  @input="validateString(form.descUnitObrik, { length: 3 })"
                />
                <p
                  v-if="form.descUnitObrik.isValid == false"
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
import ConfirmModal from '@/views/components/ConfirmModal.vue';
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
        idUnitObrik: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descUnitObrik: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      isOpenConfirm: false,
      formIsValid: null,
      loading: false,
      unitObrik: null,
    };
  },
  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_obrik/loadRefUnitObrik');
        this.unitObrik = this.$store.getters['m_ref_unit_obrik/refUnitObrik'];
        if (this.unitObrik.length > 0) {
          const newId = await this.generateNewId();
          this.form.idUnitObrik.val = newId;
        } else {
          this.form.idUnitObrik.val = '01';
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
    async generateNewId() {
      const listUnitObrik = this.unitObrik.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listUnitObrik) + 1).toString().slice(-2);
    },
    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            Kode_Unit_Obrik: this.form.idUnitObrik.val,
            diskripsi: this.form.descUnitObrik.val,
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
        this.form.idUnitObrik.isValid,
        this.form.descUnitObrik.isValid,
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
