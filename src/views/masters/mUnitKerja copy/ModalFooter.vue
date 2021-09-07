<template>
  <div>
    <!-- class="px-5 btn-close-modal text-white" -->
    <CButton
      v-if="titleBtn1"
      variant="outline"
      color="dark"
      class="px-5 ml-2"
      @click="clickedBtn1"
    >
      {{ titleBtn1 }}
    </CButton>
    <!-- class="px-5 ml-2 btn-close-modal text-white" -->
    <CButton
      v-if="titleBtn2"
      color="info"
      class="px-5 ml-2"
      @click="clickedBtn2"
    >
      {{ titleBtn2 }}
    </CButton>
  </div>
</template>

<script>
export default {
  props: ['title-btn1', 'title-btn2'],
  emits: ['clicked-btn1', 'clicked-btn2'],
  methods: {
    clickedBtn1() {
      this.$emit('clicked-btn1');
    },
    clickedBtn2() {
      this.$emit('clicked-btn2');
    },
  },
};
</script>