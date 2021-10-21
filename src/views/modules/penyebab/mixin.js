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

    async loadTemuan({id = null}, refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_temuan/loadTemuan', {
          forceRefresh: refresh,
          idLha: id,
        });

        this.optionsTemuan = this.$store.getters['module_temuan/temuan'];

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadKodePenyebab(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_penyebab/loadPenyebab', {
          forceRefresh: refresh,
        });
        this.optionsPenyebab = this.$store.getters['m_penyebab/penyebab'];

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadPenyebabById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_penyebab/loadPenyebabById', {
          idPenyebab: this.idPenyebab,
          forceRefresh: refresh,
        });

        this.form = this.$store.getters['module_penyebab/penyebabById'];

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadEditPenyebabById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_penyebab/loadPenyebabById', {
          idPenyebab: this.idPenyebab,
          forceRefresh: refresh,
        });

        const data = this.$store.getters['module_penyebab/penyebabById'];

        this.form = {
          nomorPenyebab: data.nomorPenyebab,
          kodePenyebab: data.refKodePenyebab,
          memoPenyebab: data.memoPenyebab,
          accept: false,
        }

        this.editData = data

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
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