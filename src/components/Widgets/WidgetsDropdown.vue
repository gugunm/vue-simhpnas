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
      <CCol sm="12" lg="4">
        <CWidgetProgress class="bg-green-500">
          <div class="h4 m-0">
            {{ data.TotalLHA }}
          </div>
          <div class="card-header-actions">
            <router-link
              to="/lha"
              class="card-header-action position-absolute"
              style="right: 5px; top: 5px"
              rel="noreferrer noopener"
            >
              <small class="text-xs text-white">details</small>
            </router-link>
          </div>
          <p class="pt-2 pb-3">Total LHA</p>
          <p class="text-xs">{{ data.TotalObrik }} Obrik</p>
        </CWidgetProgress>
      </CCol>
      <CCol sm="12" lg="4">
        <CWidgetProgress class="bg-blue-500">
          <div class="h4 m-0">
            {{ convertToRupiah(data.NilaiTemuan) }}
          </div>
          <div class="card-header-actions">
            <router-link
              to="/temuan"
              class="card-header-action position-absolute"
              style="right: 5px; top: 5px"
              rel="noreferrer noopener"
            >
              <small class="text-xs text-white">details</small>
            </router-link>
          </div>
          <p class="pt-2 pb-3">Nilai Temuan</p>
          <p class="text-xs">{{ data.JumlahTemuan }} Temuan</p>
        </CWidgetProgress>
      </CCol>
      <CCol sm="12" lg="4">
        <CWidgetProgress class="bg-yellow-500">
          <div class="h4 m-0">
            {{ convertToRupiah(data.NilaiTL) }}
          </div>
          <div class="card-header-actions">
            <router-link
              to="/tindak-lanjut"
              class="card-header-action position-absolute"
              style="right: 5px; top: 5px"
              rel="noreferrer noopener"
            >
              <small class="text-xs text-white">details</small>
            </router-link>
          </div>
          <p class="pt-2 pb-3">Nilai Tindak Lanjut</p>
          <p class="text-xs">{{ data.JumlahTL }} Tindak Lanjut</p>
        </CWidgetProgress>
      </CCol>
      <!-- <CCol sm="6" lg="3">
        <CWidgetProgress
          header="2 TB"
          text="Lorem ipsum..."
          footer="Lorem ipsum dolor sit amet enim."
          color="gradient-danger"
          :value="25"
        />
      </CCol> -->
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'TopDashboard',
  props: ['data'],
  methods: {
    convertToRupiah(payload) {
      let rupiah = '';
      if (payload) {
        const angkarev = payload.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++)
          if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ',';
        return (
          'Rp ' +
          rupiah
            .split('', rupiah.length - 1)
            .reverse()
            .join('')
        );
      }
      return 'Rp 0';
    },
  },
};
</script>


