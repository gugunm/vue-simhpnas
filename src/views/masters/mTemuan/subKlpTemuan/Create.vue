<template>
  <div>
    <Form
      mode="create"
      :id-klp-temuan="idKlpTemuan"
      @click-submit-form="onSubmitForm"
    />
    <!-- :id-jenis-temuan="idJenisTemuan" -->
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
  props: ['idKlpTemuan', 'idJenisTemuan'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>