<template>
  <CRow class="detail-lha">
    <CCol sm="12">
      <div class="text-2xl mb-4 font-semibold">
        <h3>Detail Laporan Hasil Audit</h3>
      </div>
      <CCard>
        <CCardBody>
          <CTabs add-tab-classes="">
            <CTab>
              <template slot="title">
                <CIcon name="cil-find-in-page" /> Data Umum
              </template>
              <div v-if="form.uploadFileLha">
                <CButton
                  shape="pill"
                  class="px-3 my-3"
                  color="info"
                  @click="onOpenFile"
                >
                  Lihat File Laporan
                </CButton>
              </div>

              <div
                class="p-3"
                style="background: #f9fafb"
              >
                <h5
                  v-if="form.flagTpk == 1"
                  class="text-base font-semibold text-red-500"
                >
                  Data Umum LHA Tindak Pidana Khusus
                </h5>
                <h5
                  v-else
                  class="text-base font-semibold"
                >
                  Data Umum LHA
                </h5>
              </div>

              <div class="p-3">
                <!-- ROW 1 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Unit Audit"
                      :value="namaUnit"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Sub Unit Audit"
                      :value="namaSubUnit"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>

                <!-- ROW 2 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Nomor PKPT"
                      :value="form.nomorPkpt"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Tahun PKPT"
                      :value="form.tahunPkpt"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>

                <!-- ROW 3 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Nomor ST"
                      :value="form.nomorST"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Tanggal ST"
                      :value="form.tglST"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>

                <!-- ROW 4 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Nomor LHA"
                      :value="form.nomorLha"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Tanggal LHA"
                      :value="form.tglLha"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>

                <!-- ROW 5 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Institusi Yang Mengaudit"
                      :value="form.grupLingkupAudit"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Jenis Kegiatan Pengawasan"
                      :value="form.lingkupAudit"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>

                <!-- ROW 6 -->
                <CRow>
                  <CCol lg="12">
                    <CTextarea
                      rows="5"
                      label="Ringkasan LHA"
                      :value="form.ringkasanLha"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>
              </div>

              <!-- DATA OBRIIK -->
              <div
                class="p-3"
                style="background: #f9fafb"
              >
                <h5 class="text-base font-semibold">
                  Data Obrik
                </h5>
              </div>

              <div class="p-3">
                <!-- ROW 1 -->
                <CRow>
                  <CCol lg="12">
                    <CTextarea
                      rows="3"
                      label="Judul Laporan"
                      :value="form.judulLaporan"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>

                <!-- ROW 2 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Jenis Obrik"
                      :value="form.jenisObrik"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Unit Obrik"
                      :value="form.unitObrik"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Bidang Obrik"
                      :value="form.bidangObrik"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Sub Bidang Obrik"
                      :value="form.subBidangObrik"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Nama Pimpinan"
                      :value="form.namaPimpinan"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="NIP Pimpinan"
                      :value="form.nipPimpinan"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>
              </div>

              <!-- DATA ANGGARAAN -->
              <div
                class="p-3"
                style="background: #f9fafb"
              >
                <h5 class="text-base font-semibold">
                  Data Anggaran
                </h5>
              </div>

              <div class="p-3">
                <!-- ROW 1 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Tahun Anggaran"
                      :value="form.tahunAnggaran"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Jenis Anggatan"
                      :value="form.jenisAnggaran"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>

                <!-- ROW 2 -->
                <CRow>
                  <CCol lg="4">
                    <CInput
                      label="Rencana Anggaran"
                      :value="form.rencanaAnggaran"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="4">
                    <CInput
                      label="Realisasi Anggaran"
                      :value="form.realisasiAnggaran"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="4">
                    <CInput
                      label="Anggaran Yang Diaudit"
                      :value="form.anggaranYangDiaudit"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>
              </div>

              <!-- DATA WILAYAH -->
              <div
                class="p-3"
                style="background: #f9fafb"
              >
                <h5 class="text-base font-semibold">
                  Data Wilayah
                </h5>
              </div>

              <div class="p-3">
                <!-- ROW 1 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Provinsi"
                      :value="form.provinsi"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Kabupaten / Kota"
                      :value="form.kabkot"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>

                <!-- ROW 2 -->
                <CRow>
                  <CCol lg="6">
                    <CInput
                      label="Kecamatan"
                      :value="form.kecamatan"
                      :readonly="true"
                    />
                  </CCol>
                  <CCol lg="6">
                    <CInput
                      label="Kelurahan"
                      :value="form.kelurahan"
                      :readonly="true"
                    />
                  </CCol>
                </CRow>
              </div>
            </CTab>
            <CTab>
              <template slot="title">
                <CIcon name="cil-people" /> Tim Audit
              </template>
              <div
                v-if="form.dataTimAudit.length == 0"
                class="text-center my-4 font-semibold"
              >
                <h5>Laporan ini Belum Memiliki Tim Audit</h5>
              </div>
              <div class="mt-4">
                <div
                  v-for="(item, index) in form.dataTimAudit"
                  :key="item.nip"
                  class="px-4 mb-3"
                >
                  <div>
                    <!-- ROW 1 -->
                    <CRow class="mb-2 h5">
                      <span class="mr-2"> {{ index + 1 }}. </span>
                      <span>{{ item.peran }}</span>
                    </CRow>
                    <CRow>
                      <CCol lg="6">
                        <CInput
                          label="Nama Lengkap"
                          :value="item.nama"
                          :readonly="true"
                        />
                      </CCol>
                      <CCol lg="6">
                        <CInput
                          label="NIP"
                          :value="item.nip"
                          :readonly="true"
                        />
                      </CCol>
                    </CRow>
                  </div>
                </div>
              </div>
            </CTab>
            <CTab acttive>
              <template slot="title">
                <CIcon name="cil-color-border" /> Temuan
              </template>
              <div
                v-if="form.dataTemuan.length == 0"
                class="text-center my-4 font-semibold"
              >
                <h5>Laporan ini Belum Memiliki Data Temuan</h5>
              </div>
              <div>
                <div
                  v-for="(itemTemuan, index) in form.dataTemuan"
                  :key="itemTemuan.nomorTemuan"
                  class="mb-3"
                >
                  <div>
                    <div class="p-3 mb-2 h5 bg-blue-200">
                      <span class="mr-2"> Temuan Nomor</span>
                      <span>{{ itemTemuan.nomorTemuan }} </span>
                      <span
                        v-if="itemTemuan.flagTpk == 1"
                        class="text-red-500"
                      >(Temuan Investigatif)</span>
                    </div>
                    <CRow>
                      <CCol lg="6">
                        <CTextarea
                          row="3"
                          label="Jenis Temuan"
                          :value="itemTemuan.jenisTemuan"
                          :readonly="true"
                        />
                      </CCol>
                      <CCol lg="6">
                        <CTextarea
                          row="3"
                          label="Kelompok Temuan"
                          :value="itemTemuan.kelompokTemuan"
                          :readonly="true"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="6">
                        <CInput
                          label="Nilai Temuan"
                          :value="itemTemuan.nilaiTemuan"
                          :readonly="true"
                        />
                      </CCol>
                      <CCol lg="6">
                        <CTextarea
                          row="3"
                          label="Sub Kelompok Temuan"
                          :value="itemTemuan.subKelompokTemuan"
                          :readonly="true"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="12">
                        <CTextarea
                          row="3"
                          label="Memo Temuan"
                          :value="itemTemuan.memoTemuan"
                          :readonly="true"
                        />
                      </CCol>
                    </CRow>

                    <CTabs add-tab-classes="bg-tabs-temuan">
                      <CTab active>
                        <template slot="title">
                          <CIcon name="cil-drop" /> Penyebab
                        </template>
                        <div
                          v-if="itemTemuan.dataPenyebab.length == 0"
                          class="text-center py-4 font-semibold"
                        >
                          <h5>
                            Temuan Nomor {{ itemTemuan.nomorTemuan }} Tidak
                            Memiliki Penyebab
                          </h5>
                        </div>
                        <div
                          v-else
                          class="pt-4 pb-2"
                        >
                          <div
                            v-for="itemPenyebab in itemTemuan.dataPenyebab"
                            :key="itemPenyebab.nomorPenyebab"
                            class="px-4 mb-3"
                          >
                            <div>
                              <!-- ROW 1 -->
                              <CRow class="p-3 mb-3 bg-yellow-200">
                                <h5 class="text-base font-semibold">
                                  Penyebab Nomor
                                  {{ itemPenyebab.nomorPenyebab }}
                                </h5>
                              </CRow>
                              <CRow>
                                <CCol lg="12">
                                  <CInput
                                    label="Nama Penyebab"
                                    :value="
                                      itemPenyebab.kodePenyebab +
                                        ' - ' +
                                        itemPenyebab.deskripsi
                                    "
                                    :readonly="true"
                                  />
                                </CCol>
                              </CRow>
                              <CRow>
                                <CCol lg="12">
                                  <CTextarea
                                    row="4"
                                    label="Memo Penyebab"
                                    :value="itemPenyebab.memoPenyebab"
                                    :readonly="true"
                                  />
                                </CCol>
                              </CRow>
                            </div>
                          </div>
                        </div>
                      </CTab>
                      <CTab>
                        <template slot="title">
                          <CIcon name="cil-clipboard" /> Rekomendasi
                        </template>
                        <div
                          v-if="itemTemuan.dataRekomendasi.length == 0"
                          class="text-center py-4 font-semibold"
                        >
                          <h5>
                            Temuan Nomor {{ itemTemuan.nomorTemuan }} Tidak
                            Memiliki Rekomendasi
                          </h5>
                        </div>
                        <div
                          v-else
                          class="pt-4 pb-2"
                        >
                          <div
                            v-for="itemRek in itemTemuan.dataRekomendasi"
                            :key="itemRek.nomorRekomendasi"
                            class="px-4 mb-3"
                          >
                            <div>
                              <!-- ROW 1 -->
                              <CRow class="p-3 mb-3 bg-yellow-200">
                                <h5 class="text-base font-semibold">
                                  Rekomendasi Nomor
                                  {{ itemRek.nomorRekomendasi }}
                                </h5>
                              </CRow>
                              <CRow>
                                <CCol lg="6">
                                  <CTextarea
                                    label="Kelompok Rekomendasi"
                                    :value="itemRek.kelompokRekomendasi"
                                    :readonly="true"
                                  />
                                </CCol>
                                <CCol lg="6">
                                  <CTextarea
                                    label="Sub Kelompok Rekomendasi"
                                    :value="itemRek.subKelompokRekomendasi"
                                    :readonly="true"
                                  />
                                </CCol>
                              </CRow>
                              <CRow>
                                <CCol lg="6">
                                  <CInput
                                    label="Nilai Rekomendasi"
                                    :value="itemRek.nilaiRekomendasi"
                                    :readonly="true"
                                  />
                                </CCol>
                                <CCol lg="6">
                                  <CInput
                                    label="Status Rekomendasi"
                                    :value="itemRek.statusRekomendasi"
                                    :readonly="true"
                                  />
                                </CCol>
                              </CRow>
                              <CRow>
                                <CCol lg="12">
                                  <CTextarea
                                    label="Memo Rekomendasi"
                                    :value="itemRek.memoRekomendasi"
                                    :readonly="true"
                                  />
                                </CCol>
                              </CRow>

                              <CTabs add-tab-classes="bg-tabs-rek">
                                <CTab>
                                  <template slot="title">
                                    <CIcon name="cil-user" /> Pelaku
                                  </template>
                                  <div
                                    v-if="itemRek.dataPelaku.length == 0"
                                    class="text-center py-4 font-semibold"
                                  >
                                    <h5>
                                      Rekomendasi Nomor
                                      {{ itemRek.nomorRekomendasi }} Tidak
                                      Memiliki Pelaku
                                    </h5>
                                  </div>
                                  <div
                                    v-else
                                    class="pt-2 pb-2"
                                  >
                                    <div
                                      v-for="(itemPelaku,
                                              index) in itemRek.dataPelaku"
                                      :key="itemPelaku.nip"
                                      class="px-4 mb-3"
                                    >
                                      <div>
                                        <!-- ROW 1 -->
                                        <CRow class="p-3 mb-3 bg-green-200">
                                          <h5 class="text-base font-semibold">
                                            <span class="mr-2">
                                              {{ index + 1 }}.
                                            </span>
                                            <span>{{
                                              itemPelaku.jabatan
                                            }}</span>
                                          </h5>
                                        </CRow>
                                        <CRow>
                                          <CCol lg="6">
                                            <CInput
                                              label="Nama Lengkap"
                                              :value="itemPelaku.nama"
                                              :readonly="true"
                                            />
                                          </CCol>
                                          <CCol lg="6">
                                            <CInput
                                              label="NIP"
                                              :value="itemPelaku.nip"
                                              :readonly="true"
                                            />
                                          </CCol>
                                        </CRow>
                                        <CRow>
                                          <CCol lg="12">
                                            <CTextarea
                                              label="Memo Kesalahan"
                                              :value="itemPelaku.memoKesalahan"
                                              :readonly="true"
                                            />
                                          </CCol>
                                        </CRow>
                                      </div>
                                    </div>
                                  </div>
                                </CTab>
                                <CTab>
                                  <template slot="title">
                                    <CIcon name="cil-check-circle" /> Tindak
                                    Lanjut
                                  </template>
                                  <div
                                    v-if="itemRek.dataTl.length == 0"
                                    class="text-center py-4 font-semibold"
                                  >
                                    <h5>
                                      Rekomendasi Nomor
                                      {{ itemRek.nomorRekomendasi }} Belum
                                      Memiliki Tindak Lanjut
                                    </h5>
                                  </div>
                                  <div
                                    v-else
                                    class="pt-2 pb-2"
                                  >
                                    <div
                                      v-for="itemTl in itemRek.dataTl"
                                      :key="itemTl.id"
                                      class="px-4 mb-1"
                                    >
                                      <div>
                                        <!-- ROW 1 -->
                                        <CRow class="p-3 mb-3 bg-green-200">
                                          <h5 class="text-base font-semibold">
                                            TL Nomor {{ itemTl.nomorTl }}
                                          </h5>
                                        </CRow>
                                        <CRow>
                                          <CCol lg="6">
                                            <CTextarea
                                              label="Kelompok TL"
                                              :value="itemTl.kelompokTl"
                                              :readonly="true"
                                            />
                                          </CCol>
                                          <CCol lg="6">
                                            <CTextarea
                                              label="Sub Kelompok TL"
                                              :value="itemTl.subKelompokTl"
                                              :readonly="true"
                                            />
                                          </CCol>
                                        </CRow>
                                        <CRow>
                                          <CCol lg="6">
                                            <CInput
                                              label="Nilai TL"
                                              :value="itemTl.nilaiTl"
                                              :readonly="true"
                                            />
                                          </CCol>
                                        </CRow>
                                        <CRow>
                                          <CCol lg="12">
                                            <CTextarea
                                              label="Memo TL"
                                              :value="itemTl.memoTl"
                                              :readonly="true"
                                            />
                                          </CCol>
                                        </CRow>
                                      </div>
                                    </div>
                                  </div>
                                </CTab>
                              </CTabs>
                            </div>
                          </div>
                        </div>
                      </CTab>
                    </CTabs>
                  </div>
                  <div v-if="index != form.dataTemuan.length - 1">
                    <hr>
                  </div>
                </div>
              </div>
            </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </CCol>
    <CModal
      title="File LHA"
      color="info"
      :show.sync="isOpenFile"
      size="lg"
    >
      <embed
        :src="
          form.isStored == 1
            ? apiUrl + '/storage/' + form.uploadFileLha
            : form.uploadFileLha
        "
        type="application/pdf"
        width="100%"
        height="550px"
      >
      <template #footer-wrapper>
        <div />
      </template>
    </CModal>
    <confirm-modal
      v-model="isOpenConfirm"
      @close-modal="isOpenConfirm = false"
      @confirm-ok="$router.go(-1)"
    />
  </CRow>
</template>

<script>
import ConfirmModal from "@/components/Confirm/ConfirmModal.vue";
import mixin from "./mixin";

export default {
  name: "LhaForm",
  components: {
    ConfirmModal
  },
  mixins: [mixin],
  props: ["mode", "selectedItem", "idLha"],
  data() {
    return {
      form: "",
      submitted: false,
      loading: false,
      isOpenConfirm: false,
      namaUnit: localStorage.getItem("namaUnit"),
      namaSubUnit: localStorage.getItem("namaSubUnit"),
      valueGroupLingkupAudit: "",
      optionsGroupLingkupAudit: [],
      valueLingkupAudit: "",
      optionsLingkupAudit: [],
      valueJenisObrik: "",
      optionsJenisObrik: [],
      valueUnitObrik: "",
      optionsUnitObrik: [],
      valueBidangObrik: "",
      optionsBidangObrik: [],
      valueSubBidangObrik: "",
      optionsSubBidangObrik: [],
      valueJenisAnggaran: "",
      optionsJenisAnggaran: [],
      valueKelurahan: "",
      optionsKelurahan: [],
      isLoadingKelurahan: false,
      valueKecamatan: "",
      valueKabkot: "",
      valueProvinsi: "",
      selectedDateSt: new Date(),
      selectedDateLha: new Date(),
      isLhaTpk: false,
      fileLha: "",
      labelIcon: {
        labelOn: "\u2713",
        labelOff: "\u2715"
      },
      isStoredLha: true,
      isOpenFile: false,
      apiUrl: this.$apiAddress
    };
  },
  async mounted() {
    await this.$store.dispatch("module_lha/loadDetailLhaById", {
      idLha: this.idLha
    });

    this.form = this.$store.getters["module_lha/lhaById"];
  },
  methods: {
    onOpenFile() {
      this.isOpenFile = true;
    }
  }
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

.detail-lha .bg-tabs-temuan {
  background-color: #ffffff;
  /* background-color: #f9fafb; */
  color: #3c4b64;
}

.detail-lha .bg-tabs-rek {
  background-color: #ffffff;
  /* background-color: #f0f2f4; */
  color: #3c4b64;
}

.detail-lha .form-control:disabled,
.detail-lha .form-control[readonly] {
  background-color: #ffffff;
}

.detail-lha .form-control {
  border: none !important;
  padding: 0 !important;
}
</style>
