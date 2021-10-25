<template>
  <div>
    <CButton @click="downloadPDF"> Generate PDF </CButton>
    <h1 id="reportpdf" style="height: 100px; width: 1000px">Judul Laporan</h1>
  </div>
</template>

<script>
// import jsPDF from 'jspdf';
import html2PDF from 'jspdf-html2canvas';

export default {
  props: ['data'],
  methods: {
    downloadPDF() {
      // const doc = new jsPDF();

      // doc.text(this.$func.convertToRupiah(this.data.NilaiTL), 10, 10);
      // doc.html(document.getElementById('reportpdf'));
      // doc.save('sample-simhpnas.pdf');
      let page = document.getElementById('reportpdf');

      html2PDF(page, {
        jsPDF: {
          format: 'a4',
        },
        output: 'generate.pdf',
      });
    },
  },
};
</script>

<style>
</style>