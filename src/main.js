import 'core-js/stable'
import Vue from 'vue'
import CoreuiVue from '@coreui/vue'
import App from './App'
import store from './store/index';
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import vuexI18n from 'vuex-i18n';
import Locales from './locale/vue-i18n-locales.generated.js';

import { API_URL } from './utils/api.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.prototype.$apiAdress = API_URL
Vue.use(CoreuiVue)
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('en', Locales.en);
Vue.i18n.add('pl', Locales.pl);
let locale = 'en'
if(typeof localStorage.locale !== 'undefined'){
  locale = localStorage.getItem("locale")
}
Vue.i18n.set(locale);

new Vue({
  el: '#app',
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  components: {
    App
  },
  template: '<App/>'
})

