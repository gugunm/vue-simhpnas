export default {
  methods: {
    createDataWithSelectedItem() {
      this.form.idJenisAnggaran.val = this.selectedItem.id;
      this.form.descJenisAnggaran.val = this.selectedItem.deskripsi;
    },

    // dipanggil di file edit.vue
    async loadRefJenisAnggaranById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jenis_anggaran/loadRefJenisAnggaranById', {
          forceRefresh: refresh,
          idJenisAnggaran: this.idJenisAnggaran
        });

        this.item = this.$store.getters['m_ref_jenis_anggaran/refJenisAnggaranById'];

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
          console.log(payload.data)
          const result = await this.$store.dispatch(
            'm_ref_jenis_anggaran/createRefJenisAnggaran',
            payload.data
          );

          if (result) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-referensi/jenis-anggaran');
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
            'm_ref_jenis_anggaran/updateRefJenisAnggaran',
            payload.data
          );

          if (result) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-referensi/jenis-anggaran');
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