<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Pelaku</h3>
        <h3 v-else>Edit Pelaku</h3>
      </div>
      <CCard>
        <!-- <CCardBody> -->
        <CForm>
          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="NIP"
                  :lazy="false"
                  :value.sync="$v.form.firstName.$model"
                  :is-valid="checkIfValid('firstName')"
                  placeholder="NIP"
                  autocomplete="given-name"
                  invalid-feedback="This is a required field and must be at least 2 characters"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  label="Nama Lengkap"
                  :lazy="false"
                  :value.sync="$v.form.userName.$model"
                  :is-valid="checkIfValid('userName')"
                  placeholder="Nama Lengkap"
                  autocomplete="username"
                  invalid-feedback="This is a required field and must be at least 5 character"
                />
              </CCol>
            </CRow>

            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <!-- V SELECT -->
                <CInput
                  label="Jabatan"
                  :lazy="false"
                  :value.sync="$v.form.userName.$model"
                  :is-valid="checkIfValid('userName')"
                  placeholder="Jabatan"
                  autocomplete="username"
                  invalid-feedback="This is a required field and must be at least 5 character"
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
                  :disabled="!isDirty"
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

export default {
  name: 'LhaForm',
  components: {
    ConfirmModal,
  },
  mixins: [validationMixin, mixin],
  props: ['mode', 'selectedItem'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      isOpenConfirm: false,
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
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(2),
      },
      userName: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
        strongPass: helpers.regex(
          'strongPass',
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        ),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password'),
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
      return {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        accept: false,
      };
    },
  },
};
</script>