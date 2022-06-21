<template>
  <div>
    <Form
      mode="edit"
      :id-tl="idTindakLanjut"
    />
  </div>
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idTindakLanjut'],
};
</script>