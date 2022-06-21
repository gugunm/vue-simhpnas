<template>
  <CFooter :fixed="false">
    <div class="text-gray-600">
      <a
        href="http://www.bpkp.go.id/"
        target="_blank"
      >BPKP</a>
      <span
        class="ml-1"
      >&copy; {{ new Date().getFullYear() }} Pusinfowas.</span>
    </div>
    <div class="ml-auto text-gray-600">
      <span
        class="mr-1"
        target="_blank"
      >Powered by</span>
      <a href="http://www.bpkp.go.id/">Pusinfowas - BPKP</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter"
};
</script>
