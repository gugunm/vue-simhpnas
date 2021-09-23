<template>
  <div>
    <Form
      v-if="item"
      :selected-item="item"
      mode="edit"
    />
  </div>
</template>

<script>
import mixin from './mixin';

import Form from './Form.vue';

export default {
  components: {
    Form,
  },
  mixins: [mixin],
  props: ['idUnitKerja'],
  data() {
    return {
      item: '',
    };
  },
  mounted() {
    this.loadUnitKerjaById();
  },
};
</script>