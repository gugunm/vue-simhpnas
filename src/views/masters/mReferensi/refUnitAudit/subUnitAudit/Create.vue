<template>
  <div>
    <Form
      mode="create"
      :id-unit-audit="idUnitAudit"
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
  props: ['idSubUnitAudit', 'idUnitAudit'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>