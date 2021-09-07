<template>
  <CModal
    v-if="mode"
    :title="modalTitle"
    :show="isShowModal"
    size="lg"
    add-content-classes="modal-master-detail"
    :close-on-backdrop="mode === 'view'"
    @update:show="toggleModal(isShowModal)"
  >
    <CCardBody>
      <!-- view form -->
      <view-form
        v-if="mode == 'view'"
        :selected-item="selectedItem"
      />
      <!-- form create and edit-->
      <create-edit-form
        v-else-if="mode === 'create' || mode === 'edit'"
        :selected-item="selectedItem"
        :mode="mode"
      />
    </CCardBody>
    <template #footer-wrapper>
      <div v-if="mode == 'view'" />
    </template>
    <template #footer>
      <modal-footer
        v-if="mode == 'edit'"
        title-btn1="Cancel"
        title-btn2="Submit Edit"
        @clicked-btn1="toggleModal(isShowModal)"
      />
      <modal-footer
        v-if="mode == 'create'"
        title-btn1="Cancel"
        title-btn2="Submit"
        @clicked-btn1="toggleModal(isShowModal)"
      />
    </template>
  </CModal>
</template>

<script>
import ViewForm from './ViewForm.vue';
import CreateEditForm from './CreateEditForm.vue';
import ModalFooter from './ModalFooter.vue';

export default {
  name: 'FormUnitKerja',
  components: {
    ViewForm,
    CreateEditForm,
    ModalFooter,
  },
  emits: ['toggle-modal'],
  props: ['mode', 'modalTitle', 'selectedItem', 'isShowModal'],
  methods: {
    toggleModal(value) {
      this.$emit('toggle-modal', value);
    },
  },
};
</script>
