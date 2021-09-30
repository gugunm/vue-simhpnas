<template>
  <div>
    <Form
      v-if="item"
      mode="edit"
      :idgrplingkupaudit="idGroupLingkupAudit"
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
  props: ['idGroupLingkupAudit'],
  data() {
    return {
      item: '',
      loading: false,
    };
  },
  async mounted() {
    await this.loadRefGroupLingkupAuditById();
  },
};
</script>