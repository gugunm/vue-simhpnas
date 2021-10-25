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
              <CCol lg="2">
                <div>
                  <label class="typo__label block">Tanggal ST</label>
                  <v-date-picker
                    v-model="selectedDateSt"
                    mode="single"
                    :input-debounce="500"
                    is-required
                    :masks="{ input: ['DD/MM/YYYY'], data: ['YYYY-MM-DD'] }"
                  />
                  <!-- :masks="{ input: ['D MMM YYYY'], data: ['YYYY-MM-DD'] }" -->
                </div>
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
              <CCol lg="2">
                <div>
                  <label class="typo__label block">Tanggal LHA</label>
                  <v-date-picker
                    v-model="selectedDateLha"
                    mode="single"
                    :input-debounce="500"
                    is-required
                    :masks="{ input: ['DD/MM/YYYY'], data: ['YYYY-MM-DD'] }"
                  />
                  <!-- :masks="{ input: ['D MMM YYYY'] }" -->
                </div>
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
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="10">
                <CTextarea
                  type=""
                  label="Ringkasan LHA"
                  :lazy="false"
                  :value.sync="$v.form.ringkasanLha.$model"
                  :is-valid="checkIfValid('ringkasanLha')"
                  placeholder="Ringkasan LHA"
                  autocomplete="ringkasanLha"
                  invalid-feedback="Ringkasan LHA wajib diisi"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="6">
                <CInputCheckbox
                  :is-valid="checkIfValid('flagTpk')"
                  :checked.sync="$v.form.flagTpk.$model"
                  label="Centang jika LHA Tindak Pidana Khusus"
                  custom
                  class="my-2 text-base ml-2 font-semibold lower"
                />
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
                  autocomplete="judulLaporan"
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
                  autocomplete="namaPimpinan"
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
                  autocomplete="nipPimpinan"
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
                  type="number"
                  label="Tahun Anggaran"
                  :lazy="false"
                  :value.sync="$v.form.tahunAnggaran.$model"
                  :is-valid="checkIfValid('tahunAnggaran')"
                  placeholder="Tahun anggaran"
                  autocomplete="tahunAnggaran"
                  invalid-feedback="Tahun Anggaran wajib diisi"
                />
              </CCol>
              <CCol lg="6">
                <div>
                  <label class="typo__label">Jenis Anggaran</label>
                  <multiselect
                    v-if="optionsJenisAnggaran"
                    v-model="valueJenisAnggaran"
                    :options="optionsJenisAnggaran"
                    :custom-label="viewSelectSearch"
                    placeholder="Select jenis anggaran"
                    label="deskripsi"
                    track-by="deskripsi"
                  />
                </div>
              </CCol>
            </CRow>
            <!-- ROW 2 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  type="number"
                  label="Rencana"
                  :lazy="false"
                  :value.sync="$v.form.nilaiRencana.$model"
                  :is-valid="checkIfValid('nilaiRencana')"
                  placeholder="Rencana"
                  autocomplete="nilaiRencana"
                  invalid-feedback="Rencana wajib diisi"
                />
              </CCol>
              <CCol lg="6">
                <CInput
                  type="number"
                  label="Realisasi"
                  :lazy="false"
                  :value.sync="$v.form.nilaiRealisasi.$model"
                  :is-valid="checkIfValid('nilaiRealisasi')"
                  placeholder="Realisasi"
                  autocomplete="nilaiRealisasi"
                  invalid-feedback="Realisasi wajib diisi"
                />
              </CCol>
            </CRow>
            <!-- ROW 3 -->
            <CRow>
              <CCol lg="6">
                <CInput
                  type="number"
                  label="Yang Diaudit"
                  :lazy="false"
                  :value.sync="$v.form.nilaiDiaudit.$model"
                  :is-valid="checkIfValid('nilaiDiaudit')"
                  placeholder="Yang Diaudit"
                  autocomplete="nilaiDiaudit"
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

            <CRow v-if="mode == 'edit' && editData.uploadFileLha">
              <CCol>
                <CButton
                  color="danger"
                  shape="pill"
                  class="px-3 mb-3"
                  size="sm"
                  @click="onDeleteFileUpdate"
                >
                  Hapus File
                </CButton>
                <p class="mb-3">
                  {{ 'Link File : ' + fileLha }}
                </p>
              </CCol>
            </CRow>
            <CRow
              v-else-if="
                (mode == 'edit' && !editData.uploadFileLha) || mode == 'create'
              "
            >
              <CCol lg="6">
                <div class="flex flex-col">
                  <label for="file-lha" class="block mb-3"
                    >Upload File LHA</label
                  >
                  <div class="flex items-center mb-4">
                    <CSwitch
                      class="mx-1 mr-3"
                      color="info"
                      variant="3d"
                      v-bind="labelIcon"
                      :checked.sync="isStoredLha"
                    />
                    <span v-if="isStoredLha"
                      >Upload File LHA di Server SIMHPNAS</span
                    >
                    <span v-else> Upload File LHA di Server Internal </span>
                  </div>
                  <input
                    v-if="isStoredLha"
                    id="file-lha"
                    type="file"
                    name="file-lha"
                    class="mb-4"
                    @change="onUploadLha"
                  />
                  <CInput
                    v-else
                    class="mb-4"
                    :lazy="false"
                    placeholder="http://server-anda.com/file-tl.pdf"
                    :value.sync="fileLha"
                  />
                </div>
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
import { DatePicker } from 'v-calendar';

export default {
  name: 'LhaForm',
  components: {
    ConfirmModal,
    Multiselect,
    'v-date-picker': DatePicker,
  },
  mixins: [mixin, validationMixin],
  props: ['mode', 'selectedItem', 'idLha'],
  data() {
    return {
      form: this.getEmptyForm(),
      submitted: false,
      loading: false,
      isOpenConfirm: false,
      namaUnit: localStorage.getItem('namaUnit'),
      namaSubUnit: localStorage.getItem('namaSubUnit'),
      valueGroupLingkupAudit: '',
      optionsGroupLingkupAudit: [],
      valueLingkupAudit: '',
      optionsLingkupAudit: [],
      valueJenisObrik: '',
      optionsJenisObrik: [],
      valueUnitObrik: '',
      optionsUnitObrik: [],
      valueBidangObrik: '',
      optionsBidangObrik: [],
      valueSubBidangObrik: '',
      optionsSubBidangObrik: [],
      valueJenisAnggaran: '',
      optionsJenisAnggaran: [],
      valueKelurahan: '',
      optionsKelurahan: [],
      isLoadingKelurahan: false,
      valueKecamatan: '',
      valueKabkot: '',
      valueProvinsi: '',
      selectedDateSt: new Date(),
      selectedDateLha: new Date(),
      isLhaTpk: false,
      fileLha: '',
      labelIcon: {
        labelOn: '\u2713',
        labelOff: '\u2715',
      },
      isStoredLha: true,
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

    valueJenisAnggaran: function (curVal, oldVal) {
      this.$v.form.jenisAnggaran.$model = curVal.id;
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

    selectedDateSt: function (curVal, oldVal) {
      this.$v.form.tglSt.$model = curVal.toLocaleDateString('fr-CA');
    },

    selectedDateLha: function (curVal, oldVal) {
      this.$v.form.tglLha.$model = curVal.toLocaleDateString('fr-CA');
    },

    isLhaTpk: function (curVal) {
      if (curVal == true) {
        this.$v.form.flagTpk.$model = 1;
      } else {
        this.$v.form.flagTpk.$model = 0;
      }
    },
  },
  validations: {
    form: {
      // +++ Data Umum +++
      // autocomplete
      // unitAudit: { required },
      // // autocomplete
      // subUnitAudit: { required },
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
      // subBidangObrik: {},
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

      // number
      tahunAnggaran: { required },
      // autocomplete
      jenisAnggaran: { required },
      // textarea
      ringkasanLha: { required },
      // checkbox
      flagTpk: { required },

      accept: {
        required,
        mustAccept: (val) => val,
      },
    },
  },
  async mounted() {
    await this.loadGroupLingkupAudit();
    await this.loadJenisObrik();
    await this.loadUnitObrik();
    await this.loadJenisAnggaran();

    if (this.mode == 'edit') {
      await this.loadEditLhaById();

      this.selectedDateSt = new Date(this.form.tglSt);
      this.selectedDateLha = new Date(this.form.tglLha);

      this.valueGroupLingkupAudit = this.optionsGroupLingkupAudit.filter(
        (data) => data.id == this.form.groupLingkupAudit
      )[0];

      await this.loadLingkupAudit();
      this.valueLingkupAudit = this.optionsLingkupAudit.filter(
        (data) => data.id == this.form.lingkupAudit
      )[0];

      this.isLhaTpk = this.editData.flagTpk == 1 ? true : false;
      this.isStoredLha = this.editData.isStored == 1 ? true : false;

      this.valueJenisObrik = this.optionsJenisObrik.filter(
        (data) => data.id == this.form.jenisObrik
      )[0];

      this.valueUnitObrik = this.optionsUnitObrik.filter(
        (data) => data.id == this.form.unitObrik
      )[0];

      await this.loadBidangObrik();
      this.valueBidangObrik = this.optionsBidangObrik.filter(
        (data) => data.id == this.form.bidangObrik
      )[0];

      await this.loadSubBidangObrik();
      this.valueSubBidangObrik = this.optionsSubBidangObrik.filter(
        (data) => data.id == this.editData.subBidangObrik
      )[0];

      this.valueJenisAnggaran = this.optionsJenisAnggaran.filter(
        (data) => data.id == this.form.jenisAnggaran
      )[0];

      this.valueKelurahan = await this.loadKelurahanById();

      this.fileLha = this.editData.uploadFileLha;

      console.log('LHA HEREE');
      console.log(this.form);
    }
  },

  methods: {
    onDeleteFileUpdate() {
      this.editData.uploadFileLha = '';
      this.fileLha = '';
    },

    onUploadLha(e) {
      let file = e.target.files[0];
      this.fileLha = file;
    },

    convertBoolean(val) {
      if (val == true) {
        return 1;
      } else {
        return 0;
      }
    },

    async submit() {
      if (this.isValid) {
        this.submitted = true;

        const resultFormData = this.appendToFormData();

        try {
          if (this.mode == 'create') {
            this.loading = true;
            const responseData = await this.$store.dispatch(
              'module_lha/createLha',
              resultFormData
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.push('/lha');
                this.toastSuccess(
                  'Berhasil menyimpan data dengan ID ' + responseData.Nomor_LHA
                );
              }, 500);
            }
          } else if (this.mode == 'edit') {
            this.loading = true;
            const responseData = await this.$store.dispatch(
              'module_lha/updateLhaById',
              {
                idLha: this.idLha,
                data: resultFormData,
              }
            );

            if (responseData) {
              setTimeout(() => {
                this.loading = false;
                this.$router.push('/lha');
                this.toastSuccess('Berhasil edit data LHA');
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
        // unitAudit: localStorage.getItem('idUnitKerja'),
        // subUnitAudit: localStorage.getItem('idSubUnitKerja'),
        noPkpt: '',
        tahunPkpt: '',
        noSt: '',
        tglSt: new Date().toLocaleDateString('fr-CA'),
        noLha: '',
        tglLha: new Date().toLocaleDateString('fr-CA'),
        groupLingkupAudit: '',
        lingkupAudit: '',
        ringkasanLha: '',
        flagTpk: false,
        // Data Obrik
        judulLaporan: '',
        jenisObrik: '',
        unitObrik: '',
        bidangObrik: '',
        // subBidangObrik: '',
        namaPimpinan: '',
        nipPimpinan: '',
        // Data Anggaran
        tahunAnggaran: '',
        jenisAnggaran: '',
        nilaiRencana: 0,
        nilaiRealisasi: 0,
        nilaiDiaudit: 0,
        // Data Wilayah
        kelurahan: '',
        kecamatan: '',
        kabkot: '',
        provinsi: '',
        // accept all form
        accept: false,
      };
    },

    appendToFormData() {
      const fd = new FormData();

      if (this.mode == 'edit') {
        fd.append('_method', 'PATCH');
      }

      // console.log('LHA HEREE!!');
      // console.log({
      //   Nomor_PKPT: this.$v.form.noPkpt.$model,
      //   Tahun_PKPT: this.$v.form.tahunPkpt.$model,
      //   Nomor_LHA: this.$v.form.noLha.$model,
      //   Tanggal_LHA: this.$v.form.tglLha.$model,
      //   Nomor_ST: this.$v.form.noSt.$model,
      //   Tanggal_ST: this.$v.form.tglSt.$model,
      //   Kode_Grup_Lingkup_Audit: this.$v.form.groupLingkupAudit.$model,
      //   Kode_Lingkup_Audit: this.$v.form.lingkupAudit.$model,
      //   Kode_Jenis_Obrik: this.$v.form.jenisObrik.$model,
      //   Kode_Unit_Obrik: this.$v.form.unitObrik.$model,
      //   Kode_Bidang_Obrik: this.$v.form.bidangObrik.$model,
      //   Kode_Provinsi: this.$v.form.provinsi.$model,
      //   Kode_KabupatenKota: this.$v.form.kabkot.$model,
      //   Kode_Kecamatan: this.$v.form.kecamatan.$model,
      //   Kode_Kelurahan: this.$v.form.kelurahan.$model,
      //   Judul_laporan: this.$v.form.judulLaporan.$model,
      //   Tahun_Anggaran: this.$v.form.tahunAnggaran.$model,
      //   Kode_Jenis_anggaran: this.$v.form.jenisAnggaran.$model,
      //   Nama_Pimpinan: this.$v.form.namaPimpinan.$model,
      //   NIP_Pimpinan: this.$v.form.nipPimpinan.$model,
      //   Rencana_Anggaran: this.$v.form.nilaiRencana.$model,
      //   Realisasi_Anggaran: this.$v.form.nilaiRealisasi.$model,
      //   Anggaran_yang_diaudit: this.$v.form.nilaiDiaudit.$model,
      //   Ringkasan_LHA: this.$v.form.ringkasanLha.$model,
      //   Flag_TPK: this.convertBoolean(this.isLhaTpk),
      //   is_stored: this.convertBoolean(this.isStoredLha),
      //   Upload_file_LHA: this.fileLha,
      //   Kode_Sub_Bidang_Obrik: this.valueSubBidangObrik.id,
      // });

      fd.append('Nomor_PKPT', this.$v.form.noPkpt.$model);
      fd.append('Tahun_PKPT', this.$v.form.tahunPkpt.$model);
      fd.append('Nomor_LHA', this.$v.form.noLha.$model);
      fd.append('Tanggal_LHA', this.$v.form.tglLha.$model);
      fd.append('Nomor_ST', this.$v.form.noSt.$model);
      fd.append('Tanggal_ST', this.$v.form.tglSt.$model);
      fd.append(
        'Kode_Grup_Lingkup_Audit',
        this.$v.form.groupLingkupAudit.$model
      );
      fd.append('Kode_Lingkup_Audit', this.$v.form.lingkupAudit.$model);
      fd.append('Kode_Jenis_Obrik', this.$v.form.jenisObrik.$model);
      fd.append('Kode_Unit_Obrik', this.$v.form.unitObrik.$model);
      fd.append('Kode_Bidang_Obrik', this.$v.form.bidangObrik.$model);

      fd.append('Kode_Provinsi', this.$v.form.provinsi.$model);
      fd.append('Kode_KabupatenKota', this.$v.form.kabkot.$model);
      fd.append('Kode_Kecamatan', this.$v.form.kecamatan.$model);
      fd.append('Kode_Kelurahan', this.$v.form.kelurahan.$model);

      fd.append('Judul_laporan', this.$v.form.judulLaporan.$model);
      fd.append('Tahun_Anggaran', this.$v.form.tahunAnggaran.$model);
      fd.append('Kode_Jenis_anggaran', this.$v.form.jenisAnggaran.$model);

      fd.append('Nama_Pimpinan', this.$v.form.namaPimpinan.$model);
      fd.append('NIP_Pimpinan', this.$v.form.nipPimpinan.$model);
      fd.append('Rencana_Anggaran', this.$v.form.nilaiRencana.$model);
      fd.append('Realisasi_Anggaran', this.$v.form.nilaiRealisasi.$model);
      fd.append('Anggaran_yang_diaudit', this.$v.form.nilaiDiaudit.$model);

      fd.append('Ringkasan_LHA', this.$v.form.ringkasanLha.$model);
      fd.append('Flag_TPK', this.convertBoolean(this.isLhaTpk)); // this.$v.form.flagTpk.$model);

      // OPSIONAL
      fd.append('is_stored', this.convertBoolean(this.isStoredLha));

      if (this.fileLha) {
        fd.append('Upload_file_LHA', this.fileLha);
      }

      if (this.valueSubBidangObrik) {
        fd.append('Kode_Sub_Bidang_Obrik', this.valueSubBidangObrik.id);
      }

      return fd;
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

.form-lha #file-lha {
  border: none !important;
}
</style>
