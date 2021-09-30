export default {
  methods: {
    createDataWithSelectedItem() {
      this.form.idJenisTemuan.val = this.selectedItem.id;
      this.form.descJenisTemuan.val = this.selectedItem.deskripsi;
    },

    // dipanggil di file edit.vue
    async loadJenisTemuanById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadJenisTemuanById', {
          forceRefresh: refresh,
          idJenisTemuan: this.idJenisTemuan
        });

        this.item = this.$store.getters['m_temuan/jenisTemuanById'];

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
            'm_temuan/createJenisTemuan',
            payload.data
          );

          if (result) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-temuan/');
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
            'm_temuan/updateJenisTemuan',
            payload.data
          );

          if (result) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-temuan/');
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