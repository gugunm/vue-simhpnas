<template>
  <div>
    <Form
      mode="create"
      :idunitobrik="idUnitObrik"
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
  props: ['idUnitObrik'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>