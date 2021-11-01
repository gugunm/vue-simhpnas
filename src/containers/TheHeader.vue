<template>
  <CHeader with-subheader class="shadow-sm">
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('ui/toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('ui/toggleSidebarDesktop')"
    >
      <slot>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </slot>
    </CToggler>
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <!-- <CIcon name="logo" height="48" alt="Logo"/> -->
      <CImg
        class="sidebar-logo g-logo-expand h-10"
        name="logo-expand"
        src="img/simhp/logo2.svg"
      />
    </CHeaderBrand>

    <CMenu />

    <CHeaderNav>
      <!-- <CHeaderNavItem class="px-3"> -->
      <!-- <CSelect
          class="mt-3"
          :options="langs"
          :value="locale"
          @update:value="selectLocale"
        /> -->
      <!-- </CHeaderNavItem> -->
      <!-- <CHeaderNavItem>
        <button
          class="c-header-nav-btn"
          @click="() => $store.commit('ui/toggle', 'darkMode')"
        >
          <CIcon v-if="$store.state.ui.darkMode" name="cil-sun" />
          <CIcon v-else name="cil-moon" />
        </button>
      </CHeaderNavItem> -->
      <!-- <TheHeaderDropdownNotif class="mr-3" /> -->
      <div class="mr-2">
        <p class="capitalize pr-3 font-bold border-r border-gray-400">
          {{ namaUser }}
        </p>
      </div>
      <!-- <TheHeaderDropdownTasks /> -->
      <!-- <TheHeaderDropdownMssgs/> -->
      <TheHeaderDropdownAccnt class="pr-4" />
      <!-- <CHeaderNavItem class="px-3">
        <button
          in-header
          class="c-header-nav-btn"
          @click="$store.commit('toggle', 'asideShow')"
        >
          <CIcon size="lg" name="cil-applications-settings" class="mr-2"/>
        </button>
      </CHeaderNavItem> -->
    </CHeaderNav>

    <!-- <CSubheader class="px-3 bg-body-primary border-t-0">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader> -->
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt';
// import TheHeaderDropdownNotif from './TheHeaderDropdownNotif';
// import TheHeaderDropdownTasks from './TheHeaderDropdownTasks';
// import TheHeaderDropdownMssgs from './TheHeaderDropdownMssgs'
import CMenu from './Menu';
import axios from 'axios';

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt,
    // TheHeaderDropdownNotif,
    // TheHeaderDropdownTasks,
    // TheHeaderDropdownMssgs,
    CMenu,
  },
  data: function () {
    return {
      langs: [],
      locale: 'en',
      namaUser: '',
    };
  },
  mounted() {
    this.namaUser = localStorage.getItem('name');
    let self = this;
    if (typeof localStorage.locale !== 'undefined') {
      this.locale = localStorage.getItem('locale');
    }
    axios
      .get(
        this.$apiAdress +
          '/api/langlist?token=' +
          localStorage.getItem('api_token')
      )
      .then(function (response) {
        self.langs = [];
        for (let i = 0; i < response.data.length; i++) {
          self.langs.push({
            value: response.data[i].short_name,
            label: response.data[i].name,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
  },
};
</script>