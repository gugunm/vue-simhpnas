<template>
  <!-- v-c-tooltip="{
      content: 'Print Form',
      placement: 'top',
    }" -->
  <CButton color="info" variant="ghost" size="sm" @click="downloadPDF">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
      />
    </svg>
  </CButton>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  props: ['idLha'],
  data() {
    return {
      reportTpTiga: null,
    };
  },
  // async mounted() {
  //   await this.loadReportTpTiga();
  // },
  methods: {
    async downloadPDF() {
      // console.log('TP TIGA HEREE!!');
      // console.log(this.reportTpTiga);

      await this.loadReportTpTiga();

      const data = this.reportTpTiga;

      const dataTim = this.reportTpTiga.dataTimAudit.map((data, index) => {
        return [
          {
            text: index + 1,
            alignment: 'center',
          },
          {
            text: data.nip,
            alignment: 'center',
          },
          {
            text: data.nama,
          },
          {
            text: data.peran,
          },
        ];
      });

      const dataTemuanToPdf = [];
      this.reportTpTiga.dataTemuan.forEach((data) => {
        // console.log('DATA TEMUAN HERE!');
        // console.log(data);

        data.dataPenyebab = data.dataPenyebab.map((dpenyebab) => {
          return [
            {
              text: dpenyebab.kodePenyebab,
              alignment: 'center',
              fillColor: '#eeeeee',
              margin: [0, 3],
            },
            {},
            {
              text: dpenyebab.nomorPenyebab,
              alignment: 'center',
              bold: true,
              fillColor: '#dddddd',
              margin: [0, 3],
            },
            {
              text: dpenyebab.memoPenyebab,
              colSpan: 2,
            },
            {},
            {},
          ];
        });

        const dataRekToPdf = [];
        data.dataRekomendasi = data.dataRekomendasi.forEach((drek) => {
          drek.dataTl = drek.dataTl.map((dtl) => {
            return [
              {
                text: dtl.kodeSubKelompokTl,
                alignment: 'center',
                fillColor: '#dddddd',
                margin: [0, 3],
              },
              {},
              {},
              {
                text: dtl.nomorTl,
                alignment: 'center',
                bold: true,
                fillColor: '#dddddd',
                margin: [0, 3],
              },
              {
                text: dtl.memoTl,
              },
              {
                text: this.$func.convertToRupiah(dtl.nilaiTl),
              },
            ];
          });

          const dataRek = [
            [
              {
                text: drek.kodeSubKelompokRekomendasi,
                alignment: 'center',
                fillColor: '#eeeeee',
                margin: [0, 3],
              },
              {},
              {
                text: drek.nomorRekomendasi,
                alignment: 'center',
                bold: true,
                fillColor: '#dddddd',
                margin: [0, 3],
              },
              {
                text: drek.memoRekomendasi,
                colSpan: 2,
              },
              {},
              {
                text: this.$func.convertToRupiah(drek.nilaiRekomendasi),
              },
            ],
            drek.dataTl.length > 0 && [
              {},
              {},
              {},
              {
                text: 'TINDAK LANJUT',
                colSpan: 2,
                margin: [0, 7],
                bold: true,
              },
              {},
              {},
            ],
            ...drek.dataTl,
            drek.dataTl.length > 0 && [
              {
                text: '',
                colSpan: 6,
                margin: [0, 5],
              },
              {},
              {},
              {},
              {},
              {},
            ],
          ].filter(Boolean);

          dataRekToPdf.push(...dataRek);
        });

        const result = [
          [
            {},
            {
              text: 'TEMUAN',
              colSpan: 4,
              margin: [0, 7],
              bold: true,
            },
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: data.kodeSubKelompokTemuan,
              alignment: 'center',
              fillColor: '#eeeeff',
              margin: [0, 3],
            },
            {
              text: data.nomorTemuan,
              alignment: 'center',
              bold: true,
              fillColor: '#dddddd',
              margin: [0, 3],
            },
            {
              text: data.memoTemuan,
              colSpan: 3,
            },
            {},
            {},
            {
              text: this.$func.convertToRupiah(data.nilaiTemuan),
            },
          ],
          data.dataPenyebab.length > 0 && [
            {},
            {},
            {
              text: 'PENYEBAB',
              colSpan: 3,
              margin: [0, 7],
              bold: true,
            },
            {},
            {},
            {},
          ],
          ...data.dataPenyebab,
          dataRekToPdf.length > 0 && [
            {},
            {},
            {
              text: 'REKOMENDASI',
              colSpan: 3,
              margin: [0, 7],
              bold: true,
            },
            {},
            {},
            {},
          ],
          ...dataRekToPdf,
        ].filter(Boolean);

        dataTemuanToPdf.push(...result);
      });

      const docDef = {
        pageSize: 'A4',
        // pageOrientation: 'landscape',
        pageMargins: [20, 20, 20, 30],
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                text: 'Tanggal Cetak : ' + new Date().toLocaleString('id'),
                margin: [17, 0, 0, 0],
                fontSize: 7,
              },
              {
                text:
                  'halaman ke ' + currentPage.toString() + ' dari ' + pageCount,
                alignment: 'right',
                margin: [0, 0, 40, 0],
                fontSize: 7,
              },
            ],
          };
        },

        content: [
          {
            text: 'FORM ENTRY SHEET',
            fontSize: 14,
            bold: true,
            alignment: 'center',
          },
          {
            text: 'I. DATA UMUM PEMERIKSAAN',
            fontSize: 12,
            bold: true,
            margin: [0, 10, 0, 10],
          },
          {
            fontSize: 10,
            table: {
              widths: [200, 50, 50, 100, '*'],
              headerRows: 0,
              // keepWithHeaderRows: 1,
              body: [
                [
                  {
                    text: '1. LHP',
                    rowSpan: 2,
                  },
                  {
                    text: 'Nomor',
                  },
                  {
                    text: data.nomorLha,
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {},
                  {
                    text: 'Tanggal',
                  },
                  {
                    text: data.tglLha,
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: '2. Surat Tugas',
                    rowSpan: 2,
                  },
                  {
                    text: 'Nomor',
                  },
                  {
                    text: data.nomorST,
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {},
                  {
                    text: 'Tanggal',
                  },
                  {
                    text: data.tglST,
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: '3. Tahun/No. PKPT',
                  },
                  {
                    text: data.tahunPkpt,
                    colSpan: 2,
                  },
                  {},
                  {
                    text: 'Nomor PKPT',
                  },
                  {
                    text: data.nomorPkpt,
                  },
                ],
                [
                  {
                    text: '4. Inspektorat',
                  },
                  {
                    text: data.kodeUnitAudit,
                  },
                  {
                    text: data.unitAudit,
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: '5. Bidang/Unitwas',
                  },
                  {
                    text: data.kodeSubUnitAudit,
                  },
                  {
                    text: data.subUnitAudit,
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: '6. Jenis Pemeriksaan',
                  },
                  {
                    text: data.kodeGrupLingkupAudit,
                  },
                  {
                    text: data.kodeLingkupAudit,
                  },
                  {
                    text: data.lingkupAudit,
                    colSpan: 2,
                  },
                  {},
                ],
              ],
            },
          },
          {
            text: 'II. DATA OBYEK PEMERIKSAAN',
            fontSize: 12,
            bold: true,
            margin: [0, 15, 0, 10],
          },
          {
            fontSize: 10,
            table: {
              widths: [85, 20, 40, 140, 125, 30, '*'],
              headerRows: 0,
              // keepWithHeaderRows: 1,
              body: [
                [
                  {
                    text: '1. Judul Laporan',
                    rowSpan: 2,
                  },
                  {
                    text: data.judulLaporan,
                    rowSpan: 2,
                    colSpan: 3,
                  },
                  {},
                  {},
                  {
                    text: '7. Tahun Anggaran',
                  },
                  {
                    text: data.tahunAnggaran,
                    colSpan: 2,
                  },
                  {},
                ],
                [
                  {},
                  {},
                  {},
                  {},
                  {
                    text: '8. Nilai Anggaran',
                  },
                  {
                    text: this.$func.convertToRupiah(data.rencanaAnggaran),
                    colSpan: 2,
                  },
                  {},
                ],
                [
                  {
                    text: '2. Jenis Obrik ',
                  },
                  {
                    text: data.kodeJenisObrik,
                    colSpan: 2,
                  },
                  {},
                  {
                    text: data.jenisObrik,
                  },
                  {
                    text: '9. Realisasi Anggaran',
                  },
                  {
                    text: this.$func.convertToRupiah(data.realisasiAnggaran),
                    colSpan: 2,
                  },
                  {},
                ],
                [
                  {
                    text: '3. Unit ',
                    rowSpan: 2,
                    border: [true, true, true, false],
                  },
                  {
                    text: data.kodeUnitObrik,
                    colSpan: 2,
                    rowSpan: 2,
                  },
                  {},
                  {
                    text: data.unitObrik,
                    rowSpan: 2,
                  },
                  {
                    text: '10. Anggaran yang Diaudit',
                  },
                  {
                    text: this.$func.convertToRupiah(data.anggaranYangDiaudit),
                    colSpan: 2,
                  },
                  {},
                ],
                [
                  {},
                  {},
                  {},
                  {},
                  {
                    text: '11. Jenis Anggaran',
                  },
                  {
                    text: data.kodeJenisAnggaran,
                  },
                  {
                    text: data.jenisAnggaran,
                  },
                ],
                [
                  {
                    text: 'Pimpinan Obrik ',
                    border: [true, false, true, true],
                    margin: [10, 0, 0, 0],
                  },
                  {
                    text: data.namaPimpinan,
                    border: [true, true, false, true],
                    colSpan: 3,
                  },
                  {},
                  {},
                  {
                    text: 'NIP: ' + data.nipPimpinan,
                    colSpan: 3,
                    border: [false, true, true, true],
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: 'Bidang',
                    margin: [10, 0, 0, 0],
                  },
                  {
                    text: data.kodeBidangObrik,
                    colSpan: 2,
                  },
                  {},
                  {
                    text: data.bidangObrik,
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: 'Sub Bidang',
                    margin: [10, 0, 0, 0],
                  },
                  {
                    text: data.kodeSubBidangObrik,
                    colSpan: 2,
                  },
                  {},
                  {
                    text: data.subBidangObrik,
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: '4. Provinsi',
                  },
                  {
                    text: data.kodeProvinsi,
                    colSpan: 2,
                  },
                  {},
                  {
                    text: data.provinsi,
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: '5. Kabupaten/Kota',
                  },
                  {
                    text: data.kodeKabkot,
                    colSpan: 2,
                  },
                  {},
                  {
                    text: data.kabkot,
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: '6. Kecamatan',
                  },
                  {
                    text: data.kodeKecamatan,
                    colSpan: 2,
                  },
                  {},
                  {
                    text: data.kecamatan,
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                ],
              ],
            },
          },
          {
            text: 'III. TIM AUDIT',
            fontSize: 12,
            bold: true,
            margin: [0, 15, 0, 10],
          },
          {
            fontSize: 10,
            pageBreak: 'after',
            table: {
              widths: [25, '*', '*', '*'],
              // widths: [25, 130, 190, 170],
              headerRows: 1,
              body: [
                [
                  {
                    text: 'No.',
                    alignment: 'center',
                  },
                  {
                    text: 'NIP',
                    alignment: 'center',
                  },
                  {
                    text: 'Nama',
                    alignment: 'center',
                  },
                  {
                    text: 'Jabatan',
                    alignment: 'center',
                  },
                ],
                ...dataTim,
              ],
            },
          },
          {
            text: 'IV. RINCIAN TEMUAN PEMERIKSAAN SAMPAI DENGAN TINDAK LANJUT',
            fontSize: 12,
            bold: true,
            margin: [0, 15, 0, 10],
          },
          {
            fontSize: 9,
            // pageBreak: 'after',
            table: {
              widths: [40, 20, 20, 20, '*', 80],
              headerRows: 1,
              body: [
                [
                  {
                    text: 'KODE',
                    alignment: 'center',
                    bold: true,
                  },
                  {
                    text: 'URAIAN',
                    alignment: 'center',
                    bold: true,
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                  {
                    text: 'NILAI TP/REK/TL',
                    bold: true,
                  },
                ],
                // ...dataTemuan,
                ...dataTemuanToPdf,
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return 0;
              },
              vLineWidth: function (i, node) {
                return 0;
              },
            },
          },
        ],
        styles: {
          headerPeriod: {
            alignment: 'right',
          },
          tableHeader: {
            alignment: 'center',
            fontSize: 8,
          },
          tableSubHeader: {
            alignment: 'left',
            fontSize: 8,
            bold: true,
          },
        },
      };

      pdfMake.createPdf(docDef).open();
      // pdfMake.createPdf(docDef).download(data.nomorLha);
    },
    async loadReportTpTiga() {
      try {
        await this.$store.dispatch('module_lha/loadDetailLhaById', {
          idLha: this.idLha,
        });

        this.reportTpTiga = this.$store.getters['module_lha/lhaById'];
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style>
</style>