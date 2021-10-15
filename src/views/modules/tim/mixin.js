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