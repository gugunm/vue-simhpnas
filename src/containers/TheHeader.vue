<template>
  <div>
    <CHeader with-subheader class="h-20  d-lg-none">
      <CToggler
        in-header
        class="ml-3"
        @click="$store.commit('ui/toggleSidebarMobile')"
      />
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <!-- <CIcon name="logo" height="48" alt="Logo" /> -->
        <CImg
          class="sidebar-logo g-logo-expand h-7"
          name="logo-expand"
          src="img/simhp/text-logo.svg"
        />
      </CHeaderBrand>
      <CMenu />
      <CHeaderNav>
        <TheHeaderDropdownAccnt class="pr-4 list-none" />
      </CHeaderNav>
    </CHeader>
    <div class="hidden lg:flex h-20 justify-between items-center ">
      <p class="inline-block">
        {{ $store.state.ui.titleHeader }}
      </p>
      <div class="flex justify-end items-center">
        <div class="mr-2 ">
          <p class="capitalize pr-3 font-bold">
            {{ namaUser }}
          </p>
        </div>
        <TheHeaderDropdownAccnt class="pr-4 list-none" />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
// import TheHeaderDropdownNotif from './TheHeaderDropdownNotif';
// import TheHeaderDropdownTasks from './TheHeaderDropdownTasks';
// import TheHeaderDropdownMssgs from './TheHeaderDropdownMssgs'
import CMenu from "./Menu";
import axios from "axios";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt
    // TheHeaderDropdownNotif,
    // TheHeaderDropdownTasks,
    // TheHeaderDropdownMssgs,
    // CMenu
  },
  data: function() {
    return {
      langs: [],
      locale: "en",
      namaUser: ""
    };
  },
  mounted() {
    this.namaUser = localStorage.getItem("name");
    let self = this;
    if (typeof localStorage.locale !== "undefined") {
      this.locale = localStorage.getItem("locale");
    }
    axios
      .get(
        this.$apiAddress +
          "/api/langlist?token=" +
          localStorage.getItem("api_token")
      )
      .then(function(response) {
        self.langs = [];
        for (let i = 0; i < response.data.length; i++) {
          self.langs.push({
            value: response.data[i].short_name,
            label: response.data[i].name
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        self.$router.push({ path: "/login" });
      });
  }
};
</script>
