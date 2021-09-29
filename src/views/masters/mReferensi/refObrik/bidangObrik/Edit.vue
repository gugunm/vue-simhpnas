<template>
  <div>
    <Form
      v-if="item"
      mode="edit"
      :idunitobrik="idUnitObrik"
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
  props: ['idBidangObrik', 'idUnitObrik'],
  data() {
    return {
      item: '',
      loading: false,
    };
  },
  async mounted() {
    await this.loadBidangObrikById();
  },
};
</script>
