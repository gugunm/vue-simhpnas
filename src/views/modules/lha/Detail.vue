<template>
  <!-- <p>Page Detail LHA {{ idLha }}</p> -->
  <Form mode="view" />
</template>

<script>
import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  props: ['idLha'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>