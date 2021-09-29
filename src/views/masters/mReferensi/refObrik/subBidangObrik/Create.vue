<template>
  <div>
    <Form
      mode="create"
      :idbidangobrik="idBidangObrik"
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
  props: ['idBidangObrik'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>