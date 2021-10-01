<template>
  <div>
    <Form
      v-if="item"
      mode="edit"
      :id-klp-temuan="idKlpTemuan"
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
  props: ['idSubKlpTemuan', 'idKlpTemuan', 'idJenisTemuan'],
  data() {
    return {
      item: '',
      loading: false,
    };
  },
  async mounted() {
    await this.loadSubKlpTemuanById();
  },
};
</script>