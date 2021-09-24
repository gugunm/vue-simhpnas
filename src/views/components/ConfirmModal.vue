<template>
  <div>
    <CModal
      title="Modal title"
      color="warning"
      :show.sync="value"
      :backdrop="false"
      :centered="false"
      :close-on-backdrop="true"
    >
      <template #header-wrapper>
        <div />
      </template>

      <template #body-wrapper>
        <div class="flex flex-col">
          <div class="flex flex-row p-4">
            <!-- <span>ICON WARNING</span> -->
            <div>
              <p class="text-lg font-semibold mb-2">
                Meninggalkan halaman
              </p>
              <p>Meniggalkan halaman tanpa melakukan submit data akan menghilangkan data yang telah diinput.</p>
            </div>
          </div>
          <div
            class="flex justify-end px-4 py-3"
            style="background: #F9FAFB"
          >
            <CButton
              class="mr-2"
              color="dark"
              variant="outline"
              @click="confirmOk"
            >
              Oke
            </CButton>
            <CButton
              color="info"
              class=""
              @click="confirmCancel"
            >
              Cancel
            </CButton>
          </div>
        </div>
      </template>

      <template #footer-wrapper>
        <div />
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  props: ['value'],
  emits: ['close-modal', 'confirm-ok'],
  data() {
    return {};
  },
  computed: {},
  watch: {
    value(val) {
      if (val == false) {
        this.confirmCancel();
      }
    },
  },
  methods: {
    confirmCancel() {
      this.$emit('close-modal', false);
    },
    confirmOk() {
      this.$emit('confirm-ok');
    },
  },
};
</script>

<style scoped>
.c_modal_header .modal-warning .modal-header {
  background-color: blueviolet;
}
</style>