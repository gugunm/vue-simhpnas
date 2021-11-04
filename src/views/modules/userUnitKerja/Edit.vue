<template>
  <div>
    <CRow>
      <CCol sm="12">
        <div class="text-2xl mb-4 font-semibold">
          <h3>Edit Admin Unit</h3>
        </div>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol lg="12">
            <CForm>
              <CRow>
                <CCol lg="6">
                  <CInput
                    label="Nama User"
                    :lazy="false"
                    :value.sync="$v.form.name.$model"
                    :is-valid="checkIfValid('name')"
                    placeholder="Nama"
                    autocomplete="name"
                    invalid-feedback="nama wajib diisi"
                  />
                </CCol>
              </CRow>
              <CRow class="mb-2">
                <CCol lg="6">
                  <CInput
                    label="Email"
                    type="email"
                    :lazy="false"
                    :value.sync="$v.form.email.$model"
                    :is-valid="checkIfValid('email')"
                    placeholder="email@email.com"
                    autocomplete="email"
                    invalid-feedback="email wajib diisi dengan format yang valid"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="6">
                  <div>
                    <label>Role</label>
                    <multiselect
                      v-if="optionsLevel"
                      v-model="valueLevel"
                      deselect-label="Can't remove this value"
                      track-by="deskripsiLevel"
                      label="deskripsiLevel"
                      placeholder="Select role"
                      :options="optionsLevel"
                      :searchable="true"
                      :allow-empty="false"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">
                        <p>
                          {{ option.deskripsiLevel }}
                        </p>
                      </template>
                    </multiselect>
                  </div>
                </CCol>
                <CCol lg="6">
                  <div>
                    <label>Sub Unit Audit</label>
                    <multiselect
                      v-if="optionsSubUnitAudit"
                      v-model="valueSubUnitAudit"
                      deselect-label="Can't remove this value"
                      track-by="deskripsi"
                      label="deskripsi"
                      placeholder="Select unit audit"
                      :options="optionsSubUnitAudit"
                      :searchable="true"
                      :allow-empty="false"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">
                        <p>
                          {{ option.deskripsi }}
                        </p>
                      </template>
                    </multiselect>
                  </div>
                </CCol>
              </CRow>
              <CInputCheckbox
                :is-valid="checkIfValid('accept')"
                :checked.sync="$v.form.accept.$model"
                label="I accept the terms of use"
                invalid-feedback="You must accept before submitting"
                custom
                class="my-4"
              />
              <CRow class="mt-10 view-form">
                <CCol sm="12" lg="6">
                  <CButton
                    variant="outline"
                    color="dark"
                    @click="$router.go(-1)"
                  >
                    Kembali
                  </CButton>
                </CCol>
                <CCol sm="12" md="6" class="content-center justify-end pr-3">
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
                    @click="submit"
                  >
                    <div v-if="loading" class="px-8">
                      <CSpinner color="white" size="sm" class="mr-2" />
                    </div>
                    <template v-else> Submit Data </template>
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import mixin from './mixin';

export default {
  name: 'ValidationForms',
  components: {
    Multiselect,
  },
  mixins: [validationMixin, mixin],
  props: ['idUserUnitKerja'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      valueLevel: '',
      optionsLevel: [],
      valueSubUnitAudit: '',
      optionsSubUnitAudit: [],
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
    valueLevel: function (val) {
      this.$v.form.level.$model = val.kodeLevel;
    },
    valueSubUnitAudit: function (val) {
      this.$v.form.kodeSubUnitAudit.$model = val.id;
    },
  },
  async mounted() {
    await this.loadEditUserUnitById();

    await this.loadLevelUser();
    this.valueLevel = this.optionsLevel.filter(
      (data) => data.kodeLevel == this.form.level
    )[0];

    await this.loadSubUnitAudit();
    this.valueSubUnitAudit = this.optionsSubUnitAudit.filter(
      (data) => data.id == this.form.kodeSubUnitAudit
    )[0];
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      level: {
        required,
      },
      kodeSubUnitAudit: {
        required,
      },
      accept: {
        required,
        mustAccept: (val) => val,
      },
    },
  },
  methods: {
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
          this.loading = true;

          const response = await this.$store.dispatch(
            'm_user_unit/updateUserUnit',
            {
              data: resultFormData,
              idUser: this.idUserUnitKerja,
            }
          );

          if (response.status == 200) {
            setTimeout(() => {
              this.loading = false;
              this.$router.back();
              this.toastSuccess(response.data.message);
            }, 500);
          } else {
            this.toastError(response.data.message);
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
        name: '',
        email: '',
        level: '',
        kodeSubUnitAudit: '',
        accept: false,
      };
    },

    appendToFormData() {
      const fd = new FormData();

      fd.append('_method', 'PATCH');
      fd.append('name', this.$v.form.name.$model);
      fd.append('email', this.$v.form.email.$model);
      fd.append('Kode_Sub_Unit_Audit', this.$v.form.kodeSubUnitAudit.$model);
      fd.append('level', this.$v.form.level.$model);

      return fd;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
