<template>
  <CRow>
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3 v-if="mode == 'create'">Create Laporan Hasil Audit</h3>
        <h3 v-else>Edit Laporan Hasil Audit</h3>
      </div>
      <CCard>
        <!-- <CCardBody> -->
        <CForm class="form-lha">
          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">Data Umum LHA</h5>
          </div>
          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Unit Audit"
                  :lazy="false"
                  :value.sync="namaUnit"
                  :readonly="true"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  label="Sub Unit Audit"
                  :lazy="false"
                  :value.sync="namaSubUnit"
                  :readonly="true"
                />
              </CCol>
            </CRow>

            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nomor PKPT"
                  :lazy="false"
                  :value.sync="$v.form.noPkpt.$model"
                  :is-valid="checkIfValid('noPkpt')"
                  placeholder="Nomor PKPT"
                  autocomplete="noPkpt"
                  invalid-feedback="Nomor PKPT wajib diisi"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  type="number"
                  label="Tahun PKPT"
                  :lazy="false"
                  :value.sync="$v.form.tahunPkpt.$model"
                  :is-valid="checkIfValid('tahunPkpt')"
                  placeholder="Tahun PKPT"
                  autocomplete="tahunPkpt"
                  invalid-feedback="Tahun PKPT wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 3 -->
            <CRow>
              <CCol lg="7">
                <CInput
                  label="Nomor ST"
                  :lazy="false"
                  :value.sync="$v.form.noSt.$model"
                  :is-valid="checkIfValid('noSt')"
                  placeholder="Nomor ST"
                  autocomplete="noSt"
                  invalid-feedback="Nomor ST wajib diisi"
                />
              </CCol>
              <CCol lg="5">
                <!-- <div>
                  <v-date-picker
                    v-model="selectedDate"
                    mode="range"
                    is-inline
                  />
                  <p>
                    start: {{ selectedDate.start.toLocaleDateString() }} <br />
                    end: {{ selectedDate.end.toLocaleDateString() }}
                  </p>
                </div> -->
                <CInput
                  label="Tanggal ST"
                  :lazy="false"
                  :value.sync="$v.form.tglSt.$model"
                  :is-valid="checkIfValid('tglSt')"
                  placeholder="Tanggal ST"
                  autocomplete="tglSt"
                  invalid-feedback="Tanggal ST wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 4 -->
            <CRow>
              <CCol lg="7">
                <CInput
                  label="Nomor LHA"
                  :lazy="false"
                  :value.sync="$v.form.noLha.$model"
                  :is-valid="checkIfValid('noLha')"
                  placeholder="Nomor LHA"
                  autocomplete="noLha"
                  invalid-feedback="Nomor LHA wajib diisi"
                />
              </CCol>
              <CCol lg="5">
                <CInput
                  label="Tanggal LHA"
                  :lazy="false"
                  :value.sync="$v.form.tglLha.$model"
                  :is-valid="checkIfValid('tglLha')"
                  placeholder="Tanggal LHA"
                  autocomplete="tglLha"
                  invalid-feedback="Tanggal LHA wajib diisi"
                />
              </CCol>
            </CRow>

            <!-- ROW 5 -->
            <CRow class="mb-3">
              <CCol lg="5">
                <div>
                  <label class="typo__label">Institusi Yang Mengaudit</label>
                  <multiselect
                    v-if="optionsGroupLingkupAudit"
                    v-model="valueGroupLingkupAudit"
                    :options="optionsGroupLingkupAudit"
                    :custom-label="viewSelectSearch"
                    placeholder="Select institusi"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Group Lingkup Audit"
                  :lazy="false"
                  :value.sync="$v.form.groupLingkupAudit.$model"
                  :is-valid="checkIfValid('groupLingkupAudit')"
                  placeholder="Group Lingkup Audit"
                  autocomplete="groupLingkupAudit"
                  invalid-feedback="Group Lingkup Audit wajib diisi"
                /> -->
              </CCol>
              <CCol lg="5">
                <div>
                  <label class="typo__label">Jenis Kegiatan Pengawasan</label>
                  <multiselect
                    v-if="optionsLingkupAudit"
                    v-model="valueLingkupAudit"
                    :options="optionsLingkupAudit"
                    :custom-label="viewSelectSearch"
                    placeholder="Select jenis kegiatan pengawasan"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Lingkup Audit"
                  :lazy="false"
                  :value.sync="$v.form.lingkupAudit.$model"
                  :is-valid="checkIfValid('lingkupAudit')"
                  placeholder="Lingkup Audit"
                  autocomplete="lingkupAudit"
                  invalid-feedback="Lingkup Audit wajib diisi"
                /> -->
              </CCol>
            </CRow>
          </div>

          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">Data Obrik</h5>
          </div>

          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="8">
                <CTextarea
                  type=""
                  label="Judul Laporan"
                  :lazy="false"
                  :value.sync="$v.form.judulLaporan.$model"
                  :is-valid="checkIfValid('judulLaporan')"
                  placeholder="Judul Laporan"
                  autocomplete="name"
                  invalid-feedback="Judul Laporan wajib diisi"
                />
              </CCol>
            </CRow>
            <!-- ROW 2 -->
            <CRow class="mb-3">
              <CCol lg="5">
                <div>
                  <label class="typo__label">Jenis Obrik</label>
                  <multiselect
                    v-if="optionsJenisObrik"
                    v-model="valueJenisObrik"
                    :options="optionsJenisObrik"
                    :custom-label="viewSelectSearch"
                    placeholder="Select jenis obrik"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Jenis Obrik"
                  :lazy="false"
                  :value.sync="$v.form.jenisObrik.$model"
                  :is-valid="checkIfValid('jenisObrik')"
                  placeholder="Jenis Obrik"
                  autocomplete="name"
                  invalid-feedback="Jenis Obrik wajib diisi"
                /> -->
              </CCol>
            </CRow>
            <!-- ROW 3 -->
            <CRow class="mb-3">
              <CCol lg="4">
                <div>
                  <label class="typo__label">Unit Obrik</label>
                  <multiselect
                    v-if="optionsUnitObrik"
                    v-model="valueUnitObrik"
                    :options="optionsUnitObrik"
                    :custom-label="viewSelectSearch"
                    placeholder="Select unit obrik"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Unit Obrik"
                  :lazy="false"
                  :value.sync="$v.form.unitObrik.$model"
                  :is-valid="checkIfValid('unitObrik')"
                  placeholder="Unit Obrik"
                  autocomplete="name"
                  invalid-feedback="Unit Obrik wajib diisi"
                /> -->
              </CCol>
              <CCol lg="4">
                <div>
                  <label class="typo__label">Bidang Obrik</label>
                  <multiselect
                    v-if="optionsBidangObrik"
                    v-model="valueBidangObrik"
                    :options="optionsBidangObrik"
                    :custom-label="viewSelectSearch"
                    placeholder="Select bidang obrik"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Bidang Obrik"
                  :lazy="false"
                  :value.sync="$v.form.bidangObrik.$model"
                  :is-valid="checkIfValid('bidangObrik')"
                  placeholder="Bidang Obrik"
                  autocomplete="name"
                  invalid-feedback="Bidang Obrik wajib diisi"
                /> -->
              </CCol>
              <CCol lg="4">
                <div>
                  <label class="typo__label">Sub Bidang Obrik</label>
                  <multiselect
                    v-if="optionsSubBidangObrik"
                    v-model="valueSubBidangObrik"
                    :options="optionsSubBidangObrik"
                    :custom-label="viewSelectSearch"
                    placeholder="Select sub bidang obrik"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
                <!-- <CInput
                  label="Sub Bidang Obrik"
                  :lazy="false"
                  :value.sync="$v.form.subBidangObrik.$model"
                  :is-valid="checkIfValid('subBidangObrik')"
                  placeholder="Sub Bidang Obrik"
                  autocomplete="name"
                  invalid-feedback="Sub Bidang Obrik wajib diisi"
                /> -->
              </CCol>
            </CRow>
            <!-- ROW 5 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Nama Pimpinan"
                  :lazy="false"
                  :value.sync="$v.form.namaPimpinan.$model"
                  :is-valid="checkIfValid('namaPimpinan')"
                  placeholder="Nama Pimpinan"
                  autocomplete="name"
                  invalid-feedback="Nama Pimpinan wajib diisi"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  label="NIP Pimpinan"
                  :lazy="false"
                  :value.sync="$v.form.nipPimpinan.$model"
                  :is-valid="checkIfValid('nipPimpinan')"
                  placeholder="NIP Pimpinan"
                  autocomplete="name"
                  invalid-feedback="NIP Pimpinan wajib diisi"
                />
              </CCol>
            </CRow>
          </div>

          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">Data Anggaran</h5>
          </div>

          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Rencana"
                  :lazy="false"
                  :value.sync="$v.form.nilaiRencana.$model"
                  :is-valid="checkIfValid('nilaiRencana')"
                  placeholder="Rencana"
                  autocomplete="name"
                  invalid-feedback="Rencana wajib diisi"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  label="Realisasi"
                  :lazy="false"
                  :value.sync="$v.form.nilaiRealisasi.$model"
                  :is-valid="checkIfValid('nilaiRealisasi')"
                  placeholder="Realisasi"
                  autocomplete="name"
                  invalid-feedback="Realisasi wajib diisi"
                />
              </CCol>
            </CRow>
            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  label="Yang Diaudit"
                  :lazy="false"
                  :value.sync="$v.form.nilaiDiaudit.$model"
                  :is-valid="checkIfValid('nilaiDiaudit')"
                  placeholder="Yang Diaudit"
                  autocomplete="name"
                  invalid-feedback="Yang Diaudit wajib diisi"
                />
              </CCol>
            </CRow>
          </div>

          <div class="p-3" style="background: #f9fafb">
            <h5 class="text-base font-semibold">Data Wilayah</h5>
          </div>

          <div class="p-3">
            <!-- ROW 1 -->
            <CRow>
              <CCol lg="6">
                <div>
                  <!-- <label class="typo__label">Kelurahan/Desa</label>
                  <multiselect
                    v-if="optionsKelurahan"
                    v-model="valueKelurahan"
                    :options="optionsKelurahan"
                    :custom-label="viewSelectSearchKelurahan"
                    placeholder="Select jenis obrik"
                    label="deskripsi"
                    track-by="deskripsi"
                  /> -->
                  <label class="typo__label" for="ajax">Kelurahan/Desa</label>
                  <multiselect
                    v-if="optionsKelurahan"
                    id="ajax"
                    v-model="valueKelurahan"
                    label="deskripsi"
                    track-by="id"
                    placeholder="Ketik untuk mencari"
                    open-direction="bottom"
                    :options="optionsKelurahan"
                    :searchable="true"
                    :loading="isLoadingKelurahan"
                    :internal-search="true"
                    :options-limit="300"
                    :max-height="600"
                    :show-no-results="false"
                    :hide-selected="true"
                    :custom-label="viewSelectSearchKelurahan"
                    @search-change="loadSearchKelurahan"
                  />
                </div>
                <!-- <CInput
                  label="Kelurahan/Desa"
                  :lazy="false"
                  :value.sync="$v.form.kelurahan.$model"
                  :is-valid="checkIfValid('kelurahan')"
                  placeholder="Kelurahan/Desa"
                  autocomplete="name"
                  invalid-feedback="Kelurahan/Desa wajib diisi"
                /> -->
              </CCol>
              <CCol lg="6">
                <CInput
                  :readonly="true"
                  label="Kecamatan"
                  :lazy="false"
                  :value.sync="valueKecamatan"
                  :is-valid="checkIfValid('kecamatan')"
                  autocomplete="name"
                  invalid-feedback="Kecamatan wajib diisi"
                />
              </CCol>
            </CRow>
            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  :readonly="true"
                  label="Kabupaten / Kota"
                  :lazy="false"
                  :value.sync="valueKabkot"
                  :is-valid="checkIfValid('kabkot')"
                  autocomplete="name"
                  invalid-feedback="Kabupaten / Kota wajib diisi"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  :readonly="true"
                  label="Provinsi"
                  :lazy="false"
                  :value.sync="valueProvinsi"
                  :is-valid="checkIfValid('provinsi')"
                  autocomplete="name"
                  invalid-feedback="Provinsi wajib diisi"
                />
              </CCol>
            </CRow>
            <CRow>
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
                  :disabled="!isValid || submitted"
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
  // email,
  // sameAs,
  // helpers,
} from 'vuelidate/lib/validators';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';
import mixin from './mixin';
import Multiselect from 'vue-multiselect';

export default {
  name: 'LhaForm',
  components: {
    ConfirmModal,
    Multiselect,
  },
  mixins: [mixin, validationMixin],
  props: ['mode', 'selectedItem'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      isOpenConfirm: false,
      namaUnit: localStorage.getItem('namaUnit'),
      namaSubUnit: localStorage.getItem('namaSubUnit'),
      valueGroupLingkupAudit: null,
      optionsGroupLingkupAudit: null,
      valueLingkupAudit: '',
      optionsLingkupAudit: [],
      valueJenisObrik: null,
      optionsJenisObrik: null,
      valueUnitObrik: null,
      optionsUnitObrik: null,
      valueBidangObrik: '',
      optionsBidangObrik: [],
      valueSubBidangObrik: '',
      optionsSubBidangObrik: [],
      valueKelurahan: '',
      optionsKelurahan: [],
      isLoadingKelurahan: false,
      valueKecamatan: '',
      valueKabkot: '',
      valueProvinsi: '',
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
    valueGroupLingkupAudit: function (curVal, oldVal) {
      this.$v.form.groupLingkupAudit.$model = curVal.id;
      this.valueLingkupAudit = '';
      this.loadLingkupAudit();
    },

    valueLingkupAudit: function (curVal, oldVal) {
      this.$v.form.lingkupAudit.$model = curVal.id;
    },

    valueJenisObrik: function (curVal, oldVal) {
      this.$v.form.jenisObrik.$model = curVal.id;
    },

    valueUnitObrik: function (curVal, oldVal) {
      this.$v.form.unitObrik.$model = curVal.id;
      this.valueBidangObrik = '';
      this.loadBidangObrik();
    },

    valueBidangObrik: function (curVal, oldVal) {
      this.$v.form.bidangObrik.$model = curVal.id;
      this.valueSubBidangObrik = '';
      this.loadSubBidangObrik();
    },

    valueSubBidangObrik: function (curVal, oldVal) {
      this.$v.form.subBidangObrik.$model = curVal.id;
    },

    valueKelurahan: function (curVal, oldVal) {
      this.valueKecamatan = curVal.namaKecamatan;
      this.valueKabkot = curVal.namaKabkot;
      this.valueProvinsi = curVal.namaProvinsi;
      this.$v.form.kecamatan.$model = curVal.idKecamatan;
      this.$v.form.kabkot.$model = curVal.idKabkot;
      this.$v.form.provinsi.$model = curVal.idProvinsi;
      this.$v.form.kelurahan.$model = curVal.id;
    },
  },
  validations: {
    form: {
      // +++ Data Umum +++
      // autocomplete
      unitAudit: { required },
      // autocomplete
      subUnitAudit: { required },
      // text
      noPkpt: { required, minLength: minLength(1) },
      // number
      tahunPkpt: { required },
      // text
      noSt: { required, minLength: minLength(1) },
      // date
      tglSt: { required },
      // text
      noLha: { required, minLength: minLength(1) },
      // date
      tglLha: { required },
      // autocomplete
      groupLingkupAudit: { required },
      // autocomplete
      lingkupAudit: { required },

      // +++ Data Obrik +++
      // textarea
      judulLaporan: { required },
      // autocomplete
      jenisObrik: { required },
      // autocomplete
      unitObrik: { required },
      // autocomplete
      bidangObrik: { required },
      // autocomplete
      subBidangObrik: { required },
      // text
      namaPimpinan: { required },
      // text
      nipPimpinan: { required },

      // +++ Data Anggaran +++
      // number
      nilaiRencana: { required },
      // number
      nilaiRealisasi: { required },
      // number
      nilaiDiaudit: { required },
      // autocomplete
      kelurahan: { required },
      // readonly
      kecamatan: { required },
      // readonly
      kabkot: { required },
      // readonly
      provinsi: { required },

      accept: {
        required,
        mustAccept: (val) => val,
      },
    },
  },
  methods: {
    viewSelectSearch({ id, deskripsi }) {
      return `${id} — ${deskripsi}`;
    },

    viewSelectSearchKelurahan({
      id,
      deskripsi,
      namaKabkot,
      namaKecamatan,
      namaProvinsi,
    }) {
      return `${deskripsi} | ${namaProvinsi}, ${namaKabkot}, ${namaKecamatan}`;
    },

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
        // Data Umum
        unitAudit: localStorage.getItem('idUnitKerja'), // autocomplete
        subUnitAudit: localStorage.getItem('idSubUnitKerja'), // autocomplete
        noPkpt: '', // text
        tahunPkpt: '', // number
        noSt: '', // text
        tglSt: '', // date
        noLha: '', // text
        tglLha: '', // date
        groupLingkupAudit: '', // autocomplete
        lingkupAudit: '', // autocomplete
        // Data Obrik
        judulLaporan: '', // textarea
        jenisObrik: '', // autocomplete
        unitObrik: '', // autocomplete
        bidangObrik: '', // autocomplete
        subBidangObrik: '', // autocomplete
        namaPimpinan: '', // text
        nipPimpinan: '', // text
        // Data Anggaran
        nilaiRencana: 0, // number
        nilaiRealisasi: 0, // number
        nilaiDiaudit: 0, // number
        // Data Wilayah
        kelurahan: '', // autocomplete
        kecamatan: '', // text readonly
        kabkot: '', // text readonly
        provinsi: '', // text readonly

        accept: false,
      };
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.form-lha .multiselect__option {
  font-size: 12px;
  font-weight: 600;
}
</style>
