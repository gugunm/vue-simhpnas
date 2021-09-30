<template>
  <div>
    <Form
      mode="create"
      :id-jenis-temuan="idJenisTemuan"
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
  props: ['idJenisTemuan'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>