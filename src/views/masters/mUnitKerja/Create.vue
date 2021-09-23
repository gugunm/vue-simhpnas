<template>
  <div>
    <Form
      mode="create"
      :selected-item="item"
      @click-submit-form="onSubmitForm"
    />
    <!-- {{ $toast.open('Howdy!') }} -->
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
      item: {},
      loading: false,
    };
  },
  methods: {
    async onSubmitForm(payload) {
      this.loading = true;
      if (payload.mode == 'create') {
        try {
          const response = await this.$store.dispatch(
            'm_unit_kerja/createUnitKerja',
            payload.data
          );

          if (response.statusText == 'OK') {
            // console.log(response);
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-unit-kerja');
              this.toastSuccess();
            }, 1000);
          }
        } catch (error) {
          this.error = error.message || 'Something went wrong!';
        }
      }
    },
    toastSuccess() {
      this.$toast.open({
        message: 'Data berhasil disimpan',
        type: 'success',
        position: 'top-right',
        duration: 3000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>