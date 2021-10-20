<template>
  <div>
    <Form mode="edit" :id-temuan="idTemuan" />
  </div>
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idTemuan'],
};
</script>