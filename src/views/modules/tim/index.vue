<template>
  <div>
    <table-tim
      top-title="Tim Audit"
      :items="items"
      :fields="fields"
      :clickable-rows="true"
      :is-edit-button="true"
      :id-lha="idLha"
      @clicked-row="openDetail"
      @open-create-modal="openCreate"
      @open-edit-modal="openEdit"
      @open-delete-modal="openDeleteModal"
      @on-select-lha="onSelectLha"
    />
    <confirm-modal
      v-model="isDeleteConfirm"
      title="Hapus data"
      msg="Apakah anda yakin akan menghapus data ini?"
      @close-modal="isDeleteConfirm = false"
      @confirm-ok="actionDelete"
    />
  </div>
</template>

<script>
import TableTim from './TableTim.vue';
import mixin from './mixin';
import ConfirmModal from '@/components/Confirm/ConfirmModal.vue';

const fields = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'nomorLha',
    label: 'Nomor LHA',
  },
  // {
  //   key: 'nomorUrut',
  // },
  {
    key: 'nama',
  },
  {
    key: 'nip',
  },
  {
    key: 'kodePeran',
  },
  {
    key: 'peran',
  },
  // {
  //   key: 'unitAudit',
  // },
  // {
  //   key: 'subUnitAudit',
  // },
];

export default {
  name: 'TimAudit',
  components: {
    TableTim,
    ConfirmModal,
  },
  mixins: [mixin],
  data() {
    return {
      items: '',
      fields,
      isDeleteConfirm: false,
      idToDelete: null,
      lha: {},
      // idLha: '',
    };
  },
  async mounted() {
    // if (this.$route.query.idlha) {
    //   this.idLha = this.$route.query.idlha;
    // }
    // await this.loadLha();
  },
  methods: {
    openDetail(item) {
      this.$router.push({
        name: 'module-detail-tim',
        params: { idTim: item.id },
      });
    },
    openCreate() {
      this.$router.push({
        name: 'module-create-tim',
        query: { idlha: this.lha.id, nolha: this.lha.nomorLha },
      });
    },
    openEdit(item) {
      this.$router.push({
        name: 'module-edit-tim',
        params: { idTim: item.id },
      });
    },
    openDeleteModal(id) {
      this.isDeleteConfirm = true;
      this.idToDelete = id;
    },
    async onSelectLha(selectedLha) {
      this.lha = selectedLha;
      await this.loadTim();
    },
    async actionDelete() {
      try {
        await this.$store.dispatch('module_lha/deleteTimById', {
          idLha: this.idToDelete,
        });
        this.isDeleteConfirm = false;

        this.loadTim();

        toastSuccess(`Berhasil menghapus data dengan ID ${this.idToDelete}`);
      } catch (error) {
        toastError(error.message);
      }
    },
    async loadTim(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('module_tim/loadTim', {
          forceRefresh: refresh,
          idLha: this.lha.id,
        });
        this.items = this.$store.getters['module_tim/tim'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },
  },
};
</script>