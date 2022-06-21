<template>
  <div>
    <Form
      mode="view"
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