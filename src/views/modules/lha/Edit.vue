<template>
  <Form
    mode="edit"
    :id-lha="idLha"
  />
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idLha'],
};
</script>