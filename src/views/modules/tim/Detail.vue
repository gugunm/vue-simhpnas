<template>
  <div>
    <Form
      mode="view"
      :id-tim="idTim"
    />
  </div>
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idTim'],
};
</script>