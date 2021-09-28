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
import mixin from './mixin';

export default {
  components: {
    Form,
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style>
</style>