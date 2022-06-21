<template>
  <div>
    <Form
      mode="create"
      @click-submit-form="onSubmitForm"
    />
  </div>
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  data() {
    return {
      // item: {},
      loading: false,
    };
  },
  methods: {
    async onSubmitForm(payload) {
      this.loading = true;
      if (payload.mode == 'create' && payload.formIsValid) {
        try {
          const response = await this.$store.dispatch(
            'm_unit_kerja/createUnitKerja',
            payload.data
          );

          if (response.status == 200 || response.status == 201) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-unit-kerja');
              this.toastSuccess('Berhasil menyimpan data');
            }, 1000);
          }
        } catch (error) {
          this.error = error.message || 'Something went wrong!';
          this.toastError(this.error);
        }
      } else if (payload.formIsValid == false) {
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
  },
};
</script>