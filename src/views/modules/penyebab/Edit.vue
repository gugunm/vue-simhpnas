<template>
  <div>
    <Form
      mode="edit"
      :id-penyebab="idPenyebab"
    />
  </div>
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idPenyebab'],
};
</script>