<template>
  <div>
    <p>{{ idUnitAudit }}</p>
    <Form
      v-if="item"
      mode="edit"
      :selected-item="item"
      @click-submit-form="onSubmitForm"
    />
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
  props: ['idUnitAudit'],
  data() {
    return {
      item: '',
      loading: false,
    };
  },
  async mounted() {
    await this.loadUnitAuditById();
  },
};
</script>
