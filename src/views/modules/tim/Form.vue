<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Tim Audit</h3>
        <h3 v-else-if="mode == 'view'">Detail Tim Audit</h3>
        <h3 v-else>Edit Tim Audit</h3>
      </div>
      <div v-if="mode == 'create'" class="mb-4">
        <CAlert
          v-if="items.length > 0"
          color="info"
          close-button
          :show.sync="alertMembers"
        >
          <p class="text-sm font-semibold">Tim audit yang telah di entry</p>
          <div class="pl-4 pt-2">
            <ol class="list-decimal text-sm">
              <li v-for="item in items" :key="item.id" class="leading-loose">
                {{ item.nama }} - ({{ item.kodePeran }}) {{ item.peran }}
              </li>
            </ol>
          </div>
        </CAlert>
      </div>
      <CCard>
        <!-- <CCardBody> -->
        <CForm>
          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">Data Tim Audit</h5>
          </div>
          <div class="p-3">
            <!-- ROW 1 -->
            <CRow class="mb-3">
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
                  v-if="mode == 'view'"
                  label="Peran"
                  :value="form.peran"
                  :disabled="true"
                />
                <div v-else>
                  <label>Peran</label>
                  <multiselect
                    v-if="optionsPeran"
                    v-model="valuePeran"
                    :options="optionsPeran"
                    :custom-label="viewSelectSearch"
                    placeholder="Select peran"
                    label="deskeripsi"
                    track-by="deskripsi"
                  />
                </div>
              </CCol>
            </CRow>
            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="NIP"
                  :lazy="false"
                  :value.sync="$v.form.nip.$model"
                  :is-valid="checkIfValid('nip')"
                  placeholder="NIP"
                  autocomplete="nip"
                  invalid-feedback="NIP wajib diisi"
                  :disabled="mode == 'view'"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  label="Nama Lengkap"
                  :lazy="false"
                  :value.sync="$v.form.nama.$model"
                  :is-valid="checkIfValid('nama')"
                  placeholder="Nama Lengkap"
                  autocomplete="nama"
                  invalid-feedback="Nama Lengkap wajib diisi"
                  :disabled="mode == 'view'"
                />
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
          </div>

          <div class="px-3">
            <CRow class="mb-2 view-form">
              <CCol sm="12" lg="6" class="mb-3">
                <CButton
                  v-if="mode != 'view'"
                  variant="outline"
                  color="dark"
                  @click="$router.go(-1)"
                >
                  <!-- @click="isOpenConfirm = true" -->
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
    <!-- <confirm-modal
      v-model="isOpenConfirm"
      @close-modal="isOpenConfirm = false"
      @confirm-ok="$router.go(-1)"
    /> -->
  </CRow>
</template>



<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
// import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import mixin from './mixin';
import Multiselect from 'vue-multiselect';

export default {
  name: 'LhaForm',
  components: {
    // ConfirmModal,
    Multiselect,
  },
  mixins: [validationMixin, mixin],
  props: ['mode', 'selectedItem', 'idTim', 'items'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      isOpenConfirm: false,
      valuePeran: '',
      optionsPeran: [],
      editData: {},
      alertMembers: true,
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
    valuePeran: function (val) {
      this.$v.form.peran.$model = val.kodePeran;
    },
  },
  async mounted() {
    await this.loadPeran();
    if (this.mode == 'view') {
      await this.loadTimById();
    } else if (this.mode == 'edit') {
      await this.loadEditTimById();
      const dataPeran = this.optionsPeran.filter((peran) => {
        return peran.kodePeran == this.form.peran;
      });
      this.valuePeran = dataPeran[0];
    }
  },
  validations: {
    form: {
      nip: {
        required,
        minLength: minLength(1),
        // maxLength: maxLength(18),
      },

      nama: {
        required,
        minLength: minLength(2),
      },

      peran: {
        required,
      },

      accept: {
        required,
        mustAccept: (val) => val,
      },
    },
  },
  methods: {
    viewSelectSearch({ id, kodePeran, deskripsi }) {
      return `${kodePeran} - ${deskripsi}`;
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
              'module_tim/createTim',
              resultFormData
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                // this.$router.push({
                //   name: 'module-create-tim',
                //   query: {
                //     idlha: this.$route.query.idlha,
                //     nolha: this.$route.query.nolha,
                //   },
                // });
                this.$emit('on-load-tim');
                this.toastSuccess(
                  'Berhasil menyimpan data dengan ID ' + responseData.Kode_Peran
                );
              }, 500);
              this.reset();
              await this.loadPeran();
            }
          } else if (this.mode == 'edit') {
            this.loading = true;

            const responseData = await this.$store.dispatch(
              'module_tim/updateTimById',
              {
                idTim: this.editData.id,
                data: resultFormData,
              }
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.push({
                  path: '/tim-audit',
                  query: {
                    filterlha: this.editData.kodeLha,
                  },
                });
                this.toastSuccess(
                  'Berhasil edit data dengan ID ' + responseData.Kode_Peran
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

      this.valuePeran = '';
      this.optionsPeran = [];
    },

    getEmptyForm() {
      return {
        nip: '',
        nama: '',
        peran: '',
        accept: false,
      };
    },

    appendToFormData() {
      const fd = new FormData();
      if (this.mode == 'create') {
        fd.append('kode_lha', this.$route.query.idlha);
      } else if (this.mode == 'edit') {
        fd.append('_method', 'PATCH');
      }
      fd.append('Kode_Peran', this.$v.form.peran.$model);
      fd.append('Nama', this.$v.form.nama.$model);
      fd.append('NIP', this.$v.form.nip.$model);
      return fd;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
