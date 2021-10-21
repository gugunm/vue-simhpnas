<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Rekomendasi</h3>
        <h3 v-else-if="mode == 'view'">Detail Rekomendasi</h3>
        <h3 v-else>Edit Rekomendasi</h3>
      </div>
      <CCard>
        <!-- <CCardBody> -->
        <CForm>
          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">
              Data Rekomendasi (Termasuk untuk TPK)
            </h5>
          </div>
          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor LHA"
                  :value="
                    mode == 'view' || mode == 'edit'
                      ? form.nomorLha || editData.nomorLha
                      : $route.query.nolha
                  "
                  :disabled="true"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  label="Nomor Temuan"
                  :value="
                    mode == 'view' || mode == 'edit'
                      ? form.nomorTemuan || editData.nomorTemuan
                      : $route.query.notemuan
                  "
                  :disabled="true"
                />
              </CCol>
            </CRow>

            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor Rekomendasi"
                  :lazy="false"
                  :value.sync="$v.form.nomorRekomendasi.$model"
                  :is-valid="checkIfValid('nomorRekomendasi')"
                  placeholder="Nomor Rekomendasi"
                  autocomplete="nomorRekomendasi"
                  invalid-feedback="Nomor Rekomendasi wajib diisi 1-2 angka"
                  :disabled="mode == 'view'"
                />
              </CCol>
            </CRow>

            <CRow v-if="mode == 'view'" class="mb-3">
              <CCol lg="12">
                <CInput
                  v-if="mode == 'view'"
                  label="Kode Rekomendasi"
                  :value="form.kelompokRekomendasi"
                  :disabled="true"
                />
              </CCol>
              <CCol lg="12">
                <CInput
                  v-if="mode == 'view'"
                  label="Kode Rekomendasi"
                  :value="form.subKelompokRekomendasi"
                  :disabled="true"
                />
              </CCol>
            </CRow>

            <!-- ROW 3 -->
            <CRow v-else class="mb-3">
              <CCol lg="6">
                <div>
                  <label class="typo__label">Kode Rekomendasi</label>
                  <multiselect
                    v-if="optionsRekomendasi"
                    v-model="valueRekomendasi"
                    :options="optionsRekomendasi"
                    :custom-label="viewSelectSearch"
                    placeholder="Select kode rekomendasi"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
              </CCol>
              <CCol lg="6">
                <div>
                  <label class="typo__label">Sub Kelompok Rekomendasi</label>
                  <multiselect
                    v-if="optionsSubKlpRekomendasi"
                    v-model="valueSubKlpRekomendasi"
                    :options="optionsSubKlpRekomendasi"
                    :custom-label="viewSelectSearch"
                    placeholder="Select sub kelompok rekomendasi"
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
                  label="Memo Rekomendasi"
                  :lazy="false"
                  :value.sync="$v.form.memoRekomendasi.$model"
                  :is-valid="checkIfValid('memoRekomendasi')"
                  placeholder="Memo Rekomendasi"
                  autocomplete="memoRekomendasi"
                  invalid-feedback="Memo Rekomendasi wajib diisi"
                  :disabled="mode == 'view'"
                />
              </CCol>
            </CRow>

            <!-- ROW 5 -->
            <CRow>
              <CCol lg="4">
                <CInput
                  label="Nilai Rekomendasi"
                  :value="
                    mode == 'view' || mode == 'edit'
                      ? editData.nilaiRekomendasi || form.nilaiRekomendasi
                      : $route.query.nilaitemuan
                  "
                  :disabled="true"
                />
              </CCol>
              <CCol lg="6">
                <label class="typo__label mb-3">Pelaku</label>
                <div class="flex items-center">
                  <CSwitch
                    :disabled="mode == 'view'"
                    class="mr-4"
                    color="warning"
                    variant="3d"
                    v-bind="labelIcon"
                    :checked.sync="isPelaku"
                  />
                  <p class="inline-block mr-3 font-semibold uppercase">
                    {{
                      isPelaku
                        ? 'Terdapat pelaku dalam rekomendasi'
                        : 'Rekomendasi tanpa pelaku'
                    }}
                  </p>
                </div>
              </CCol>
            </CRow>

            <!-- ROW 6 -->
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
  props: ['mode', 'selectedItem', 'idRekomendasi'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      isOpenConfirm: false,
      isPelaku: false,
      labelIcon: {
        labelOn: '\u2713',
        labelOff: '\u2715',
      },
      valueRekomendasi: '',
      optionsRekomendasi: [],
      valueSubKlpRekomendasi: '',
      optionsSubKlpRekomendasi: [],
      editData: {},
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
    valueRekomendasi: function (val) {
      this.valueSubKlpRekomendasi = '';
      this.optionsSubKlpRekomendasi = [];
      this.$v.form.klpRekomendasi.$model = val.id;

      this.loadSubKlpRekomendasi();
    },
    valueSubKlpRekomendasi: function (val) {
      this.$v.form.subKlpRekomendasi.$model = val.id;
    },
    isPelaku: function (val) {
      if (val) {
        this.$v.form.flagPelaku.$model = 1;
      } else {
        this.$v.form.flagPelaku.$model = 0;
      }
    },
  },
  async mounted() {
    if (this.mode == 'create') {
      await this.loadSearchRekomendasi();
    } else if (this.mode == 'view') {
      await this.loadRekomendasiById();
    } else if (this.mode == 'edit') {
      await this.loadEditRekomendasiById();

      await this.loadSearchRekomendasi();
      this.valueRekomendasi = this.optionsRekomendasi.filter(
        (rek) => rek.id == this.form.klpRekomendasi
      )[0];

      await this.loadSubKlpRekomendasi();
      this.valueSubKlpRekomendasi = this.optionsSubKlpRekomendasi.filter(
        (rek) => rek.id == this.form.subKlpRekomendasi
      )[0];
    }

    if (this.form.flagPelaku == 0 || this.editData.flagPelaku == 0) {
      this.isPelaku = false;
    } else {
      this.isPelaku = true;
    }
  },
  validations: {
    form: {
      nomorRekomendasi: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(2),
      },
      klpRekomendasi: { required },
      subKlpRekomendasi: { required },
      memoRekomendasi: { required },
      flagPelaku: { required },
      nilaiRekomendasi: { required },
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
              'module_rekomendasi/createRekomendasi',
              resultFormData
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.push({
                  path: '/rekomendasi',
                });
                this.toastSuccess(
                  'Berhasil menyimpan data dengan ID ' +
                    responseData.Nomor_Rekomendasi
                );
              }, 500);
            }
          } else if (this.mode == 'edit') {
            this.loading = true;

            const responseData = await this.$store.dispatch(
              'module_rekomendasi/updateRekomendasiById',
              {
                idRekomendasi: this.editData.id,
                data: resultFormData,
              }
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.push({
                  path: '/rekomendasi',
                });
                this.toastSuccess(
                  'Berhasil edit data dengan ID ' +
                    responseData.Nomor_Rekomendasi
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
        nomorRekomendasi: '',
        klpRekomendasi: '',
        subKlpRekomendasi: '',
        memoRekomendasi: '',
        flagPelaku: 0,
        nilaiRekomendasi: 0,
        accept: false,
      };
    },

    appendToFormData() {
      const fd = new FormData();

      if (this.mode == 'edit') {
        fd.append('_method', 'PATCH');
      } else if (this.mode == 'create') {
        fd.append('kode_temuan', this.$route.query.idtemuan);
        fd.append('kode_lha', this.$route.query.idlha);
        fd.append('Nilai_Rekomendasi', this.$route.query.nilaitemuan);
      }

      fd.append('Nomor_Rekomendasi', this.$v.form.nomorRekomendasi.$model);
      fd.append(
        'Kode_Kelompok_Rekomendasi',
        this.$v.form.klpRekomendasi.$model
      );
      fd.append(
        'Kode_Sub_Kelompok_Rekomendasi',
        this.$v.form.subKlpRekomendasi.$model
      );
      fd.append('Memo_Rekomendasi', this.$v.form.memoRekomendasi.$model);
      fd.append('Flag_Pelaku', this.$v.form.flagPelaku.$model);

      return fd;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
