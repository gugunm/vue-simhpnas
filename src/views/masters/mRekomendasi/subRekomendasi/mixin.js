export default {
  methods: {
    createDataWithSelectedItem() {
      this.form.idSubKlpRekomendasi.val = this.selectedItem.id;
      this.form.descSubKlpRekomendasi.val = this.selectedItem.deskripsi;
    },

    // dipanggil di file edit.vue
    async loadSubKlpRekomendasiById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_rekomendasi/loadSubKlpRekomendasiById', {
          forceRefresh: refresh,
          idSubKlpRekomendasi: this.idSubKlpRekomendasi
        });

        this.item = this.$store.getters['m_rekomendasi/subKlpRekomendasiById'];

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    // called by create and edit files
    async onSubmitForm(payload) {
      this.loading = true;
      if (payload.mode == 'create' && payload.formIsValid) {
        try {
          const result = await this.$store.dispatch(
            'm_rekomendasi/createSubKlpRekomendasi',
            payload.data
          );

          if (result) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push(`/master-rekomendasi/${this.idKlpRekomendasi}`);
              this.toastSuccess('Berhasil menyimpan data');
            }, 500);
          }

        } catch (error) {
          this.error = error.message || 'Something went wrong!';
          this.toastError(this.error);
        }
      } else if (payload.mode == 'edit' && payload.formIsValid) {
        try {
          const result = await this.$store.dispatch(
            'm_rekomendasi/updateSubKlpRekomendasi',
            payload.data
          );

          if (result) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push(`/master-rekomendasi/${this.idKlpRekomendasi}`);
              this.toastSuccess('Berhasil merubah data');
            }, 500);
          }
        } catch (error) {
          this.error = error.message || 'Something went wrong!';
          this.toastError(this.error);
        }
      } else {
        this.toastError('Terdapat data belum valid');
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