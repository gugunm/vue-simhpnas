<template>
  <Form mode="view" :id-lha="idLha" />
</template>

<script>
import Form from './FormDetail.vue';

export default {
  components: {
    Form,
  },
  props: ['idLha'],
};
</script>