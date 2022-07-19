import "core-js/stable";
import Vue from "vue";
import CoreuiVue from "@coreui/vue";
import App from "./App";
import store from "./store/index";
import router from "./router/index";
import { iconsSet as icons } from "./assets/icons/icons.js";
import vuexI18n from "vuex-i18n";
import Locales from "./locale/vue-i18n-locales.generated.js";

import VueApexCharts from "vue-apexcharts";

import { API_URL } from "./utils/api.js";

import "./assets/tailwind.css";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

import VueCompositionAPI from "@vue/composition-api";

Vue.use(VueCompositionAPI);

import { func } from "./globalFunction";

import IdleVue from "idle-vue";
const eventsHub = new Vue();

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 60 * 60 * 1000 // idle dalam 1 jam
  // idleTime: 5000
});

Vue.use(VueApexCharts);
Vue.component("VueApexChart", VueApexCharts);

/**
 * *Ini adalah global variable dan function yang dapat
 * *dipanggil di component vue -> this.$apiAddress
 */
Vue.prototype.$apiAddress = API_URL;
Vue.prototype.$func = func;

Vue.use(CoreuiVue);
Vue.use(VueToast, {
  position: "top"
});
Vue.use(vuexI18n.plugin, store);

Vue.i18n.add("en", Locales.en);
Vue.i18n.add("pl", Locales.pl);
let locale = "en";
if (typeof localStorage.locale !== "undefined") {
  locale = localStorage.getItem("locale");
}
Vue.i18n.set(locale);

new Vue({
  el: "#app",
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  components: {
    App
  },
  onIdle() {
    if (this.$store.getters["auth/isAuthenticated"]) {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/login");
    }
  },
  // onActive() {
  //   this.messageStr = 'Hello'
  // },
  template: "<App/>"
});
