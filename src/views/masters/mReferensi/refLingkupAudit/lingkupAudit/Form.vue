<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Lingkup Audit</h3>
        <h3 v-else>Edit Lingkup Audit</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm method="POST" @submit.prevent="clickSubmitForm">
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.idLingkupAudit.val"
                  label="Kode Lingkup Audit"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idLingkupAudit.isValid"
                  @input="validateString(form.idLingkupAudit, { length: 1 })"
                />
                <p
                  v-if="form.idLingkupAudit.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *tidak boleh kosong
                </p>
              </CCol>
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.descLingkupAudit.val"
                  label="Deskripsi Lingkup Audit"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi bidang obrik"
                  :is-valid="form.descLingkupAudit.isValid"
                  @input="validateString(form.descLingkupAudit, { length: 3 })"
                />
                <p
                  v-if="form.descLingkupAudit.isValid == false"
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
  props: ['mode', 'selectedItem', 'idGroupLingkupAudit'],
  data() {
    return {
      form: {
        idLingkupAudit: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descLingkupAudit: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      formIsValid: null,
      isOpenConfirm: false,
      loading: false,
      lingkupAudit: null,
    };
  },

  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_lingkup_audit/loadRefLingkupAudit', {
          idGroupLingkupAudit: this.idGroupLingkupAudit,
        });
        this.lingkupAudit =
          this.$store.getters['m_ref_lingkup_audit/refLingkupAudit'];

        if (this.lingkupAudit.length > 0) {
          const newId = this.generateNewId();
          this.form.idLingkupAudit.val = newId;
        } else {
          this.form.idLingkupAudit.val = '01';
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
      const listLingkupAudit = this.lingkupAudit.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listLingkupAudit) + 1).toString();
    },

    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            kode_lingkup_audit: this.form.idLingkupAudit.val,
            kode_grup_lingkup_audit: this.idGroupLingkupAudit,
            diskripsi: this.form.descLingkupAudit.val,
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
        this.form.idLingkupAudit.isValid,
        this.form.descLingkupAudit.isValid,
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