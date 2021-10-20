<template>
  <div>
    <Form mode="edit" :id-tim="idTim" />
  </div>
</template>

<script>
import Form from './Form.vue';
import mixin from './mixin';

export default {
  components: {
    Form,
  },
  mixins: [mixin],
  props: ['idTim'],
};
</script>