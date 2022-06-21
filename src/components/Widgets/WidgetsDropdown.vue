<template>
  <!-- <CRow>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="gradient-primary"
        header="9.823"
        :text="$i18n.translate('dashboard.members_online')"
      >
        <template #default>
          <CDropdown
            class="float-right"
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>{{ $t('dashboard.action') }}</CDropdownItem>
            <CDropdownItem>{{ $t('dashboard.another_action') }}</CDropdownItem>
            <CDropdownItem>
              {{ $t('dashboard.something_else_here') }}
            </CDropdownItem>
            <CDropdownItem disabled>
              {{ $t('dashboard.disabled_action') }}
            </CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="px-3"
            style="height: 70px"
            :data-points="[65, 59, 84, 84, 51, 55, 40]"
            point-hover-background-color="primary"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="gradient-info"
        header="9.823"
        :text="$i18n.translate('dashboard.members_online')"
      >
        <template #default>
          <CDropdown
            class="float-right"
            color="transparent p-0"
            placement="bottom-end"
            :caret="false"
          >
            <template #toggler-content>
              <CIcon name="cil-location-pin" />
            </template>
            <CDropdownItem>{{ $t('dashboard.action') }}</CDropdownItem>
            <CDropdownItem>{{ $t('dashboard.another_action') }}</CDropdownItem>
            <CDropdownItem>
              {{ $t('dashboard.something_else_here') }}
            </CDropdownItem>
            <CDropdownItem disabled>
              {{ $t('dashboard.disabled_action') }}
            </CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="px-3"
            style="height: 70px"
            :data-points="[1, 18, 9, 17, 34, 22, 11]"
            point-hover-background-color="info"
            :options="{ elements: { line: { tension: 0.00001 } } }"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="gradient-warning"
        header="9.823"
        :text="$i18n.translate('dashboard.members_online')"
      >
        <template #default>
          <CDropdown
            class="float-right"
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>{{ $t('dashboard.action') }}</CDropdownItem>
            <CDropdownItem>{{ $t('dashboard.another_action') }}</CDropdownItem>
            <CDropdownItem>
              {{ $t('dashboard.something_else_here') }}
            </CDropdownItem>
            <CDropdownItem disabled>
              {{ $t('dashboard.disabled_action') }}
            </CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            style="height: 70px"
            background-color="rgba(255,255,255,.2)"
            :data-points="[78, 81, 80, 45, 34, 12, 40]"
            :options="{ elements: { line: { borderWidth: 2.5 } } }"
            point-hover-background-color="warning"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="gradient-danger"
        header="9.823"
        :text="$i18n.translate('dashboard.members_online')"
      >
        <template #default>
          <CDropdown
            class="float-right"
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>{{ $t('dashboard.action') }}</CDropdownItem>
            <CDropdownItem>{{ $t('dashboard.another_action') }}</CDropdownItem>
            <CDropdownItem>
              {{ $t('dashboard.something_else_here') }}
            </CDropdownItem>
            <CDropdownItem disabled>
              {{ $t('dashboard.disabled_action') }}
            </CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            style="height: 70px"
            background-color="rgb(250, 152, 152)"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow> -->
  
  <div>
    <CRow>
      <WidgetsDropdownItem
        card-color="green"
        title="Total LHA"
        sub-title="Obrik"
        :nilai="data.TotalLHA"
        direct-link="/lha"
        :total-count="data.TotalObrik"
      />
      <WidgetsDropdownItem
        card-color="yellow"
        title="Total Temuan"
        sub-title="Temuan"
        :nilai="$func.convertToRupiah(data.NilaiTemuan)"
        direct-link="/temuan"
        :total-count="data.JumlahTemuan"
      />
      <WidgetsDropdownItem
        card-color="blue"
        title="Total TL"
        sub-title="Tindak Lanjut"
        :nilai="$func.convertToRupiah(data.NilaiTL)"
        direct-link="/tindak-lanjut"
        :total-count="data.JumlahTL"
      />
    </CRow>
  </div>
</template>

<script>
import WidgetsDropdownItem from '@/components/Widgets/WidgetsDropdownItem.vue';

export default {
  name: 'TopDashboard',
  components: {
    WidgetsDropdownItem,
  },
  props: ['data'],
};
</script>


