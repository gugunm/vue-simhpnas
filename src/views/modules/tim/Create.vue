<template>
  <div>
    <Form
      mode="create"
      :items="items"
      @on-load-tim="loadTim"
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
      items: '',
    };
  },
  async mounted() {
    this.loadTim();
  },
};
</script>