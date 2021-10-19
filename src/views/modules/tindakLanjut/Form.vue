<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Tindak Lanjut</h3>
        <h3 v-else>Edit Tindak Lanjut</h3>
      </div>
      <CCard>
        <!-- <CCardBody> -->
        <CForm class="form-tl">
          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">Data Tindak Lanjut</h5>
          </div>
          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor LHA"
                  :value="$route.query.nolha"
                  :disabled="true"
                />
              </CCol>
            </CRow>

            <!-- ROW 2 -->
            <CRow>
              <CCol lg="3">
                <CInput
                  label="Nomor Temuan"
                  :value="$route.query.notemuan"
                  :disabled="true"
                />
              </CCol>
              <CCol lg="3">
                <CInput
                  label="Nomor Rekomendasi"
                  :value="$route.query.norekomendasi"
                  :disabled="true"
                />
              </CCol>
              <CCol lg="3">
                <CInput
                  label="Nomor Tindak Lanjut"
                  :lazy="false"
                  :value.sync="$v.form.nomorTl.$model"
                  :is-valid="checkIfValid('nomorTl')"
                  placeholder="Nomor Tindak Lanjut"
                  autocomplete="nomorTl"
                  invalid-feedback="Nomor TL wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 3 -->
            <CRow class="mb-3">
              <CCol lg="6">
                <div>
                  <label class="typo__label">Kelompok TL</label>
                  <multiselect
                    v-if="optionsKlpTl"
                    v-model="valueKlpTl"
                    :options="optionsKlpTl"
                    :custom-label="viewSelectSearch"
                    placeholder="Select kelompok TL"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Kelompok Tindak Lanjut"
                  :lazy="false"
                  :value.sync="$v.form.userName.$model"
                  :is-valid="checkIfValid('userName')"
                  placeholder="Kelompok Tindak Lanjut"
                  autocomplete="username"
                  invalid-feedback="This is a required field and must be at least 5 character"
                /> -->
              </CCol>
              <CCol lg="6">
                <div>
                  <label class="typo__label">Sub Kelompok TL</label>
                  <multiselect
                    v-if="optionsSubKlpTl"
                    v-model="valueSubKlpTl"
                    :options="optionsSubKlpTl"
                    :custom-label="viewSelectSearch"
                    placeholder="Select sub kelompok TL"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Sub Kelompok Tindak Lanjut"
                  :lazy="false"
                  :value.sync="$v.form.userName.$model"
                  :is-valid="checkIfValid('userName')"
                  placeholder="Sub Kelompok Tindak Lanjut"
                  autocomplete="username"
                  invalid-feedback="This is a required field and must be at least 5 character"
                /> -->
              </CCol>
            </CRow>

            <!-- ROW 4 -->
            <CRow>
              <CCol lg="8">
                <CTextarea
                  label="Memo Tindak Lanjut"
                  :lazy="false"
                  :value.sync="$v.form.memoTl.$model"
                  :is-valid="checkIfValid('memoTl')"
                  placeholder="Memo Tindak Lanjut"
                  autocomplete="memoTl"
                  invalid-feedback="Memo TL wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 5 -->
            <CRow>
              <CCol lg="4">
                <CInput
                  label="Nilai Rekomendasi"
                  :value="$route.query.nilairekomendasi"
                  :disabled="true"
                />
              </CCol>
              <CCol lg="4">
                <CInput
                  type="number"
                  label="Nilai Tindak Lanjut"
                  :lazy="false"
                  :value.sync="$v.form.nilaiTl.$model"
                  :is-valid="checkIfValid('nilaiTl')"
                  placeholder="Nilai Tindak Lanjut"
                  autocomplete="nilaiTl"
                  invalid-feedback="Nilai TL wajib diisi"
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol lg="6">
                <label for="file-tl" class="block mb-2">Upload File TL</label>
                <input
                  id="file-tl"
                  type="file"
                  name="file-tl"
                  class="mb-4"
                  @change="onUploadTl"
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
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
      valueKlpTl: '',
      optionsKlpTl: [],
      valueSubKlpTl: '',
      optionsSubKlpTl: [],
      fileTl: '',
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
  watch: {
    valueKlpTl: function (val) {
      this.valueSubKlpTl = '';
      this.optionsSubKlpTl = [];
      this.$v.form.klpTl.$model = val.id;

      this.loadSubKlpTl({ id: this.valueKlpTl.id });
    },

    valueSubKlpTl: function (val) {
      this.$v.form.subKlpTl.$model = val.id;
    },
  },
  async mounted() {
    await this.loadKlpTl();
  },
  validations: {
    form: {
      nomorTl: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(1),
      },
      klpTl: {
        required,
      },
      subKlpTl: {
        required,
      },
      memoTl: {
        required,
      },
      nilaiTl: {
        required,
      },
      statusTl: {
        required,
      },
      accept: {
        required,
        mustAccept: (val) => val,
      },
    },
  },
  methods: {
    onUploadTl(e) {
      let file = e.target.files[0];
      this.fileTl = file;
    },

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

    async submit() {
      if (this.isValid) {
        this.submitted = true;

        const resultFormData = this.appendToFormData();

        try {
          if (this.mode == 'create') {
            this.loading = true;
            const responseData = await this.$store.dispatch(
              'module_tindak_lanjut/createTindakLanjut',
              resultFormData
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.push({
                  path: '/tindak-lanjut',
                });
                this.toastSuccess('Berhasil menyimpan data TL');
              }, 500);
            }
          }
        } catch (error) {
          setTimeout(() => {
            this.loading = false;
            this.toastError('Terjadi kesalahan saat submit data');
          }, 500);
        }
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
      return {
        nomorTl: '',
        klpTl: '',
        subKlpTl: '',
        memoTl: '',
        nilaiTl: 0,
        statusTl: 0,

        accept: false,
      };
    },

    appendToFormData() {
      const fd = new FormData();
      fd.append('kode_rekomendasi', this.$route.query.idrekomendasi);
      fd.append('kode_temuan', this.$route.query.idtemuan);
      fd.append('kode_lha', this.$route.query.idlha);
      fd.append('Nomor_TL', this.$v.form.nomorTl.$model);
      fd.append('Kode_Kelompok_TL', this.$v.form.klpTl.$model);
      fd.append('Kode_Sub_Kelompok_TL', this.$v.form.subKlpTl.$model);
      fd.append('Memo_TL', this.$v.form.memoTl.$model);
      fd.append('Nilai_TL', this.$v.form.nilaiTl.$model);
      fd.append('Status_TL', this.$v.form.statusTl.$model);
      fd.append('Upload_File_TL', this.fileTl);
      return fd;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
