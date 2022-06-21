<template>
  <div>
    <CRow>
      <CCol sm="12">
        <div class="text-2xl mb-4 font-semibold">
          <h3>Update Password User</h3>
        </div>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol lg="12">
            <CForm>
              <CRow class="mt-3">
                <CCol md="6">
                  <CInput
                    :is-valid="checkIfValid('oldPassword')"
                    :value.sync="$v.form.oldPassword.$model"
                    label="Password Lama"
                    type="password"
                    placeholder="********"
                    autocomplete="old-password"
                    invalid-feedback="password minimal terdiri dari 8 karakter"
                  />
                  <CInput
                    :is-valid="checkIfValid('newPassword')"
                    :value.sync="$v.form.newPassword.$model"
                    label="Password Baru"
                    type="password"
                    placeholder="********"
                    autocomplete="new-password"
                    invalid-feedback="password minimal terdiri dari: angka, huruf kapital dan non kapital, 8 karakter"
                  />
                  <CInput
                    :is-valid="checkIfValid('confirmPassword')"
                    :value.sync="$v.form.confirmPassword.$model"
                    label="Confirm Password"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    invalid-feedback="konfirmasi password harus sama dengan password"
                  />
                </CCol>
              </CRow>
              <CInputCheckbox
                :is-valid="checkIfValid('accept')"
                :checked.sync="$v.form.accept.$model"
                label="I accept the terms of use"
                invalid-feedback="You must accept before submitting"
                custom
                class="mb-4"
              />
              <CRow class="mt-10 view-form">
                <CCol
                  sm="12"
                  lg="6"
                >
                  <CButton
                    variant="outline"
                    color="dark"
                    @click="$router.go(-1)"
                  >
                    Kembali
                  </CButton>
                </CCol>
                <CCol
                  sm="12"
                  md="6"
                  class="content-center justify-end pr-3"
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
            </CForm>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs, helpers } from 'vuelidate/lib/validators';
import mixin from './mixin';

export default {
  name: 'ValidationForms',
  mixins: [validationMixin, mixin],
  props: ['idUserUtama'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
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
  validations: {
    form: {
      oldPassword: {
        required,
        minLength: minLength(8),
      },
      newPassword: {
        required,
        minLength: minLength(8),
        strongPass: helpers.regex(
          'strongPass',
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        ),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('newPassword'),
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

        // const resultFormData = this.appendToFormData();

        // try {
        //   this.loading = true;

        //   const responseData = await this.$store.dispatch(
        //     'm_user_utama/createUserUtama',
        //     resultFormData
        //   );

        //   if (responseData) {
        //     setTimeout(() => {
        //       this.loading = false;
        //       this.$router.back();
        //       this.toastSuccess('Berhasil menyimpan data user');
        //     }, 500);
        //   }
        // } catch (error) {
        //   setTimeout(() => {
        //     this.loading = false;
        //     this.toastError('Terjadi kesalahan saat submit data');
        //   }, 500);
        // }
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
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        accept: false,
      };
    },

    appendToFormData() {
      const fd = new FormData();

      fd.append('_method', 'PATCH');
      fd.append('oldPassword', this.$v.form.oldPassword.$model);
      fd.append('newPassword', this.$v.form.newPassword.$model);

      return fd;
    },
  },
};
</script>

