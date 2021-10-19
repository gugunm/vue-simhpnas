export default {
  methods: {
    async loadLha(refresh = false) {
      try {
        await this.$store.dispatch('module_lha/loadLha', {
          forceRefresh: refresh,
        });

        this.optionsLha = this.$store.getters['module_lha/lha'];  
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    async loadJenisTemuan(refresh = false){
      try {
        await this.$store.dispatch('m_temuan/loadJenisTemuan', {
          forceRefresh: refresh,
        });
        this.optionsJenisTemuan = this.$store.getters['m_temuan/jenisTemuan'];
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    async loadKlpTemuan(refresh = false){
      try {
        await this.$store.dispatch('m_temuan/loadKelompokTemuan', {
          idJenisTemuan: this.valueJenisTemuan.id,
          forceRefresh: refresh,
        });

        this.optionsKlpTemuan = this.$store.getters['m_temuan/kelompokTemuan'];

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    async loadSubKlpTemuan(refresh = false){
      try {
        await this.$store.dispatch('m_temuan/loadSubKelompokTemuan', {
          idKlpTemuan: this.valueKlpTemuan.id,
          forceRefresh: refresh,
        });

        this.optionsSubKlpTemuan = this.$store.getters['m_temuan/subKelompokTemuan'];

        // console.log(this.optionsSubKlpTemuan)

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    async loadTemuanById(refresh = false) {
      try {
        await this.$store.dispatch('module_temuan/loadTemuanById', {
          idTemuan: this.idTemuan,
          forceRefresh: refresh,
        });

        this.form = this.$store.getters['module_temuan/temuanById'];  
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    toastSuccess(msg) {
      this.$toast.open({
        message: msg,
        type: 'success',
        position: 'top-right',
        duration: 3000,
      });
    },

    toastError(msg) {
      this.$toast.open({
        message: msg,
        type: 'error',
        position: 'top-right',
        duration: 5000,
      });
    },
  }
}