<template>
  <CCol sm="12" lg="4">
    <CWidgetProgress :class="`bg-${cardColor}-500 text-white`">
      <div class="h4 m-0">
        {{ nilai || 0 }}
      </div>
      <div class="card-header-actions">
        <router-link
          :to="directLink"
          class="card-header-action position-absolute"
          style="right: 5px; top: 5px"
          rel="noreferrer noopener"
        >
          <small class="text-xs text-white">details</small>
        </router-link>
      </div>
      <p class="pt-2 pb-3">
        {{ title }}
      </p>
      <p class="text-xs">{{ totalCount || 0 }} {{ subTitle }}</p>
    </CWidgetProgress>
  </CCol>
</template>

<script>
export default {
  props: ["cardColor", "title", "subTitle", "nilai", "directLink", "totalCount"]
};
</script>

<style></style>
