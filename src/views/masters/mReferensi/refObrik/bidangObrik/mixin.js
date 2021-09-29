export default {
  methods: {
    createDataWithSelectedItem() {
      this.form.idBidangObrik.val = this.selectedItem.id;
      this.form.descBidangObrik.val = this.selectedItem.deskripsi;
    },


    async loadBidangObrikById(refresh = false) {
      this.loading = true;
      try {
        const bidangObrik = await this.$store.dispatch('m_ref_unit_obrik/loadRefBidangObrikById', {
          forceRefresh: refresh,
          idBidangObrik: this.idBidangObrik
        });
        
        if(bidangObrik){
          this.item = bidangObrik
        }

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
            'm_ref_unit_obrik/createBidangObrik',
            payload.data
          );

          if (response.status == 200 || response.status == 201) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push(`/master-referensi/obrik/bidang-obrik/${this.idUnitObrik}`);
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
            'm_ref_unit_obrik/updateBidangObrik',
            payload.data
          );

          if (response.status == 200) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push(`/master-referensi/obrik/bidang-obrik/${this.idUnitObrik}`);
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