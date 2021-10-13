export default {
  async mounted() {
    await this.loadGroupLingkupAudit();
    await this.loadJenisObrik();
    await this.loadUnitObrik();
    // await this.loadSearchKelurahan('cimarga')
  },

  methods: {
    async loadGroupLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch(
          'm_ref_lingkup_audit/loadRefGroupLingkupAudit', {
            forceRefresh: refresh,
          }
        );

        this.optionsGroupLingkupAudit =
          this.$store.getters['m_ref_lingkup_audit/refGroupLingkupAudit'];
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_lingkup_audit/loadRefLingkupAudit', {
          idGroupLingkupAudit: this.valueGroupLingkupAudit.id,
          forceRefresh: refresh,
        });
        this.optionsLingkupAudit = this.$store.getters['m_ref_lingkup_audit/refLingkupAudit'];       
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadJenisObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jenis_obrik/loadRefJenisObrik', {
          forceRefresh: refresh,
        });
        this.optionsJenisObrik = this.$store.getters['m_ref_jenis_obrik/refJenisObrik'];
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadUnitObrik(refresh = false) {
      this.loading = true;
      try {

        await this.$store.dispatch('m_ref_unit_obrik/loadRefUnitObrik', {
          forceRefresh: refresh,
        });

        this.optionsUnitObrik = this.$store.getters['m_ref_unit_obrik/refUnitObrik'];
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadBidangObrik(refresh = false) {
      this.loading = true;
      try {

        await this.$store.dispatch('m_ref_unit_obrik/loadRefBidangObrik', {
          idUnitObrik: this.valueUnitObrik.id,
          forceRefresh: refresh,
        });

        this.optionsBidangObrik = this.$store.getters['m_ref_unit_obrik/refBidangObrik'];
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadSubBidangObrik(refresh = false) {
      this.loading = true;
      try {

        await this.$store.dispatch('m_ref_unit_obrik/loadRefSubBidangObrik', {
          idBidangObrik: this.valueBidangObrik.id,
          forceRefresh: refresh,
        });

        this.optionsSubBidangObrik = this.$store.getters['m_ref_unit_obrik/refSubBidangObrik'];

        // console.log('HERE!!')
        // console.log(this.valueBidangObrik)
        // console.log(this.optionsSubBidangObrik)
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadSearchKelurahan(query, refresh = false) {
      this.loadingKelurahan = true
      try {

        await this.$store.dispatch('m_ref_wilayah/loadSearchKelurahan', {
          textSearch: query,
          forceRefresh: refresh,
        });

        this.optionsKelurahan = this.$store.getters['m_ref_wilayah/searchKelurahan'];

        this.loadingKelurahan = false
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    limitText (count) {
      return `and ${count} other countries`
    },

    // async asyncFindKelurahan (query) {
    //   this.loadingKelurahan = true
    //   await this.loadSearchKelurahan(query)
    //   this.loadingKelurahan = false
    // },

    clearAll () {
      this.selectedCountries = []
    }

  }
}