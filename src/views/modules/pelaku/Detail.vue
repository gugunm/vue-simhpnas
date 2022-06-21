<template>
  <div>
    <Form
      mode="view"
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