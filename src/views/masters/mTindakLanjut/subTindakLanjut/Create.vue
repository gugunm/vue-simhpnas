<template>
  <div>
    <Form
      mode="create"
      :id-klp-tindak-lanjut="idKlpTindakLanjut"
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
  props: ['idKlpTindakLanjut'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>