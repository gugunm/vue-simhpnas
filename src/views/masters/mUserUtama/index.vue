<template>
  <div>
    <table-user
      top-title="User Utama"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
    />
  </div>
</template>

<script>
import TableUser from './TableUser.vue';
import mixin from './mixin';

export default {
  name: 'UserUtama',
  components: {
    TableUser,
  },
  mixins: [mixin],
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    await this.loadUserUtama();

    console.log('USER UTAMA!!');
    console.log(this.items);
  },
  methods: {
    async loadUserUtama() {
      try {
        await this.$store.dispatch('m_user_utama/loadUserUtama');

        this.items = this.$store.getters['m_user_utama/userUtama'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  },
};
</script>

<style>
</style>
