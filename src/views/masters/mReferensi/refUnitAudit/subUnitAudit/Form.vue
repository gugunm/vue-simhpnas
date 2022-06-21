<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">
          Create Sub Unit Audit
        </h3>
        <h3 v-else>
          Edit Sub Unit Audit
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
                  v-model="form.idSubUnitAudit.val"
                  label="Kode Sub Unit Audit"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idSubUnitAudit.isValid"
                  @input="validateString(form.idSubUnitAudit, { length: 2 })"
                />
                <p
                  v-if="form.idSubUnitAudit.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *tidak boleh kosong
                </p>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="form.descSubUnitAudit.val"
                  label="Deskripsi Sub Unit Audit"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi sub unit obrik"
                  :is-valid="form.descSubUnitAudit.isValid"
                  @input="validateString(form.descSubUnitAudit, { length: 3 })"
                />
                <p
                  v-if="form.descSubUnitAudit.isValid == false"
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
  props: ['mode', 'selectedItem', 'idUnitAudit'],
  data() {
    return {
      form: {
        idSubUnitAudit: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descSubUnitAudit: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      formIsValid: null,
      isOpenConfirm: false,
      loading: false,
      subUnitAudit: null,
    };
  },

  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefSubUnitAudit', {
          idUnitAudit: this.idUnitAudit,
        });

        this.subUnitAudit =
          this.$store.getters['m_ref_unit_audit/refSubUnitAudit'];

        if (this.subUnitAudit.length > 0) {
          const newId = this.generateNewId();
          this.form.idSubUnitAudit.val = newId;
        } else {
          this.form.idSubUnitAudit.val = '01';
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
      const listSubUnitAudit = this.subUnitAudit.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listSubUnitAudit) + 1).toString();
    },

    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            Kode_Sub_Unit_Audit: this.form.idSubUnitAudit.val,
            Kode_Unit_Audit: this.idUnitAudit,
            diskripsi: this.form.descSubUnitAudit.val,
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
        this.form.idSubUnitAudit.isValid,
        this.form.descSubUnitAudit.isValid,
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