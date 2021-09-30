<template>
  <div>
    <Form
      v-if="item"
      mode="edit"
      :id-jenis-temuan="idJenisTemuan"
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
  props: ['idKlpTemuan', 'idJenisTemuan'],
  data() {
    return {
      item: '',
      loading: false,
    };
  },
  async mounted() {
    await this.loadKelompokTemuanById();
  },
};
</script>