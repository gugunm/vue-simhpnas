<template>
  <div>
    <CButton color="success" @click="downloadPDF"> Generate PDF TP 3 </CButton>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  data() {
    return {
      reportTpTiga: null,
    };
  },
  async mounted() {
    await this.loadReportTpTiga();
  },
  methods: {
    downloadPDF() {
      console.log('TP TIGA HEREE!!');
      console.log(this.reportTpTiga);

      const data = this.reportTpTiga;

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
              widths: [200, 50, 50, 100, 100],
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
              widths: [85, 20, 40, 140, 125, 30, 50],
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
                    text: '8. Tahun Anggaran',
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
                    text: '9. Nilai Anggaran',
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
                    text: '10. Realisasi Anggaran',
                  },
                  {
                    text: this.$func.convertToRupiah(data.realisasiAnggaran),
                    colSpan: 2,
                  },
                  {},
                ],
                [
                  {
                    text: '4. Unit ',
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
                    text: '11. Anggaran yang Diaudit',
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
                    text: '12. Jenis Anggaran',
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
                    text: '5. Provinsi',
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
                    text: '6. Kabupaten/Kota',
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
                    text: '7. Kecamatan',
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
    },
    async loadReportTpTiga() {
      try {
        await this.$store.dispatch('module_lha/loadDetailLhaById', {
          idLha: 'YmnMjPGreV',
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