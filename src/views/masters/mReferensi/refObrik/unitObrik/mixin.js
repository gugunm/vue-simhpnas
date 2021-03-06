export default {
  methods: {
    createDataWithSelectedItem() {
      this.form.idUnitObrik.val = this.selectedItem.id;
      this.form.descUnitObrik.val = this.selectedItem.deskripsi;
    },

    // dipanggil di file edit.vue
    async loadUnitObrikById(refresh = false) {
      this.loading = true;
      try {
        this.item = await this.$store.dispatch('m_ref_unit_obrik/loadRefUnitObrikById', {
          forceRefresh: refresh,
          idUnitObrik: this.idUnitObrik
        });
        
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
          const response = await this.$store.dispatch(
            'm_ref_unit_obrik/createUnitObrik',
            payload.data
          );

          if (response.status == 200 || response.status == 201) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-referensi/obrik');
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
            'm_ref_unit_obrik/updateUnitObrik',
            payload.data
          );

          if (response.status == 200) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-referensi/obrik');
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