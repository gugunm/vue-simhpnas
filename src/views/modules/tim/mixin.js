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

    async loadTim(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_tim/loadTim', {
          forceRefresh: refresh,
          idLha: this.$route.query.idlha || this.lha.id,
        });
        this.items = this.$store.getters['module_tim/tim'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadPeran(refresh = false) {
      try {
        await this.$store.dispatch('m_ref_peran/loadRefPeran', {
          forceRefresh: refresh,
        });

        this.optionsPeran = this.$store.getters['m_ref_peran/refPeran'];  
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    async loadTimById(refresh = false) {
      try {
        await this.$store.dispatch('module_tim/loadTimById', {
          idTim: this.idTim,
          forceRefresh: refresh,
        });

        this.form = this.$store.getters['module_tim/timById'];  
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    async loadEditTimById(refresh = false) {
      try {
        await this.$store.dispatch('module_tim/loadTimById', {
          idTim: this.idTim,
          forceRefresh: refresh,
        });

        const data = this.$store.getters['module_tim/timById'];  

        this.form = {
          nip: data.nip,
          nama: data.nama,
          peran: data.kodePeran,
          accept: false,
        }

        this.editData = data
        
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