<template>
  <!-- color="primary" -->
  <div class="mb-3 bg-blue-500 rounded hover:bg-blue-600 w-24 flex justify-center items-center">
    <CButton
      class="text-white"
      @click="to ? $router.push(to) : $router.go(-1)"
    >
      <font-awesome-icon
        class="mr-1"
        :icon="['fas', 'chevron-left']"
      /> {{ title }}
    </CButton>
  </div>
</template>

<script>
export default {
  props: ['title', 'to'],
};
</script>