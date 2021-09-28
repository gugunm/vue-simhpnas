<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">
          Create Unit Kerja
        </h3>
        <h3 v-else-if="mode == 'edit'">
          Edit Unit Kerja
        </h3>
        <h3 v-else>
          Detail Unit Kerja
        </h3>
      </div>
      <CCard class="p-2">
        <CCardBody>
          <CForm
            method="POST"
            @submit.prevent="clickSubmitForm"
          >
            <!-- ROW 1 UNIT AUDIT -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-if="mode != 'create'"
                  v-model="id.val"
                  :readonly="mode != 'create'"
                  label="ID Unit Kerja"
                  class="mb-2"
                  placeholder="ID Unit Kerja"
                />
                <!-- @option:selected="onSelected" -->
                <template v-else>
                  <label>Kode</label>
                  <v-select
                    v-if="optionsUnitAudit"
                    v-model="selectedId"
                    :options="optionsUnitAudit"
                    label="deskripsi"
                    placeholder="Pilih Unit Kerja"
                  >
                    <template v-slot:option="option">
                      {{ `${option.id}\t${option.deskripsi}` }}
                    </template>
                  </v-select>
                </template>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="namaUnit.val"
                  label="Nama Unit Kerja"
                  class="mb-2"
                  placeholder="Inspektorat ABC"
                  :readonly="true"
                />
              </CCol>
            </CRow>
            <!-- ROW 2 -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="namaPimpinan.val"
                  label="Nama Pimpinan"
                  class="mb-2"
                  placeholder="Nama Pimpinan"
                  :readonly="mode == 'view'"
                  :is-valid="namaPimpinan.isValid"
                  @blur="validateString(namaPimpinan, {length:3})"
                />
                <p
                  v-if="namaPimpinan.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *minimal 3 huruf
                </p>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="nipPimpinan.val"
                  label="NIP Pimpinan (tanpa spasi)"
                  class="mb-2"
                  placeholder="197501012000011001"
                  :readonly="mode == 'view'"
                  :is-valid="nipPimpinan.isValid"
                  @blur="validateNip(nipPimpinan, {length:18})"
                />
                <p
                  v-if="nipPimpinan.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *18 angka, ditulis tanpa spasi
                </p>
              </CCol>
            </CRow>
            <!-- ROW 3 -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="alamat.val"
                  label="Alamat"
                  class="mb-2"
                  placeholder="Jl. Jakarta..."
                  :readonly="mode == 'view'"
                  :is-valid="alamat.isValid"
                  @blur="validateString(alamat, {length:3})"
                />
                <p
                  v-if="alamat.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *minimal 3 huruf
                </p>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-if="mode == 'view'"
                  :value="provinsi.val"
                  :readonly="mode == 'view'"
                  label="Provinsi"
                  class="mb-2"
                />
                <div v-else>
                  <label>Provinsi</label>
                  <v-select
                    v-if="optionsWilayah.provinsi"
                    v-model="selectedProvinsi"
                    :options="optionsWilayah.provinsi"
                    label="deskripsi"
                    placeholder="Pilih Provinsi"
                  >
                    <template v-slot:option="option">
                      {{ `${option.id} ${option.deskripsi}` }}
                    </template>
                  </v-select>
                </div>
              </CCol>
            </CRow>
            <!-- ROW 4 -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-if="mode == 'view'"
                  :value="kabkot.val"
                  :readonly="mode == 'view'"
                  label="Kab. / Kota"
                  class="mb-2"
                />
                <div v-else>
                  <label>Kab. / Kota</label>
                  <v-select
                    v-if="optionsWilayah.kabkot"
                    v-model="selectedKabkot"
                    :options="optionsWilayah.kabkot"
                    label="deskripsi"
                    placeholder="Pilih Kab. / Kota"
                  >
                    <template v-slot:option="option">
                      {{ `${option.id} ${option.deskripsi}` }}
                    </template>
                  </v-select>
                </div>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-if="mode == 'view'"
                  :value="kecamatan.val"
                  :readonly="mode == 'view'"
                  label="Kecamatan"
                  class="mb-2"
                />
                <div v-else>
                  <label>Kecamatan</label>
                  <v-select
                    v-model="selectedKecamatan"
                    :options="optionsWilayah.kecamatan"
                    label="deskripsi"
                    placeholder="Pilih Kecamatan"
                  >
                    <template v-slot:option="option">
                      {{ `${option.id} ${option.deskripsi}` }}
                    </template>
                  </v-select>
                </div>
              </CCol>
            </CRow>
            <!-- ROW 5 -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-if="mode == 'view'"
                  :value="kelurahan.val"
                  :readonly="mode == 'view'"
                  label="Kecamatan"
                  class="mb-2"
                />
                <div v-else>
                  <label>Kelurahan</label>
                  <v-select
                    v-if="optionsWilayah.kelurahan"
                    v-model="selectedKelurahan"
                    :options="optionsWilayah.kelurahan"
                    label="deskripsi"
                    placeholder="Pilih Kelurahan"
                  >
                    <template v-slot:option="option">
                      {{ `${option.id} ${option.deskripsi}` }}
                    </template>
                  </v-select>
                </div>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="jumlahObrik.val"
                  label="Jumlah Obrik"
                  class="mb-2"
                  placeholder="5"
                  type="number"
                  :readonly="mode == 'view'"
                  :is-valid="jumlahObrik.isValid"
                  @blur="validateNumber(jumlahObrik)"
                />
                <p
                  v-if="jumlahObrik.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *tidak boleh kosong
                </p>
              </CCol>
            </CRow>
            <!-- ROW 6 -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="jumlahObrikBersih.val"
                  label="Jumlah Obrik Bersih"
                  class="mb-2"
                  placeholder="3"
                  type="number"
                  :readonly="mode == 'view'"
                  :is-valid="jumlahObrikBersih.isValid"
                  @blur="validateNumber(jumlahObrikBersih)"
                />
                <p
                  v-if="jumlahObrikBersih.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *tidak boleh kosong
                </p>
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="telpon.val"
                  label="Telpon"
                  class="mb-2"
                  placeholder="62812345678"
                  :readonly="mode == 'view'"
                  :is-valid="telpon.isValid"
                  @blur="validateTelpon(telpon)"
                />
                <p
                  v-if="telpon.isValid == false"
                  class="text-red-500 text-sm"
                >
                  *nomor telpon tidak valid, minimal 11 angka dan diawali dengan '62'
                </p>
              </CCol>
            </CRow>
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CButton
                  v-if="mode != 'view'"
                  variant="outline"
                  color="dark"
                  @click="isOpenConfirm = true"
                >
                  Kembali
                </CButton>
                <back-button
                  v-if="mode == 'view'"
                  title="Kembali"
                  class="mt-4"
                  to="/master-unit-kerja"
                />
              </CCol>
              <CCol
                v-if="mode == 'create' || mode == 'edit'"
                sm="12"
                md="6"
                class="content-center justify-end pr-3"
              >
                <CButton
                  type="submit"
                  color="primary"
                  class="px-4"
                >
                  <template v-if="loading">
                    <CSpinner
                      color="white"
                      size="sm"
                      class="mr-2"
                    />
                    Processing
                  </template>
                  <template v-else>
                    Submit Data
                  </template>
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardbody>
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
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import BackButton from '@/views/components/BackButton';
import mixin from './mixin';
import mixinWilayah from './minxinWilayah';
import mixinValidate from './mixinValidate';

import ConfirmModal from '../../components/ConfirmModal.vue';

export default {
  name: 'FormUnitKerja',
  components: {
    vSelect,
    BackButton,
    ConfirmModal,
  },
  emmits: ['click-submit-form'],
  mixins: [mixin, mixinWilayah, mixinValidate],
  props: ['mode', 'selectedItem'],
  data() {
    return {
      isOpenConfirm: false,
      id: {
        val: '',
        isValid: true,
      },
      namaUnit: {
        val: '',
        isValid: true,
      },
      namaPimpinan: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      nipPimpinan: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      alamat: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      provinsi: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      kabkot: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      kecamatan: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      kelurahan: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      jumlahObrik: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      jumlahObrikBersih: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      telpon: {
        val: '',
        isValid: this.mode == 'edit' || null,
      },
      formIsValid: null,
      optionsUnitAudit: '',
      optionsWilayah: {
        provinsi: [],
        kabkot: [],
        kecamatan: [],
        kelurahan: [],
      },
      selectedId: '',
      selectedProvinsi: null,
      selectedKabkot: null,
      selectedKecamatan: null,
      selectedKelurahan: null,
      loading: false,
    };
  },

  watch: {
    selectedId: function (newValue, oldValue) {
      this.id.val = newValue.id;
      this.namaUnit.val = newValue.deskripsi;
      this.id.isValid = true;
    },
    selectedProvinsi: function (newValue, oldValue) {
      if (this.mode == 'create' || oldValue != null) {
        this.provinsi.isValid = true;
        this.provinsi.val = newValue.id;

        this.kabkot.val = '';
        this.kecamatan.val = '';
        this.kelurahan.val = '';
        this.selectedKabkot = '';
        this.loadKabkot();
      } else {
        this.loadKabkot();
      }

      // if (oldValue == null) {
      //   console.log('Pertama masuk');
      //   console.log(newValue.id);
      // } else {
      //   console.log('Setelahnya');
      //   console.log(newValue);
      // }
    },
    selectedKabkot: function (newValue, oldValue) {
      if (this.mode == 'create' || oldValue != null) {
        this.kabkot.val = newValue.id;
        this.kabkot.isValid = true;

        this.kecamatan.val = '';
        this.kelurahan.val = '';
        this.selectedKecamatan = '';
        this.loadKecamatan();
      } else {
        this.loadKecamatan();
      }
    },
    selectedKecamatan: function (newValue, oldValue) {
      if (this.mode == 'create' || oldValue != null) {
        this.kecamatan.val = newValue.id;
        this.kecamatan.isValid = true;

        this.kelurahan.val = '';
        this.selectedKelurahan = '';
        this.loadKelurahan();
      } else {
        this.loadKelurahan();
      }
    },
    selectedKelurahan: function (newValue, oldValue) {
      this.kelurahan.val = newValue.id;
      this.kelurahan.isValid = true;
    },
  },

  async mounted() {
    if (this.mode == 'edit' || this.mode == 'view') {
      this.createDataWithSelectedItem();

      if (this.mode == 'view') {
        const provinsiById = await this.loadProvinsiById(this.provinsi.val);
        this.provinsi.val = provinsiById.deskripsi;
        const kabkotById = await this.loadKabkotById(this.kabkot.val);
        this.kabkot.val = kabkotById.deskripsi;
        const kecamatanById = await this.loadKecamatanById(this.kecamatan.val);
        this.kecamatan.val = kecamatanById.deskripsi;
        const kelurahanById = await this.loadKelurahanById(this.kelurahan.val);
        this.kelurahan.val = kelurahanById.deskripsi;
      }
    }

    await this.loadUnitAudit();
    await this.loadProvinsi();
    if (this.mode == 'edit') {
      await this.loadKabkot();
      await this.loadKecamatan();
      await this.loadKelurahan();
      this.selectedProvinsi = this.optionsWilayah.provinsi.filter((obj) => {
        return obj.id == this.provinsi.val;
      })[0];
      this.selectedKabkot = this.optionsWilayah.kabkot.filter((obj) => {
        return obj.id == this.kabkot.val;
      })[0];
      this.selectedKecamatan = this.optionsWilayah.kecamatan.filter((obj) => {
        return obj.id == this.kecamatan.val;
      })[0];
      this.selectedKelurahan = this.optionsWilayah.kelurahan.filter((obj) => {
        return obj.id == this.kelurahan.val;
      })[0];
    }
  },
  methods: {
    clickSubmitForm() {
      this.checkForm();
      this.loading = true;
      // console.log(this.formIsValid);
      if (this.formIsValid) {
        this.$emit('click-submit-form', {
          formIsValid: this.formIsValid,
          mode: this.mode,
          data: {
            // Kode_Unit_Obrik: 'tes1234',
            // Nama_Unit: 'Unit Test 212',
            // Nama_Pimpinan: 'AZ Pimpinan',
            // NIP_Pimpinan: '199201012020121004',
            // Alamat: 'jakarta',
            // Provinsi: '31',
            // Kabupaten_kota: '3175',
            // Kecamatan: '317510',
            // Kelurahan: '3175101007',
            // Jumlah_Obrik: 5,
            // Jumlah_Obrik_Bersih: 3,
            // Telpon: '085634215432',
            Kode_Unit_Obrik: this.id.val,
            Nama_Unit: this.namaUnit.val,
            Nama_Pimpinan: this.namaPimpinan.val,
            NIP_Pimpinan: this.nipPimpinan.val,
            Alamat: this.alamat.val,
            Provinsi: this.provinsi.val,
            Kabupaten_kota: this.kabkot.val,
            Kecamatan: this.kecamatan.val,
            Kelurahan: this.kelurahan.val,
            Jumlah_Obrik: this.jumlahObrik.val,
            Jumlah_Obrik_Bersih: this.jumlahObrikBersih.val,
            Telpon: this.telpon.val,
          },
        });
      } else {
        this.$toast.open({
          message: 'Terdapat data yang belum valid',
          type: 'error',
          position: 'top-right',
          duration: 5000,
        });
      }

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    async loadUnitAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefUnitAudit', {
          forceRefresh: refresh,
        });
        this.optionsUnitAudit =
          this.$store.getters['m_ref_unit_audit/refUnitAudit'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    checkForm() {
      const listValidate = [
        this.id.isValid,
        this.namaUnit.isValid,
        this.namaPimpinan.isValid,
        this.nipPimpinan.isValid,
        this.alamat.isValid,
        this.provinsi.isValid,
        this.kabkot.isValid,
        this.kecamatan.isValid,
        this.kelurahan.isValid,
        this.jumlahObrik.isValid,
        this.jumlahObrikBersih.isValid,
        this.telpon.isValid,
      ];

      if (listValidate.every((v) => v === true)) {
        // return true
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }

      // console.log('LIST VALIDATE');
      // console.log(listValidate);
      // console.log(this.formIsValid);
    },
  },
};
</script>
