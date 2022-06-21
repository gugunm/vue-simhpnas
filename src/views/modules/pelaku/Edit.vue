<template>
  <div>
    <Form
      mode="edit"
      :id-pelaku="idPelaku"
    />
  </div>
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idPelaku'],
};
</script>