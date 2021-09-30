<template>
  <div>
    <Form
      v-if="item"
      mode="edit"
      :id-unit-audit="idUnitAudit"
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
  props: ['idSubUnitAudit', 'idUnitAudit'],
  data() {
    return {
      item: '',
      loading: false,
    };
  },
  async mounted() {
    await this.loadRefSubUnitAuditById();
  },
};
</script>
