<template>
  <div>
    <Form
      mode="create"
      :selected-item="item"
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
      item: {},
    };
  },
  methods: {
    async onSubmitForm(payload) {
      console.log('Form Data :');
      console.log(payload);
      try {
        const response = await this.$store.dispatch(
          'm_unit_kerja/createUnitKerja',
          payload
        );

        if (response.statusText == 'OK') {
          console.log(response);
          this.$router.push('/master-unit-kerja');
        }
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  },
};
</script>