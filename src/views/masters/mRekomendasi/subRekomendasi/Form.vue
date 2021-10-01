<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Sub Kelompok Rekomendasi</h3>
        <h3 v-else>Edit Sub Kelompok Rekomendasi</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm method="POST" @submit.prevent="clickSubmitForm">
            <CRow class="mb-2 view-form">
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.idSubKlpRekomendasi.val"
                  label="Kode Sub Kelompok Rekomendasi"
                  class="mb-2"
                  type="text"
                  placeholder="kode"
                  :readonly="mode == 'edit'"
                  :is-valid="form.idSubKlpRekomendasi.isValid"
                  @input="
                    validateString(form.idSubKlpRekomendasi, { length: 1 })
                  "
                />
                <p
                  v-if="form.idSubKlpRekomendasi.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *tidak boleh kosong
                </p>
              </CCol>
              <CCol sm="12" md="6">
                <CInput
                  v-model="form.descSubKlpRekomendasi.val"
                  label="Deskripsi Sub Kelompok Rekomendasi"
                  class="mb-2"
                  type="text"
                  placeholder="deskripsi sub klp rekomendasi"
                  :is-valid="form.descSubKlpRekomendasi.isValid"
                  @input="
                    validateString(form.descSubKlpRekomendasi, { length: 3 })
                  "
                />
                <p
                  v-if="form.descSubKlpRekomendasi.isValid == false"
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
  props: ['mode', 'selectedItem', 'idKlpRekomendasi'],
  data() {
    return {
      form: {
        idSubKlpRekomendasi: {
          val: '',
          isValid: this.mode == 'edit' || true,
        },
        descSubKlpRekomendasi: {
          val: '',
          isValid: this.mode == 'edit' || null,
        },
      },
      formIsValid: null,
      isOpenConfirm: false,
      loading: false,
      subKlpRekomendasi: null,
    };
  },

  async mounted() {
    if (this.mode == 'create') {
      this.loading = true;
      try {
        await this.$store.dispatch('m_rekomendasi/loadSubKlpRekomendasi', {
          idKlpRekomendasi: this.idKlpRekomendasi,
        });

        this.subKlpRekomendasi =
          this.$store.getters['m_rekomendasi/subKlpRekomendasi'];

        if (this.subKlpRekomendasi.length > 0) {
          const newId = this.generateNewId();
          this.form.idSubKlpRekomendasi.val = newId;
        } else {
          this.form.idSubKlpRekomendasi.val = '1';
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
      const listSubKlpRekomendasi = this.subKlpRekomendasi.map((v) => {
        return parseInt(v.id);
      });
      return (Math.max(...listSubKlpRekomendasi) + 1).toString();
    },

    clickSubmitForm() {
      this.checkForm();
      this.loading = true;

      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            kode_sub_kelompok_rekomendasi: this.form.idSubKlpRekomendasi.val,
            kode_kelompok_rekomendasi: this.idKlpRekomendasi,
            diskripsi: this.form.descSubKlpRekomendasi.val,
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
        this.form.idSubKlpRekomendasi.isValid,
        this.form.descSubKlpRekomendasi.isValid,
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