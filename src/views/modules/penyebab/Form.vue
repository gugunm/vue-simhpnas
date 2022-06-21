<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">
          Create Penyebab
        </h3>
        <h3 v-else-if="mode == 'view'">
          Detail Penyebab
        </h3>
        <h3 v-else>
          Edit Penyebab
        </h3>
      </div>
      <CCard>
        <!-- <CCardBody> -->
        <CForm @submit.prevent="submit">
          <div
            class="p-3"
            style="background: #f9fafb"
          >
            <h5 class="text-base font-semibold">
              Data Penyebab (Termasuk untuk TPK)
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
            <CRow class="mb-3">
              <CCol lg="6">
                <CInput
                  label="Nomor Penyebab"
                  :lazy="false"
                  :value.sync="$v.form.nomorPenyebab.$model"
                  :is-valid="checkIfValid('nomorPenyebab')"
                  placeholder="Nomor Penyebab"
                  autocomplete="nomorPenyebab"
                  invalid-feedback="Nomor Penyebab wajib diisi 1-2 angka"
                  :disabled="mode == 'view'"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  v-if="mode == 'view'"
                  label="Penyebab"
                  :value="`${form.refKodePenyebab} - ${form.deskripsi}`"
                  :disabled="true"
                />
                <div v-else>
                  <label class="typo__label">Kode Penyebab</label>
                  <multiselect
                    v-if="optionsPenyebab"
                    v-model="valuePenyebab"
                    :options="optionsPenyebab"
                    :custom-label="viewSelectSearch"
                    placeholder="Select kode penyebab"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
              </CCol>
            </CRow>

            <!-- ROW 3 -->
            <CRow>
              <CCol lg="8">
                <CTextarea
                  label="Memo Penyebab"
                  :lazy="false"
                  :value.sync="$v.form.memoPenyebab.$model"
                  :is-valid="checkIfValid('memoPenyebab')"
                  placeholder="Memo Penyebab"
                  autocomplete="memoPenyebab"
                  invalid-feedback="Memo wajib diisi"
                  :disabled="mode == 'view'"
                />
              </CCol>
            </CRow>

            <!-- ROW 4 -->
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
              <CCol
                sm="12"
                lg="6"
                class="mb-3"
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
                  :disabled="!isValid"
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
  props: ['mode', 'selectedItem', 'idPenyebab'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      isOpenConfirm: false,
      valuePenyebab: '',
      optionsPenyebab: [],
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
    valuePenyebab: function (val) {
      this.$v.form.kodePenyebab.$model = val.id;
    },
  },
  async mounted() {
    await this.loadKodePenyebab();
    if (this.mode == 'view') {
      await this.loadPenyebabById();
    } else if (this.mode == 'edit') {
      await this.loadEditPenyebabById();

      this.valuePenyebab = this.optionsPenyebab.filter(
        (penyebab) => penyebab.id == this.form.kodePenyebab
      )[0];
    }
  },
  validations: {
    form: {
      nomorPenyebab: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(2),
      },
      kodePenyebab: { required },
      memoPenyebab: { required },

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
              'module_penyebab/createPenyebab',
              resultFormData
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.back();
                this.toastSuccess(
                  'Berhasil menyimpan data dengan ID ' +
                    responseData.Nomor_Penyebab
                );
              }, 500);
            }
          } else if (this.mode == 'edit') {
            this.loading = true;
            const responseData = await this.$store.dispatch(
              'module_penyebab/updatePenyebabById',
              {
                idPenyebab: this.editData.id,
                data: resultFormData,
              }
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.back();
                this.toastSuccess(
                  'Berhasil edit data dengan ID ' + responseData.Nomor_Penyebab
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
        nomorPenyebab: '',
        kodePenyebab: '',
        memoPenyebab: '',

        accept: false,
      };
    },

    appendToFormData() {
      const fd = new FormData();
      if (this.mode == 'create') {
        fd.append('kode_temuan', this.$route.query.idtemuan);
        fd.append('kode_lha', this.$route.query.idlha);
      } else if (this.mode == 'edit') {
        fd.append('_method', 'PATCH');
      }
      fd.append('Nomor_Penyebab', this.$v.form.nomorPenyebab.$model);
      fd.append('Ref_Kode_Penyebab', this.$v.form.kodePenyebab.$model);
      fd.append('Memo_Penyebab', this.$v.form.memoPenyebab.$model);
      return fd;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
