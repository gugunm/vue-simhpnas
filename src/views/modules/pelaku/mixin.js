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

    async loadRekomendasi({id = null}, refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_rekomendasi/loadRekomendasi', {
          forceRefresh: refresh,
          idTemuan: id,
        });
        this.optionsRekomendasi = this.$store.getters['module_rekomendasi/rekomendasi'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },


    async loadJabatan(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jabatan/loadRefJabatan', {
          forceRefresh: refresh,
        });
        this.optionsJabatan = this.$store.getters['m_ref_jabatan/refJabatan'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadPelakuById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_pelaku/loadPelakuById', {
          idPelaku: this.idPelaku,
          forceRefresh: refresh,
        });
        
        this.form = this.$store.getters['module_pelaku/pelakuById'];
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