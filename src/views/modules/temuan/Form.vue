<template>
  <CRow class="mb-4">
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Temuan</h3>
        <h3 v-else-if="mode == 'view'">Detail Temuan</h3>
        <h3 v-else>Edit Temuan</h3>
      </div>
      <CCard>
        <!-- <CCardBody> -->
        <CForm>
          <div v-if="!isAuditTpk" class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">Data Temuan</h5>
          </div>
          <div v-else class="p-3" style="background: #f9fafb">
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
                  :value="mode == 'view' ? form.nomorLha : $route.query.nolha"
                  :disabled="true"
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
                  invalid-feedback="Nomor Temuan wajib diisi 1-2 angka"
                  :disabled="true"
                />
              </CCol>
            </CRow>

            <CRow v-if="mode == 'view'" class="mb-3">
              <CCol lg="12">
                <CInput
                  v-if="mode == 'view'"
                  label="Jenis Temuan"
                  :value="form.jenisTemuan"
                  :disabled="true"
                />
              </CCol>
              <CCol lg="12">
                <CInput
                  v-if="mode == 'view'"
                  label="Kelompok Temuan"
                  :value="form.kelompokTemuan"
                  :disabled="true"
                />
              </CCol>
              <CCol lg="12">
                <CInput
                  v-if="mode == 'view'"
                  label="Sub Kelompok Temuan"
                  :value="form.subKelompokTemuan"
                  :disabled="true"
                />
              </CCol>
            </CRow>

            <!-- ROW 3 -->
            <CRow v-else class="mb-3">
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
              </CCol>
              <CCol lg="4">
                <div>
                  <label class="typo__label">Kelompok Temuan</label>
                  <multiselect
                    v-if="optionsKlpTemuan"
                    v-model="valueKlpTemuan"
                    :options="optionsKlpTemuan"
                    :custom-label="viewSelectSearch"
                    placeholder="Select kelompok temuan"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
              </CCol>
              <CCol lg="4">
                <div>
                  <label class="typo__label">Sub Kelompok Temuan</label>
                  <multiselect
                    v-if="optionsSubKlpTemuan"
                    v-model="valueSubKlpTemuan"
                    :options="optionsSubKlpTemuan"
                    :custom-label="viewSelectSearch"
                    placeholder="Select sub kelompok temuan"
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
                  :label="
                    isAuditTpk ? 'Memo Temuan / Uraian Kasus' : 'Memo Temuan'
                  "
                  :lazy="false"
                  :value.sync="$v.form.memoTemuan.$model"
                  :is-valid="checkIfValid('memoTemuan')"
                  placeholder="Memo Temuan"
                  autocomplete="memoTemuan"
                  invalid-feedback="Memo Temuan wajib diisi"
                  :disabled="mode == 'view'"
                />
              </CCol>
            </CRow>

            <CRow class="mb-4 mt-2">
              <CCol lg="6">
                <div class="flex items-center">
                  <p class="inline-block mr-3 font-semibold">
                    {{ isAuditTpk ? '' : 'Bukan' }} Temuan Investigatif
                  </p>
                  <CSwitch
                    disabled
                    class="mx-1"
                    color="danger"
                    variant="3d"
                    v-bind="labelIcon"
                    :checked.sync="isAuditTpk"
                  />
                </div>
              </CCol>
            </CRow>

            <!-- ROW 5 -->
            <div v-if="isAuditTpk">
              <CRow>
                <CCol lg="2">
                  <CInput
                    v-if="mode == 'view'"
                    label="Posisi Kasus"
                    :value="form.posisiKasus"
                    :disabled="true"
                  />
                  <CInput
                    v-else
                    label="Posisi Kasus"
                    :lazy="false"
                    :value.sync="$v.form.posisiKasus.$model"
                    :is-valid="checkIfValid('posisiKasus')"
                    placeholder="Posisi Kasus"
                    autocomplete="posisiKasus"
                    invalid-feedback="Posisi Kasus wajib diisi 1-2 angka"
                  />
                </CCol>
              </CRow>

              <!-- ROW 6 -->
              <CRow>
                <CCol lg="8">
                  <CTextarea
                    v-if="mode == 'view'"
                    label="Modus Operandi"
                    :value="form.modusOperandi"
                    :disabled="true"
                  />
                  <CTextarea
                    v-else
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
            </div>

            <!-- ROW 7 -->
            <CRow>
              <CCol lg="4">
                <CInput
                  type="number"
                  :label="
                    isAuditTpk
                      ? 'Nilai Temuan (Jumlah Kerugian Negara)'
                      : 'Nilai Temuan'
                  "
                  :lazy="false"
                  :value.sync="$v.form.nilaiTemuan.$model"
                  :is-valid="checkIfValid('nilaiTemuan')"
                  placeholder="Nilai Temuan"
                  autocomplete="nilaiTemuan"
                  invalid-feedback="Nilai Temuan wajib diisi"
                  :disabled="mode == 'view'"
                />
              </CCol>
            </CRow>

            <!-- ROW 8 -->
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
  props: ['mode', 'selectedItem', 'idTemuan'],
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
      valueKlpTemuan: '',
      optionsKlpTemuan: [],
      valueSubKlpTemuan: '',
      optionsSubKlpTemuan: [],
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
    valueJenisTemuan: function (val) {
      this.$v.form.jenisTemuan.$model = val.id;
      this.valueKlpTemuan = '';
      this.optionsKlpTemuan = [];
      this.loadKlpTemuan();
    },
    valueKlpTemuan: function (val) {
      this.$v.form.klpTemuan.$model = val.id;
      this.valueSubKlpTemuan = '';
      this.optionsSubKlpTemuan = [];
      this.loadSubKlpTemuan();
    },
    valueSubKlpTemuan: function (val) {
      this.$v.form.subKlpTemuan.$model = val.id;
    },
    isAuditTpk: function (val) {
      if (!val) {
        this.$v.form.posisiKasus.$model = 0;
        this.$v.form.modusOperandi.$model = 'TIDAK ADA';
      } else {
        this.$v.form.posisiKasus.$model = '';
        this.$v.form.modusOperandi.$model = '';
      }
    },
  },
  async mounted() {
    await this.loadJenisTemuan();
    if (this.$route.query.tpk == 0) {
      this.isAuditTpk = false;
    } else {
      this.isAuditTpk = true;
    }
    if (this.mode == 'view') {
      await this.loadTemuanById();
      if (this.form.flagTpk == 0) {
        this.isAuditTpk = false;
      } else {
        this.isAuditTpk = true;
      }
    }
  },
  validations: {
    form: {
      nomorTemuan: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(2),
      },
      jenisTemuan: { required },
      klpTemuan: { required },
      subKlpTemuan: { required },
      memoTemuan: { required, minLength: minLength(2) },
      posisiKasus: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(2),
      },
      modusOperandi: { required, minLength: minLength(2) },
      nilaiTemuan: { required },
      accept: {
        required,
        mustAccept: (val) => val,
      },
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

    async submit() {
      if (this.isValid) {
        this.submitted = true;

        const resultFormData = this.appendToFormData();

        try {
          if (this.mode == 'create') {
            this.loading = true;
            const responseData = await this.$store.dispatch(
              'module_temuan/createTemuan',
              resultFormData
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.push({
                  path: '/temuan',
                });
                this.toastSuccess(
                  'Berhasil menyimpan data dengan ID ' +
                    responseData.Nomor_Temuan
                );
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
        nomorTemuan: '',
        jenisTemuan: '',
        klpTemuan: '',
        subKlpTemuan: '',
        memoTemuan: '',
        posisiKasus: 0,
        modusOperandi: 'TIDAK ADA',
        nilaiTemuan: 0,
        accept: false,
      };
    },

    appendToFormData() {
      const fd = new FormData();
      fd.append('kode_lha', this.$route.query.idlha);
      fd.append('Nomor_Temuan', this.$v.form.nomorTemuan.$model);
      fd.append('Kode_Jenis_Temuan', this.$v.form.jenisTemuan.$model);
      fd.append('Kode_Kelompok_Temuan', this.$v.form.klpTemuan.$model);
      fd.append('Kode_Sub_Kelompok_Temuan', this.$v.form.subKlpTemuan.$model);
      fd.append('Memo_Temuan', this.$v.form.memoTemuan.$model);
      fd.append('Posisi_Kasus', this.$v.form.posisiKasus.$model);
      fd.append('Modus_Operandi', this.$v.form.modusOperandi.$model);
      fd.append('Flag_TPK', this.$route.query.tpk);
      fd.append('Nilai_Temuan', this.$v.form.nilaiTemuan.$model);
      return fd;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
