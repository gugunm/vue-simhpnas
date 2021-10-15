<template>
  <CRow class="mb-4">
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Temuan</h3>
        <h3 v-else>Edit Temuan</h3>
      </div>
      <CRow class="mb-4">
        <CCol lg="6">
          <div class="flex items-center">
            <p class="inline-block mr-3 font-semibold text-base">
              Switch jika ini adalah Temuan Investigatif
            </p>
            <CSwitch
              class="mx-1"
              color="danger"
              variant="3d"
              v-bind="labelIcon"
              :checked.sync="isAuditTpk"
            />
          </div>
        </CCol>
      </CRow>
      <CCard v-if="!isAuditTpk">
        <!-- <CCardBody> -->
        <CForm>
          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">Data Temuan</h5>
          </div>
          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor LHA"
                  :value="$route.query.nolha"
                  :disabled="true"
                  :readonly="true"
                />
              </CCol>
            </CRow>

            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor Temuan"
                  :lazy="false"
                  :value.sync="$v.form.nomorTemuan.$model"
                  :is-valid="checkIfValid('nomorTemuan')"
                  placeholder="Nomor Temuan"
                  autocomplete="nomorTemuan"
                  invalid-feedback="Nomor Temuan wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 3 -->
            <CRow>
              <CCol lg="4">
                <div>
                  <label class="typo__label">Jenis Temuan</label>
                  <multiselect
                    v-if="optionsJenisTemuan"
                    v-model="valueJenisTemuan"
                    :options="optionsJenisTemuan"
                    :custom-label="viewSelectSearch"
                    placeholder="Select jenis temuan"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Jenis Temuan"
                  :lazy="false"
                  :value.sync="$v.form.jenisTemuan.$model"
                  :is-valid="checkIfValid('jenisTemuan')"
                  placeholder="Jenis Temuan"
                  autocomplete="jenisTemuan"
                  invalid-feedback="Jenis Temuan wajib diisi"
                /> -->
              </CCol>
              <CCol lg="4">
                <CInput
                  label="Kelompok Temuan"
                  :lazy="false"
                  :value.sync="$v.form.klpTemuan.$model"
                  :is-valid="checkIfValid('klpTemuan')"
                  placeholder="Kelompok Temuan"
                  autocomplete="klpTemuan"
                  invalid-feedback="Kelompok Temuan wajib diisi"
                />
              </CCol>
              <CCol lg="4">
                <CInput
                  label="Sub Kelompok Temuan"
                  :lazy="false"
                  :value.sync="$v.form.subKlpTemuan.$model"
                  :is-valid="checkIfValid('subKlpTemuan')"
                  placeholder="Sub Kelompok Temuan"
                  autocomplete="subKlpTemuan"
                  invalid-feedback="Sub Kelompok Temuan wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 4 -->
            <CRow>
              <CCol lg="8">
                <CTextarea
                  label="Memo Temuan"
                  :lazy="false"
                  :value.sync="$v.form.memoTemuan.$model"
                  :is-valid="checkIfValid('memoTemuan')"
                  placeholder="Memo Temuan"
                  autocomplete="memoTemuan"
                  invalid-feedback="Memo Temuan wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 5 -->
            <CRow>
              <CCol lg="4">
                <CInput
                  type="number"
                  label="Nilai Temuan"
                  :lazy="false"
                  :value.sync="$v.form.nilaiTemuan.$model"
                  :is-valid="checkIfValid('nilaiTemuan')"
                  placeholder="Nilai Temuan"
                  autocomplete="nilaiTemuan"
                  invalid-feedback="Nilai Temuan wajib diisi"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="6">
                <CInputCheckbox
                  :is-valid="checkIfValid('accept')"
                  :checked.sync="$v.form.accept.$model"
                  label="Data yang di entry telah sesuai"
                  invalid-feedback="Anda harus menyetujui sebelum melakukan submit"
                  custom
                  class="mb-4"
                />
              </CCol>
            </CRow>
          </div>

          <div class="px-3">
            <CRow class="mb-2 view-form">
              <CCol sm="12" lg="6" class="mb-3">
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
                class="content-center justify-end pr-3 mb-3"
              >
                <CButton
                  class="ml-1"
                  color="danger"
                  :disabled="!isDirty"
                  @click="reset"
                >
                  Reset
                </CButton>
                <CButton
                  class="ml-1"
                  color="success"
                  :disabled="isValid"
                  @click="validate"
                >
                  Validate
                </CButton>
                <CButton
                  type="submit"
                  color="primary"
                  class="px-4 ml-1"
                  :disabled="!isValid || submitted"
                  @click="submit"
                >
                  <div v-if="loading" class="px-8">
                    <CSpinner color="white" size="sm" class="mr-2" />
                  </div>
                  <template v-else> Submit Data </template>
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CForm>
        <!-- </CCardBody> -->
      </CCard>
      <CCard v-else>
        <!-- <CCardBody> -->
        <CForm>
          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold text-red-500">
              Data Temuan Investigatif
            </h5>
          </div>
          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor LHA"
                  :value="$route.query.nolha"
                  :disabled="true"
                  :readonly="true"
                />
              </CCol>
            </CRow>

            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor Temuan"
                  :lazy="false"
                  :value.sync="$v.form.nomorTemuan.$model"
                  :is-valid="checkIfValid('nomorTemuan')"
                  placeholder="Nomor Temuan"
                  autocomplete="nomorTemuan"
                  invalid-feedback="Nomor Temuan wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 3 -->
            <CRow>
              <CCol lg="4">
                <CInput
                  label="Jenis Temuan"
                  :lazy="false"
                  :value.sync="$v.form.jenisTemuan.$model"
                  :is-valid="checkIfValid('jenisTemuan')"
                  placeholder="Jenis Temuan"
                  autocomplete="jenisTemuan"
                  invalid-feedback="Jenis Temuan wajib diisi"
                />
              </CCol>
              <CCol lg="4">
                <CInput
                  label="Kelompok Temuan"
                  :lazy="false"
                  :value.sync="$v.form.klpTemuan.$model"
                  :is-valid="checkIfValid('klpTemuan')"
                  placeholder="Kelompok Temuan"
                  autocomplete="klpTemuan"
                  invalid-feedback="Kelompok Temuan wajib diisi"
                />
              </CCol>
              <CCol lg="4">
                <CInput
                  label="Sub Kelompok Temuan"
                  :lazy="false"
                  :value.sync="$v.form.subKlpTemuan.$model"
                  :is-valid="checkIfValid('subKlpTemuan')"
                  placeholder="Sub Kelompok Temuan"
                  autocomplete="subKlpTemuan"
                  invalid-feedback="Sub Kelompok Temuan wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 4 -->
            <CRow>
              <CCol lg="8">
                <CTextarea
                  label="Memo Temuan / Uraian Kasus"
                  :lazy="false"
                  :value.sync="$v.form.memoTemuan.$model"
                  :is-valid="checkIfValid('memoTemuan')"
                  placeholder="Memo Temuan"
                  autocomplete="memoTemuan"
                  invalid-feedback="Memo Temuan wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 5 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Posisi Kasus"
                  :lazy="false"
                  :value.sync="$v.form.posisiKasus.$model"
                  :is-valid="checkIfValid('posisiKasus')"
                  placeholder="Posisi Kasus"
                  autocomplete="posisiKasus"
                  invalid-feedback="Posisi Kasus wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 6 -->
            <CRow>
              <CCol lg="8">
                <CTextarea
                  label="Modus Operandi"
                  :lazy="false"
                  :value.sync="$v.form.modusOperandi.$model"
                  :is-valid="checkIfValid('modusOperandi')"
                  placeholder="Modus operandi"
                  autocomplete="modusOperandi"
                  invalid-feedback="Modus Operandi wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 4 -->
            <CRow>
              <CCol lg="4">
                <CInput
                  type="number"
                  label="Nilai Temuan (Jumlah Kerugian Negara)"
                  :lazy="false"
                  :value.sync="$v.form.nilaiTemuan.$model"
                  :is-valid="checkIfValid('nilaiTemuan')"
                  placeholder="Nilai Temuan"
                  autocomplete="nilaiTemuan"
                  invalid-feedback="Nilai Temuan wajib diisi"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="6">
                <CInputCheckbox
                  :is-valid="checkIfValid('accept')"
                  :checked.sync="$v.form.accept.$model"
                  label="Data yang di entry telah sesuai"
                  invalid-feedback="Anda harus menyetujui sebelum melakukan submit"
                  custom
                  class="mb-4"
                />
              </CCol>
            </CRow>
          </div>

          <div class="px-3">
            <CRow class="mb-2 view-form">
              <CCol sm="12" lg="6" class="mb-3">
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
                class="content-center justify-end pr-3 mb-3"
              >
                <CButton
                  class="ml-1"
                  color="danger"
                  :disabled="!isDirty"
                  @click="reset"
                >
                  Reset
                </CButton>
                <CButton
                  class="ml-1"
                  color="success"
                  :disabled="isValid"
                  @click="validate"
                >
                  Validate
                </CButton>
                <CButton
                  type="submit"
                  color="primary"
                  class="px-4 ml-1"
                  :disabled="!isValid || submitted"
                  @click="submit"
                >
                  <div v-if="loading" class="px-8">
                    <CSpinner color="white" size="sm" class="mr-2" />
                  </div>
                  <template v-else> Submit Data </template>
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CForm>

        <!-- </CCardBody> -->
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
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
  email,
  sameAs,
  helpers,
} from 'vuelidate/lib/validators';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import mixin from './mixin';
import Multiselect from 'vue-multiselect';

export default {
  name: 'LhaForm',
  components: {
    ConfirmModal,
    Multiselect,
  },
  mixins: [validationMixin, mixin],
  props: ['mode', 'selectedItem'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      isOpenConfirm: false,
      isAuditTpk: false,
      labelIcon: {
        labelOn: '\u2713',
        labelOff: '\u2715',
      },
      valueJenisTemuan: '',
      optionsJenisTemuan: [],
    };
  },
  computed: {
    formString() {
      return JSON.stringify(this.form, null, 4);
    },
    isValid() {
      return !this.$v.form.$invalid;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
  },
  async mounted() {
    await this.loadJenisTemuan();
  },
  validations: {
    form: {
      nomorTemuan: { required, minLength: minLength(2) },
      jenisTemuan: { required },
      klpTemuan: { required },
      subKlpTemuan: { required },
      memoTemuan: { required, minLength: minLength(2) },
      posisiKasus: { required, minLength: minLength(2) },
      modusOperandi: { required, minLength: minLength(2) },
      nilaiTemuan: { required },
      accept: {
        required,
        mustAccept: (val) => val,
      },
    },
  },
  watch: {
    valueJenisTemuan: function (val) {
      this.$v.form.jenisTemuan.$model = val.id;
    },
  },
  methods: {
    viewSelectSearch({ id, deskripsi }) {
      return `${id} - ${deskripsi}`;
    },

    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === '');
    },

    submit() {
      if (this.isValid) {
        this.submitted = true;
      }
    },

    validate() {
      this.$v.$touch();
    },

    reset() {
      this.form = this.getEmptyForm();
      this.submitted = false;
      this.$v.$reset();
    },

    getEmptyForm() {
      if (this.isAuditTpk) {
        return {
          nomorTemuan: '',
          jenisTemuan: '',
          klpTemuan: '',
          subKlpTemuan: '',
          memoTemuan: '',
          posisiKasus: '',
          modusOperandi: '',
          nilaiTemuan: 0,
          accept: false,
        };
      }
      return {
        nomorTemuan: '',
        jenisTemuan: '',
        klpTemuan: '',
        subKlpTemuan: '',
        memoTemuan: '',
        nilaiTemuan: 0,
        accept: false,
      };
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
