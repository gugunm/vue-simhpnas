export default {
  methods: {
    createDataWithSelectedItem() {
      this.form.idSubKlpTemuan.val = this.selectedItem.id;
      this.form.descSubKlpTemuan.val = this.selectedItem.deskripsi;
    },


    async loadSubKlpTemuanById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_temuan/loadSubKelompokTemuanById', {
          forceRefresh: refresh,
          idSubKlpTemuan: this.idSubKlpTemuan
        });
        
        this.item = this.$store.getters['m_temuan/subKelompokTemuanById'];

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },


    async onSubmitForm(payload) {
      this.loading = true;
      if (payload.mode == 'create' && payload.formIsValid) {
        try {
          const response = await this.$store.dispatch(
            'm_temuan/createSubKelompokTemuan',
            payload.data
          );

          if (response.status == 200 || response.status == 201) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push(`/master-sub-kelompok-temuan/${this.idKlpTemuan}`);
              this.toastSuccess('Berhasil menyimpan data');
            }, 500);
          }

        } catch (error) {
          this.error = error.message || 'Something went wrong!';
          this.toastError(this.error);
        }
      } else if (payload.mode == 'edit' && payload.formIsValid) {
        try {
          const response = await this.$store.dispatch(
            'm_temuan/updateSubKelompokTemuan',
            payload.data
          );

          if (response.status == 200) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push(`/master-sub-kelompok-temuan/${this.idKlpTemuan}`);
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