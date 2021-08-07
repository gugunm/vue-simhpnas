<template>
  <CButton
    color="primary"
    class="mb-3"
    @click="$router.go(-1)"
  >
    <font-awesome-icon
      class="mr-1"
      :icon="['fas', 'chevron-left']"
    /> {{ title }}
  </CButton>
</template>

<script>
export default {
  props: ['title'],
};
</script>