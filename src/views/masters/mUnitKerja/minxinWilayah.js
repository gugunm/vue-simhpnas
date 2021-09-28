export default {
  methods: {
    // === PROVINSI ===
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
    async loadProvinsiById(payload) {
      try {
        const provinsiById = await this.$store.dispatch('m_ref_wilayah/loadProvinsiById', {
          idProvinsi: payload,
          forceRefresh: false,
        })
        return provinsiById
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    // === KAB KOTA ===
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
    async loadKabkotById(payload) {
      try {
        const kabkotById = await this.$store.dispatch('m_ref_wilayah/loadKabkotById', {
          idKabkot: payload,
          forceRefresh: false,
        })
        return kabkotById
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    // === KECAMATAN ===
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
    async loadKecamatanById(payload) {
      try {
        const kecamatanById = await this.$store.dispatch('m_ref_wilayah/loadKecamatanById', {
          idKecamatan: payload,
          forceRefresh: false,
        })
        return kecamatanById
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    // === KELURAHAN ===
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
    async loadKelurahanById(payload) {
      try {
        const kelurahanById = await this.$store.dispatch('m_ref_wilayah/loadKelurahanById', {
          idKelurahan: payload,
          forceRefresh: false,
        })
        return kelurahanById
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  }
}