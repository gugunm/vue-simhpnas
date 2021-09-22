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
                />
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="nipPimpinan.val"
                  label="NIP Pimpinan"
                  class="mb-2"
                  placeholder="19750101 200001 1 001"
                  :readonly="mode == 'view'"
                />
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
                />
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-if="mode == 'view'"
                  v-model="provinsi.val"
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
                  v-model="kabkot.val"
                  :readonly="mode == 'view'"
                  label="Kab. / Kota"
                  class="mb-2"
                />
                <div v-else>
                  <label>Kab. / Kota</label>
                  <v-select
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
                  v-model="kecamatan.val"
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
                  v-model="kelurahan.val"
                  :readonly="mode == 'view'"
                  label="Kecamatan"
                  class="mb-2"
                />
                <div v-else>
                  <label>Kelurahan</label>
                  <v-select
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
                  :readonly="mode == 'view'"
                />
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
                  :readonly="mode == 'view'"
                />
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-model="telpon.val"
                  label="Telpon"
                  class="mb-2"
                  placeholder="6281234567890"
                  :readonly="mode == 'view'"
                />
              </CCol>
            </CRow>
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <back-button
                  title="Kembali"
                  class="mt-4"
                  to="/master-unit-kerja"
                />
              </CCol>
              <CCol
                v-if="mode == 'create'"
                sm="12"
                md="6"
                class="content-center justify-end pr-3"
              >
                <CButton
                  type="submit"
                  color="primary"
                  class="px-4"
                >
                  Submit Data
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardbody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import BackButton from '@/views/components/BackButton';
import mixin from './mixin';

export default {
  name: 'FormUnitKerja',
  components: {
    vSelect,
    BackButton,
  },
  emmits: ['click-submit-form'],
  mixins: [mixin],
  props: ['mode', 'selectedItem'],
  data() {
    return {
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
        isValid: true,
      },
      nipPimpinan: {
        val: '',
        isValid: true,
      },
      alamat: {
        val: '',
        isValid: true,
      },
      provinsi: {
        val: '',
        isValid: true,
      },
      kabkot: {
        val: '',
        isValid: true,
      },
      kecamatan: {
        val: '',
        isValid: true,
      },
      kelurahan: {
        val: '',
        isValid: true,
      },
      jumlahObrik: {
        val: '',
        isValid: true,
      },
      jumlahObrikBersih: {
        val: '',
        isValid: true,
      },
      telpon: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      optionsUnitAudit: '',
      optionsWilayah: {
        provinsi: '',
        kabkot: '',
        kecamatan: '',
        kelurahan: '',
      },
      selectedId: '',
      selectedProvinsi: this.selectedItem.provinsi || '',
      selectedKabkot: this.selectedItem.kabkot || '',
      selectedKecamatan: this.selectedItem.kecamatan || '',
      selectedKelurahan: this.selectedItem.kelurahan || '',
    };
  },
  watch: {
    selectedId: function (newValue, oldValue) {
      this.id.val = newValue.id;
      this.namaUnit.val = newValue.deskripsi;
    },
    selectedProvinsi: function (newValue, oldValue) {
      this.provinsi.val = newValue.id;
      this.kabkot.val = '';
      this.kecamatan.val = '';
      this.kelurahan.val = '';
      this.selectedKabkot = '';
      this.loadKabkot();
    },
    selectedKabkot: function (newValue, oldValue) {
      this.kabkot.val = newValue.id;
      this.kecamatan.val = '';
      this.kelurahan.val = '';
      this.selectedKecamatan = '';
      this.loadKecamatan();
    },
    selectedKecamatan: function (newValue, oldValue) {
      this.kecamatan.val = newValue.id;
      this.kelurahan.val = '';
      this.selectedKelurahan = '';
      this.loadKelurahan();
    },
    selectedKelurahan: function (newValue, oldValue) {
      this.kelurahan.val = newValue.id;
    },
    isShowModal: function (newValue, oldValue) {
      if (newValue === false) {
        this.id.val = '';
        this.namaUnit.val = '';
        this.namaPimpinan.val = '';
        this.nipPimpinan.val = '';
        this.alamat.val = '';
        this.provinsi.val = '';
        this.kabkot.val = '';
        this.kecamatan.val = '';
        this.kelurahan.val = '';
        this.jumlahObrik.val = '';
        this.jumlahObrikBersih.val = '';
        this.telpon.val = '';
        this.selectedProvinsi = '';
      }
    },
  },
  created() {
    if (this.mode == 'edit' || this.mode == 'view') {
      this.createDataWithSelectedItem();
    }
    this.loadUnitAudit();
    this.loadProvinsi();
  },
  methods: {
    clickSubmitForm() {
      this.$emit('click-submit-form', {
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
      });
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
    async loadProvinsi(refresh = false) {
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefProvinsi', {
          forceRefresh: refresh,
        });
        this.optionsWilayah.provinsi =
          this.$store.getters['m_ref_wilayah/refProvinsi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    async loadKabkot(refresh = false) {
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefKabkot', {
          idProvinsi: this.provinsi.val,
          forceRefresh: refresh,
        });
        this.optionsWilayah.kabkot =
          this.$store.getters['m_ref_wilayah/refKabkot'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    async loadKecamatan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefKecamatan', {
          idKabkot: this.kabkot.val,
          forceRefresh: refresh,
        });
        this.optionsWilayah.kecamatan =
          this.$store.getters['m_ref_wilayah/refKecamatan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
    async loadKelurahan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_wilayah/loadRefKelurahan', {
          idKecamatan: this.kecamatan.val,
          forceRefresh: refresh,
        });
        this.optionsWilayah.kelurahan =
          this.$store.getters['m_ref_wilayah/refKelurahan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>