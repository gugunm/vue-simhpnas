<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Kelompok Rekomendasi</h3>
        <h3 v-else>Edit Kelompok Rekomendasi</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm method="POST" @submit.prevent="clickSubmitForm">
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.idKlpRekomendasi.val"
                  label="Kode Kelompok Rekomendasi"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idKlpRekomendasi.isValid"
                  @input="validateString(form.idKlpRekomendasi, { length: 2 })"
                />
                <p
                  v-if="form.idKlpRekomendasi.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *tidak boleh kosong
                </p>
              </CCol>
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.descKlpRekomendasi.val"
                  label="Deskripsi Kelompok Rekomendasi"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi kelompok rekomendasi"
                  :is-valid="form.descKlpRekomendasi.isValid"
                  @input="
                    validateString(form.descKlpRekomendasi, { length: 3 })
                  "
                />
                <p
                  v-if="form.descKlpRekomendasi.isValid == false"
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
        idKlpRekomendasi: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descKlpRekomendasi: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      isOpenConfirm: false,
      formIsValid: null,
      loading: false,
      klpRekomendasi: null,
    };
  },

  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_rekomendasi/loadKlpRekomendasi');

        this.klpRekomendasi =
          this.$store.getters['m_rekomendasi/klpRekomendasi'];

        if (this.klpRekomendasi.length > 0) {
          const newId = await this.generateNewId();
          this.form.idKlpRekomendasi.val = newId;
        } else {
          this.form.idKlpRekomendasi.val = '01';
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
      const listKlpRekomendasi = this.klpRekomendasi.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listKlpRekomendasi) + 1).toString();
    },
    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            kode_kelompok_rekomendasi: this.form.idKlpRekomendasi.val,
            diskripsi: this.form.descKlpRekomendasi.val,
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
        this.form.idKlpRekomendasi.isValid,
        this.form.descKlpRekomendasi.isValid,
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