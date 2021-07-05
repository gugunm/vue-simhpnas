<template>
  <CFooter :fixed="false">
    <div>
      <a href="http://www.bpkp.go.id/" target="_blank">BPKP</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} pdi - pusinfowas.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="http://www.bpkp.go.id/">PDI Pusinfowas - BPKP</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

