<template>
  <div>
    <Form
      mode="create"
      :selected-item="item"
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
};
</script>