<template>
  <div>
    <Form
      mode="view"
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