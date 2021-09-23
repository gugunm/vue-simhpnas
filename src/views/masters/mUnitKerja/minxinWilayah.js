export default {
  methods: {
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
  }
}