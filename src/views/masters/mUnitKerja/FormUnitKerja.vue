<template>
  <CCardBody>
    <!-- form view -->
    <CForm v-if="mode == 'view'">
      <CRow class="mb-2 view-form">
        <CCol
          v-for="(value, name) in selectedItem"
          :key="name"
          sm="12"
          md="6"
        >
          <CInput
            v-if="name != 'idx'"
            :label="cammelCaseToTitle(name)"
            class="mb-2 text-capitaliz"
            :value="value"
            placeholder="coba responsive"
            :readonly="true"
          />
        </CCol>
      </CRow>
    </CForm>
    <!-- form create and edit-->
    <CForm v-else-if="mode == 'create' || 'edit'">
      <!-- ROW 1 -->
      <CRow class="mb-2 view-form">
        <CCol
          sm="12"
          md="6"
        >
          <CInput
            v-model="item.id"
            :readonly="mode == 'edit'"
            label="ID Unit Kerja"
            class="mb-2"
            placeholder="ID Unit Kerja"
          />
        </CCol>
        <CCol
          sm="12"
          md="6"
        >
          <CInput
            v-model="item.namaUnit"
            label="Nama Unit Kerja"
            class="mb-2"
            placeholder="Unit XXXX"
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
            v-model="item.namaPimpinan"
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
            v-model="item.nipPimpinan"
            label="NIP Pimpinan"
            class="mb-2"
            placeholder="19750101 XXXXXX X XXX"
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
            v-model="item.alamat"
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
          <!-- <p>{{ optionsProvinsi }}</p> -->
          <v-select
            v-model="selectedProvinsi"
            :options="optionsProvinsi"
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
          <CInput
            v-model="item.kabkot"
            label="Kab/Kota"
            class="mb-2"
            placeholder="Kota Jakarta Timur"
          />
        </CCol>
        <CCol
          sm="12"
          md="6"
        >
          <CInput
            v-model="item.kecamatan"
            label="Kecamatan"
            class="mb-2"
            placeholder="Matraman"
          />
        </CCol>
      </CRow>
      <!-- ROW 5 -->
      <CRow class="mb-2 view-form">
        <CCol
          sm="12"
          md="6"
        >
          <CInput
            v-model="item.kelurahan"
            label="Kelurahan"
            class="mb-2"
            placeholder="Utan Kayu Utara"
          />
        </CCol>
        <CCol
          sm="12"
          md="6"
        >
          <CInput
            v-model="item.jumlahObrik"
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
            v-model="item.jumlahObrikBersih"
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
            v-model="item.telpon"
            label="Telpon"
            class="mb-2"
            placeholder="6281234567890"
          />
        </CCol>
      </CRow>
    </CForm>
  </CCardBody>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'FormUnitKerja',
  components: {
    vSelect,
  },
  props: ['mode', 'selectedItem', 'isShowModal', 'optionsProvinsi'],
  data() {
    return {
      item:
        this.mode == 'edit' || 'view'
          ? { ...this.selectedItem }
          : { ...this.emptyItem },
      emptyItem: {
        id: '',
        namaUnit: '',
        namaPimpinan: '',
        nipPimpinan: '',
        alamat: '',
        provinsi: '',
        kabkot: '',
        kecamatan: '',
        kelurahan: '',
        jumlahObrik: '',
        jumlahObrikBersih: '',
        telpon: '',
      },
      selectedProvinsi: this.selectedItem ? this.selectedItem.provinsi : '',
    };
  },
  watch: {
    selectedProvinsi: function (newValue, oldValue) {
      if (newValue) {
        this.item.provinsi = newValue.id;
        this.item.kabkot = '';
        this.item.kecamatan = '';
        this.item.kelurahan = '';
      }
    },
    isShowModal: function (newValue, oldValue) {
      if (newValue === false) {
        this.item = this.emptyItem;
        this.selectedProvinsi = '';
      }
    },
  },
  methods: {
    cammelCaseToTitle(name) {
      const result = name.replace(/([A-Z])/g, ' $1');
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
  },
};
</script>
