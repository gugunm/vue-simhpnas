<template>
  <!-- form view -->
  <CForm>
    <CRow class="mb-2 view-form">
      <CCol
        v-for="(value, name) in selectedItem"
        :key="name"
        sm="12"
        md="6"
      >
        <CInput
          v-if="name != 'idx'"
          :label="cammelCaseToTitle(name)"
          class="mb-2 text-capitaliz"
          :value="value"
          :readonly="true"
        />
      </CCol>
    </CRow>
  </CForm>
</template>

<script>
export default {
  props: ['selectedItem'],
  methods: {
    cammelCaseToTitle(name) {
      const result = name.replace(/([A-Z])/g, ' $1');
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
  },
};
</script>