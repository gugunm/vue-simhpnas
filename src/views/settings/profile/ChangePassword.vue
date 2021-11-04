<template>
  <CForm>
    <CRow class="mt-3">
      <CCol md="6">
        <CInput
          :is-valid="checkIfValid('oldPassword')"
          :value.sync="$v.form.oldPassword.$model"
          label="Password Lama"
          type="password"
          placeholder="Password lama"
          autocomplete="old-password"
          invalid-feedback="masukkan password lama anda"
        />
      </CCol>
    </CRow>
    <CRow class="mt-3">
      <CCol>
        <CInput
          :is-valid="checkIfValid('newPassword')"
          :value.sync="$v.form.newPassword.$model"
          label="Password Baru"
          type="password"
          placeholder="Password baru"
          autocomplete="new-password"
          invalid-feedback="password minimal terdiri dari: angka, huruf kapital dan non kapital, 8 karakter"
        />
      </CCol>
      <CCol>
        <CInput
          :is-valid="checkIfValid('confirmPassword')"
          :value.sync="$v.form.confirmPassword.$model"
          label="Confirm Password"
          type="password"
          placeholder="Konfirmasi password"
          autocomplete="confirm-password"
          invalid-feedback="konfirmasi password harus sama dengan password baru anda"
        />
      </CCol>
    </CRow>
    <div class="flex justify-end py-3">
      <CButton
        type="submit"
        color="info"
        class="px-5"
        :disabled="!isValid"
        @click="submit"
      >
        <div v-if="loading" class="px-8">
          <CSpinner color="white" size="sm" class="mr-2" />
        </div>
        <template v-else> Ubah Password </template>
      </CButton>
    </div>
  </CForm>
</template>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs, helpers } from 'vuelidate/lib/validators';

export default {
  name: 'ValidationForms',
  mixins: [validationMixin],
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

        this.loading = true;

        try {
          const response = await axios({
            method: 'POST',
            baseURL: this.$apiAddress,
            data: resultFormData,
            url: '/api/changepass',
            params: {
              token: localStorage.getItem('api_token'),
            },
          });

          if (response.status == 200) {
            setTimeout(() => {
              this.loading = false;
              // this.$router.go();
              this.reset();
              this.toastSuccess(response.data.message);
            }, 500);
          } else {
            this.loading = false;
            this.reset();
            this.toastError(response.data.message);
          }
        } catch (error) {
          setTimeout(() => {
            this.reset();
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
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      };
    },

    appendToFormData() {
      const fd = new FormData();

      fd.append('_method', 'PATCH');
      fd.append('oldPass', this.$v.form.oldPassword.$model);
      fd.append('newPass', this.$v.form.newPassword.$model);

      return fd;
    },

    toastSuccess(msg) {
      this.$toast.open({
        message: msg,
        type: 'success',
        position: 'top-right',
        duration: 3000,
      });
    },

    toastError(msg) {
      this.$toast.open({
        message: msg,
        type: 'error',
        position: 'top-right',
        duration: 5000,
      });
    },
  },
};
</script>