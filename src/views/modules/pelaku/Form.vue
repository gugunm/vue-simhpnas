<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Pelaku</h3>
        <h3 v-else-if="mode == 'view'">Detail Pelaku</h3>
        <h3 v-else>Edit Pelaku</h3>
      </div>
      <CCard>
        <!-- <CCardBody> -->
        <CForm @submit.prevent="submit">
          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">
              Data Pelaku (Termasuk Pelaku untuk TPK)
            </h5>
          </div>
          <div class="p-3">
            <!-- ROW 0 -->
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
              <CCol lg="6">
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
            </CRow>

            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor Urut"
                  :lazy="false"
                  :value.sync="$v.form.nomorUrut.$model"
                  :is-valid="checkIfValid('nomorUrut')"
                  placeholder="nomor urut"
                  autocomplete="nomorUrut"
                  invalid-feedback="Nomor Urut wajib diisi 1 angka"
                  :disabled="mode == 'view'"
                />
              </CCol>
              <CCol lg="6">
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
            </CRow>

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

            <!-- ROW 2 -->
            <CRow class="mb-3">
              <CCol lg="6">
                <CInput
                  v-if="mode == 'view'"
                  label="Jabatan"
                  :value="form.jabatan"
                  :disabled="true"
                />
                <div v-else>
                  <label class="typo__label">Jabatan</label>
                  <multiselect
                    v-if="optionsJabatan"
                    v-model="valueJabatan"
                    :options="optionsJabatan"
                    :custom-label="viewSelectSearch"
                    placeholder="Select jabatan"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg="8">
                <CTextarea
                  label="Memo Kesalahan"
                  :lazy="false"
                  :value.sync="$v.form.memoKesalahan.$model"
                  :is-valid="checkIfValid('memoKesalahan')"
                  placeholder="Memo Kesalahan"
                  autocomplete="memoKesalahan"
                  invalid-feedback="Memo Kesalahan wajib diisi"
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
  props: ['mode', 'selectedItem', 'idPelaku'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      isOpenConfirm: false,
      valueJabatan: '',
      optionsJabatan: [],
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
    valueJabatan: function (val) {
      this.$v.form.idJabatan.$model = val.id;
    },
  },
  async mounted() {
    await this.loadJabatan();

    if (this.mode == 'view') {
      await this.loadPelakuById();
    } else if (this.mode == 'edit') {
      await this.loadEditPelakuById();

      this.valueJabatan = this.optionsJabatan.filter(
        (jabatan) => jabatan.id == this.form.idJabatan
      )[0];
    }
  },
  validations: {
    form: {
      nomorUrut: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(1),
      },
      nama: {
        required,
      },
      nip: {
        required,
        minLength: minLength(1),
        // maxLength: maxLength(18),
      },
      idJabatan: {
        required,
      },
      memoKesalahan: {
        required,
      },
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
              'module_pelaku/createPelaku',
              resultFormData
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.back();
                this.toastSuccess('Berhasil menyimpan data pelaku');
              }, 500);
            }
          } else if (this.mode == 'edit') {
            this.loading = true;
            const responseData = await this.$store.dispatch(
              'module_pelaku/updatePelakuById',
              {
                idPelaku: this.editData.id,
                data: resultFormData,
              }
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.back();
                this.toastSuccess('Berhasil edit data pelaku');
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
        nomorUrut: '',
        nama: '',
        nip: '',
        idJabatan: '',
        memoKesalahan: '',

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
      fd.append('Nomor_Urut', this.$v.form.nomorUrut.$model);
      fd.append('Nama', this.$v.form.nama.$model);
      fd.append('NIP', this.$v.form.nip.$model);
      fd.append('Kode_Jabatan', this.$v.form.idJabatan.$model);
      fd.append('Memo_Kesalahan', this.$v.form.memoKesalahan.$model);
      return fd;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
