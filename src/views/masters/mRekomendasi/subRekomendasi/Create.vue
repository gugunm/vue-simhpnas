<template>
  <div>
    <Form
      mode="create"
      :id-klp-rekomendasi="idKlpRekomendasi"
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
  props: ['idKlpRekomendasi'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>