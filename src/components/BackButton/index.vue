<template>
  <div>
    <CButton
      color="info"
      class="text-white"
      @click="to ? $router.push(to) : $router.go(-1)"
    >
      <div class="flex items-center justify-center w-20">
        <span class="mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        {{ title }}
      </div>
    </CButton>
  </div>
</template>

<script>
export default {
  props: ['title', 'to'],
};
</script>