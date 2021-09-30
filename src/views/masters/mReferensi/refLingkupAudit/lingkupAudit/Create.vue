<template>
  <div>
    <Form
      mode="create"
      :id-group-lingkup-audit="idGroupLingkupAudit"
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
  props: ['idLingkupAudit', 'idGroupLingkupAudit'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>