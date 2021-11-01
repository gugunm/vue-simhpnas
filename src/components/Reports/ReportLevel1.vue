<template>
  <div>
    <CButton color="success" @click="downloadPDF">
      <div class="flex items-center justify-center">
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            /></svg
        ></span>
        <span>Rekapitulasi</span>
      </div>
    </CButton>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/utils/api.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  data() {
    return {
      report: null,
    };
  },
  async mounted() {
    await this.loadReportLv1();
  },
  methods: {
    downloadPDF() {
      const dataShow = this.report.map((data) => {
        return [
          {
            text: data.bidangObrik,
            fontSize: 8,
            margin: [10, 0],
          },
          {
            text: data.jumlahTemuan,
          },
          {
            text: this.$func.convertToRupiah(data.totalNilaiTemuan),
          },
          {
            text: data.jumlahRekomendasi,
          },
          {
            text: this.$func.convertToRupiah(data.totalNilaiRekomendasi),
          },
          {
            text: data.jumlahTl,
          },
          {
            text: this.$func.convertToRupiah(data.totalNilaiTl),
          },
          {
            text: this.$func.convertToRupiah(data.totalSaldo),
          },
        ];
      });

      const repDummy = [];

      for (let i = 0; i < 50; i++) {
        repDummy.push([
          {
            text: 'SEKRETARIAT DAERAH KABUPATEN',
            fontSize: 8,
            margin: [10, 0],
          },
          {
            text: '12',
          },
          {
            text: 'Rp. 10,900,000,000.00',
          },
          {
            text: '12',
          },
          {
            text: 'Rp. 10,900,000,000.00',
          },
          {
            text: '12',
          },
          {
            text: 'Rp. 10,900,000,000.00',
          },
          {
            text: 'Rp. 10,900,000,000.00',
          },
        ]);
      }

      const docDef = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [17, 85, 17, 30],
        header: [
          {
            text: 'INSPEKTORAT KAB. ACEH BARAT DAYA',
            fontSize: 14,
            bold: true,
            margin: [17, 20, 0, 3],
          },
          {
            text: 'Rekapitulasi Temuan dan Tindaklanjut',
            fontSize: 13,
            margin: [17, 0, 0, 0],
          },
          {
            text:
              'Periode Pelaporan sd. ' + new Date().toLocaleDateString('id'),
            fontSize: 8,
            style: 'headerPeriod',
            margin: [0, 0, 17, 3],
          },
          {
            text: 'Tindaklanjut sd. ' + new Date().toLocaleDateString('id'),
            fontSize: 8,
            margin: [0, 0, 17, 7],
            style: 'headerPeriod',
          },
        ],

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
            style: 'tableExample',
            color: '#444',
            fontSize: 6,
            table: {
              widths: [400, 19, 70, 19, 70, 19, 70, 75],
              headerRows: 2,
              // keepWithHeaderRows: 1,
              body: [
                [
                  {
                    text: '',
                    style: 'tableHeader',
                    rowSpan: 2,
                    border: [false, true, false, true],
                  },
                  {
                    text: 'TEMUAN',
                    style: 'tableHeader',
                    colSpan: 2,
                    border: [false, true, false, false],
                  },
                  {},
                  {
                    text: 'REKOMENDASI',
                    style: 'tableHeader',
                    colSpan: 2,
                    border: [false, true, false, false],
                  },
                  {},
                  {
                    text: 'TINDAK LANJUT',
                    style: 'tableHeader',
                    colSpan: 2,
                    border: [false, true, false, false],
                  },
                  {},
                  {
                    text: 'SALDO',
                    style: 'tableHeader',
                    border: [false, true, false, false],
                  },
                ],
                [
                  {},
                  {
                    text: '#Kej.',
                    style: 'tableSubHeader',
                    border: [false, false, false, true],
                  },
                  {
                    text: 'Nilai Rp.',
                    style: 'tableSubHeader',
                    border: [false, false, false, true],
                  },
                  {
                    text: '#Kej.',
                    style: 'tableSubHeader',
                    border: [false, false, false, true],
                  },
                  {
                    text: 'Nilai Rp.',
                    style: 'tableSubHeader',
                    border: [false, false, false, true],
                  },
                  {
                    text: '#Kej.',
                    style: 'tableSubHeader',
                    border: [false, false, false, true],
                  },
                  {
                    text: 'Nilai Rp.',
                    style: 'tableSubHeader',
                    border: [false, false, false, true],
                  },
                  {
                    text: 'Nilai Rp.',
                    style: 'tableSubHeader',
                    border: [false, false, false, true],
                  },
                ],
                ...dataShow,
                // ...repDummy,
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === 2 ? 1.5 : 0.5;
              },
              vLineWidth: function (i, node) {
                return 0;
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return rowIndex % 3 === 0 && rowIndex > 1 ? '#eeeeee' : null;
              },
              // hLineColor: function (i, node) {
              //   return i === 0 || i === node.table.body.length
              //     ? 'black'
              //     : 'gray';
              // },
              // vLineColor: function (i, node) {
              //   return i === 0 || i === node.table.widths.length
              //     ? 'black'
              //     : 'gray';
              // },
              // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              // paddingLeft: function (i, node) {
              //   return 20;
              // },
              // paddingRight: function(i, node) { return 4; },
              paddingTop: function (i, node) {
                return 4;
              },
              paddingBottom: function (i, node) {
                return 4;
              },
              // fillColor: function (rowIndex, node, columnIndex) { return null; }
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
    },

    async loadReportLv1() {
      try {
        const response = await axios({
          method: 'GET',
          baseURL: API_URL,
          url: `/api/reportlv1`,
          params: {
            token: localStorage.getItem('api_token'),
          },
        });

        if (response.status == 200) {
          const responseData = await response.data;

          const repData = [];

          for (const key in responseData) {
            const data = {
              bidangObrik: responseData[key]['Bidang_Obrik'],
              jumlahTemuan: responseData[key]['Jumlah_Temuan'],
              totalNilaiTemuan: responseData[key]['Total_Nilai_Temuan'],
              jumlahRekomendasi: responseData[key]['Jumlah_Rekomendasi'],
              totalNilaiRekomendasi:
                responseData[key]['Total_Nilai_Rekomendasi'],
              jumlahTl: responseData[key]['Jumlah_Tindak_Lanjut'],
              totalNilaiTl: responseData[key]['Total_Nilai_Tindak_Lanjut'],
              totalSaldo: responseData[key]['Total_Saldo'],
            };
            repData.push(data);
          }

          this.report = repData;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>
