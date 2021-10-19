<template>
  <div>
    <Form mode="create" />
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