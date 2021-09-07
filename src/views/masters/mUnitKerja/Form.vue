<template>
  <CRow>
    <CCol sm="12">
      <CCard class="p-2">
        <CCardHeader>
          <h3 v-if="mode == 'create'">
            Create Unit Kerja
          </h3>
          <h3 v-else>
            Detail Unit Kerja
          </h3>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <!-- ROW 1 -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
                <CInput
                  v-if="mode == 'edit'"
                  v-model="id.val"
                  :readonly="mode != 'create'"
                  label="ID Unit Kerja"
                  class="mb-2"
                  placeholder="ID Unit Kerja"
                  @option:selected="onSelected"
                />
                <template v-else>
                  <label>Kode</label>
                  <v-select
                    v-if="optionsUnitAudit"
                    v-model="selectedId"
                    :options="optionsUnitAudit"
                    label="id"
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
                />
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
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
              </CCol>
            </CRow>
            <!-- ROW 4 -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
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
              </CCol>
              <CCol
                sm="12"
                md="6"
              >
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
              </CCol>
            </CRow>
            <!-- ROW 5 -->
            <CRow class="mb-2 view-form">
              <CCol
                sm="12"
                md="6"
              >
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
                />
              </CCol>
            </CRow>
          </CForm>
          <back-button
            title="Kembali"
            class="mt-3"
          />
        </CCardbody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import BackButton from '@/views/components/BackButton';

export default {
  name: 'CreateEditForm',
  components: {
    vSelect,
    BackButton,
  },
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
    if (this.mode === 'edit') {
      this.createDataWithSelectedItem();
    }
    this.loadUnitAudit();
    this.loadProvinsi();
  },
  methods: {
    onSelected(value) {
      console.log(value);
    },
    createDataWithSelectedItem() {
      this.id.val = this.selectedItem.id;
      this.namaUnit.val = this.selectedItem.namaUnit;
      this.namaPimpinan.val = this.selectedItem.namaPimpinan;
      this.nipPimpinan.val = this.selectedItem.nipPimpinan;
      this.alamat.val = this.selectedItem.alamat;
      this.provinsi.val = this.selectedItem.provinsi;
      this.kabkot.val = this.selectedItem.kabkot;
      this.kecamatan.val = this.selectedItem.kecamatan;
      this.kelurahan.val = this.selectedItem.kelurahan;
      this.jumlahObrik.val = this.selectedItem.jumlahObrik;
      this.jumlahObrikBersih.val = this.selectedItem.jumlahObrikBersih;
      this.telpon.val = this.selectedItem.telpon;
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