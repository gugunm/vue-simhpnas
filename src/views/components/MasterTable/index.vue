<template>
  <div>
    <CRow class="px-3">
      <CCol
        class="px-0"
        lg="8"
        sm="12"
      >
        <h4 class="my-0 mt-1 mb-3">
          {{ topTitle }} {{ title }} {{ descTitle }}
        </h4>
      </CCol>
      <CCol
        class="px-0 text-right"
        lg="4"
        sm="12"
      >
        <CButton
          color="info"
          class="mb-3"
          @click="openCreateModal"
        >
          <CIcon
            name="cil-plus"
            size="lg"
            class="my-0 mb-1 mr-2"
          />Tambah {{ title }}
        </CButton>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
        <CDataTable
          :items="items"
          :fields="fields"
          hover
          column-filter
          sorter
          table-filter
          items-per-page-select
          :items-per-page="5"
          pagination
        >
          <!-- :clickable-rows="clickableRows"
          @row-clicked="clickedRow" -->
          <template #id="{item}">
            <td
              v-if="clickableRows"
              class="text-primary"
              style="cursor:pointer;"
              @click="clickedRow(item)"
            >
              {{ item.id }}
            </td>
            <td v-else>
              {{ item.id }}
            </td>
          </template>
          <!-- <template #actions> -->
          <template #actions="{item}">
            <td class="py-2 d-flex justify-content-center">
              <CButton
                color="warning"
                variant="outline"
                square
                size="sm"
                class="mr-3"
                @click="openEditModal(item)"
              >
                <font-awesome-icon :icon="['fas', 'pen']" />
              </CButton>
              <!-- <CIcon name="cil-pencil" /> -->
              <CButton
                color="danger"
                variant="outline"
                square
                size="sm"
                @click="openDeleteModal(item.id)"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']" />
                <!-- <CIcon name="cil-trash" /> -->
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'MasterTable',
  props: ['topTitle', 'title', 'descTitle', 'items', 'fields', 'clickableRows'],
  emits: [
    'clicked-row',
    'open-create-modal',
    'open-edit-modal',
    'open-delete-modal',
  ],
  methods: {
    clickedRow(item) {
      this.$emit('clicked-row', item);
    },
    openCreateModal() {
      this.$emit('open-create-modal');
    },
    openEditModal(item) {
      this.$emit('open-edit-modal', item);
    },
    openDeleteModal(id) {
      this.$emit('open-delete-modal', id);
    },
  },
};
</script>