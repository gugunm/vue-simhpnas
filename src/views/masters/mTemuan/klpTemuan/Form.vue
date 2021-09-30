<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Kelompok Temuan</h3>
        <h3 v-else>Edit Kelompok Temuan</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm method="POST" @submit.prevent="clickSubmitForm">
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.idKlpTemuan.val"
                  label="Kode Kelompok Temuan"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idKlpTemuan.isValid"
                  @input="validateString(form.idKlpTemuan, { length: 2 })"
                />
                <p
                  v-if="form.idKlpTemuan.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *tidak boleh kosong
                </p>
              </CCol>
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.descKlpTemuan.val"
                  label="Deskripsi Kelompok Temuan"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi kelompok temuan"
                  :is-valid="form.descKlpTemuan.isValid"
                  @input="validateString(form.descKlpTemuan, { length: 3 })"
                />
                <p
                  v-if="form.descKlpTemuan.isValid == false"
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
  props: ['mode', 'selectedItem', 'idJenisTemuan'],
  data() {
    return {
      form: {
        idKlpTemuan: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descKlpTemuan: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      formIsValid: null,
      isOpenConfirm: false,
      loading: false,
      klpTemuan: null,
    };
  },

  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadKelompokTemuan', {
          idJenisTemuan: this.idJenisTemuan,
        });

        this.klpTemuan = this.$store.getters['m_temuan/kelompokTemuan'];

        if (this.klpTemuan.length > 0) {
          const newId = this.generateNewId();
          this.form.idKlpTemuan.val = newId;
        } else {
          this.form.idKlpTemuan.val = '01';
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
      const listKlpTemuan = this.klpTemuan.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listKlpTemuan) + 1).toString();
    },

    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            Kode_Kelompok_Temuan: this.form.idKlpTemuan.val,
            Kode_Jenis_Temuan: this.idJenisTemuan,
            diskripsi: this.form.descKlpTemuan.val,
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
        this.form.idKlpTemuan.isValid,
        this.form.descKlpTemuan.isValid,
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