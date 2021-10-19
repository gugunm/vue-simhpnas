<template>
  <div>
    <Form mode="view" :id-rekomendasi="idRekomendasi" />
  </div>
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idRekomendasi'],
};
</script>