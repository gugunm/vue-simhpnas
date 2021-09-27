<template>
  <div>
    <Form
      v-if="item"
      :selected-item="item"
      mode="edit"
      @click-submit-form="onSubmitForm"
    />
  </div>
</template>

<script>
import mixin from './mixin';

import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  mixins: [mixin],
  props: ['idUnitKerja'],
  data() {
    return {
      item: '',
      loading: false,
    };
  },
  mounted() {
    this.loadUnitKerjaById();
  },
  methods: {
    async onSubmitForm(payload) {
      // console.log('ENTER EDIT FORM');
      this.loading = true;
      if (payload.mode == 'edit') {
        try {
          const response = await this.$store.dispatch(
            'm_unit_kerja/updateUnitKerja',
            payload.data
          );

          if (response.status == 200) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push('/master-unit-kerja');
              this.toastSuccess('Berhasil merubah data');
            }, 1000);
          }
        } catch (error) {
          this.error = error.message || 'Something went wrong!';
          this.toastError(this.error);
        }
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