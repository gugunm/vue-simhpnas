export default {
  methods: {
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

    async loadUnitKerjaById(refresh = false) {
      this.loading = true;
      try {
        const uk = await this.$store.dispatch('m_unit_kerja/loadUnitKerjaById', {
          forceRefresh: refresh,
          idUnitKerja: this.idUnitKerja
        });

        if(uk){
          this.item = uk
        }
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadItemsComponent({
      refresh = null, 
      self = null,
      params = {},
      storeAction = '', 
      storeGetter = ''
    }) {
        self.loading = true;
        try {
          if (params) {
            await self.$store.dispatch(storeAction, {
              ...params,
              forceRefresh: refresh,
            });
          } else {
            await self.$store.dispatch(storeAction, {
              forceRefresh: refresh,
            });
          }
          self.items = self.$store.getters[storeGetter]; 
        } catch (error) {
          self.error = error.message || 'Something went wrong!';
        }
        self.loading = false;
      }
  }
}