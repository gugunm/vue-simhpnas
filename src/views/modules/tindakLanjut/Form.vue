<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Tindak Lanjut</h3>
        <h3 v-else-if="mode == 'view'">Detail Tindak Lanjut</h3>
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
                  :value="
                    mode == 'view' || mode == 'edit'
                      ? editData.nomorLha || form.nomorLha
                      : $route.query.nolha
                  "
                  :disabled="true"
                />
              </CCol>
            </CRow>

            <!-- ROW 2 -->
            <CRow>
              <CCol lg="3">
                <CInput
                  label="Nomor Temuan"
                  :value="
                    mode == 'view' || mode == 'edit'
                      ? editData.nomorTemuan || form.nomorTemuan
                      : $route.query.notemuan
                  "
                  :disabled="true"
                />
              </CCol>
              <CCol lg="3">
                <CInput
                  label="Nomor Rekomendasi"
                  :value="
                    mode == 'view' || mode == 'edit'
                      ? editData.nomorRekomendasi || form.nomorRekomendasi
                      : $route.query.norekomendasi
                  "
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
                  :disabled="mode == 'view'"
                />
              </CCol>
            </CRow>

            <!-- ROW 3 -->
            <CRow class="mb-3">
              <CCol lg="6">
                <CInput
                  v-if="mode == 'view'"
                  label="Kelompok TL"
                  :value="form.kelompokTl"
                  :disabled="true"
                />
                <div v-else>
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
              </CCol>
              <CCol lg="6">
                <CInput
                  v-if="mode == 'view'"
                  label="Sub Kelompok TL"
                  :value="form.subKelompokTl"
                  :disabled="true"
                />
                <div v-else>
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
                  :disabled="mode == 'view'"
                />
              </CCol>
            </CRow>

            <!-- ROW 5 -->
            <CRow>
              <CCol v-if="mode == 'create'" lg="4">
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
                  :disabled="mode == 'view'"
                />
              </CCol>
            </CRow>

            <!-- editData.uploadFileTl -->
            <!-- <CRow v-if="mode == 'edit' && fileTl"> -->
            <CRow v-if="mode == 'edit' && editData.uploadFileTl">
              <CCol>
                <CButton
                  color="danger"
                  shape="pill"
                  class="px-3 mb-3"
                  size="sm"
                  @click="onDeleteFileUpdate"
                >
                  Hapus File
                </CButton>
                <!-- <p class="mb-3">
                  {{ 'Tampilin Data : ' + fileTl }}
                </p> -->
              </CCol>
            </CRow>
            <CRow
              v-else-if="
                (mode == 'edit' && !editData.uploadFileTl) || mode == 'create'
              "
            >
              <CCol lg="6">
                <div class="flex flex-col">
                  <label for="file-tl" class="block mb-3"
                    >Upload File Tindak Lanjut</label
                  >
                  <div class="flex items-center mb-4">
                    <CSwitch
                      class="mx-1 mr-3"
                      color="info"
                      variant="3d"
                      v-bind="labelIcon"
                      :checked.sync="isStoredTl"
                    />
                    <span v-if="isStoredTl"
                      >Upload File Tindak Lanjut di Server SIMHPNAS</span
                    >
                    <span v-else>
                      Upload File Tindak Lanjut di Server Internal
                    </span>
                  </div>
                  <input
                    v-if="isStoredTl"
                    id="file-tl"
                    type="file"
                    name="file-tl"
                    class="mb-4"
                    @change="onUploadTl"
                  />
                  <CInput
                    v-else
                    class="mb-4"
                    :lazy="false"
                    placeholder="http://server-anda.com/file-tl.pdf"
                    :value.sync="fileTl"
                  />
                </div>
              </CCol>
            </CRow>

            <CRow v-if="mode != 'view'">
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

            <!-- <embed
              v-if="mode == 'view'"
              :src="
                'http://simhpnas.bpkp.go.id:8001/storage/' + form.uploadFileTl
              "
              type="application/pdf"
              width="100%"
              height="600px"
            />
            <embed
              v-else-if="mode == 'edit'"
              :src="
                'http://simhpnas.bpkp.go.id:8001/storage/' +
                editData.uploadFileTl
              "
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div> -->

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
  props: ['mode', 'selectedItem', 'idTl'],
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
      editData: {},
      labelIcon: {
        labelOn: '\u2713',
        labelOff: '\u2715',
      },
      isStoredTl: true,
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
    if (this.mode == 'view') {
      await this.loadTlById();
    } else if (this.mode == 'edit') {
      await this.loadEditTlById();

      this.isStoredTl = this.editData.isStored == 1 ? true : false;

      this.fileTl = this.editData.uploadFileTl;

      this.valueKlpTl = this.optionsKlpTl.filter(
        (data) => data.id == this.form.klpTl
      )[0];

      await this.loadSubKlpTl({ id: this.valueKlpTl.id });
      this.valueSubKlpTl = this.optionsSubKlpTl.filter(
        (data) => data.id == this.form.subKlpTl
      )[0];
    }
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
    onDeleteFileUpdate() {
      this.editData.uploadFileTl = '';
      this.fileTl = '';
    },

    onUploadTl(e) {
      let file = e.target.files[0];
      this.fileTl = file;
    },

    convertBoolean(val) {
      if (val == true) {
        return 1;
      } else {
        return 0;
      }
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
          } else if (this.mode == 'edit') {
            this.loading = true;

            const responseData = await this.$store.dispatch(
              'module_tindak_lanjut/updateTindakLanjutById',
              {
                idTl: this.editData.id,
                data: resultFormData,
              }
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.push({
                  path: '/tindak-lanjut',
                });
                this.toastSuccess('Berhasil edit data TL');
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

      if (this.mode == 'edit') {
        fd.append('_method', 'PATCH');
      } else if (this.mode == 'create') {
        fd.append('kode_rekomendasi', this.$route.query.idrekomendasi);
        fd.append('kode_temuan', this.$route.query.idtemuan);
        fd.append('kode_lha', this.$route.query.idlha);
      }

      fd.append('is_stored', this.convertBoolean(this.isStoredTl));
      fd.append('Upload_File_TL', this.fileTl);

      fd.append('Nomor_TL', this.$v.form.nomorTl.$model);
      fd.append('Kode_Kelompok_TL', this.$v.form.klpTl.$model);
      fd.append('Kode_Sub_Kelompok_TL', this.$v.form.subKlpTl.$model);
      fd.append('Memo_TL', this.$v.form.memoTl.$model);
      fd.append('Nilai_TL', this.$v.form.nilaiTl.$model);
      fd.append('Status_TL', this.$v.form.statusTl.$model);

      // fd.append('Upload_File_TL', this.fileTl);
      return fd;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
