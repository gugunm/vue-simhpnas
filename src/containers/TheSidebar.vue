<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :show="show"
    class="bg-sidebar shadow-none"
    @update:show="(value) => $store.commit('ui/set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none bg-sidebar py-4" to="/">
      <!-- <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        view-box="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        view-box="0 0 110 134"
      /> -->
      <CImg
        v-if="!this.$store.state.ui.sidebarMinimize"
        class="sidebar-logo g-logo-expand"
        name="logo-expand"
        src="img/simhp/logo.svg"
      />
      <CImg
        v-if="this.$store.state.ui.sidebarMinimize"
        class="sidebar-logo-collapse g-logo-expand"
        name="logo-expand"
        src="img/simhp/letter-logo.png"
      />
    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="nav" />
    <CSidebarMinimizer
      class="c-d-md-down-none bg-transparent border-0"
      @click.native="$store.commit('ui/toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TheSidebar',
  props: ['locale'],
  data() {
    return {
      // minimize: false,
      nav: [],
      // show: 'responsive',
      buffor: [],
    };
  },
  computed: {
    show() {
      return this.$store.state.ui.sidebarShow;
    },
    minimize() {
      // console.log(this.$store.getters['auth/token']);
      return this.$store.state.ui.sidebarMinimize;
    },
  },
  watch: {
    locale: function () {
      //(newVal, oldVal) { // watch it
      this.downloadSidebarData();
    },
  },
  mounted() {
    this.$root.$on('toggle-sidebar', () => {
      const sidebarOpened = this.show === true || this.show === 'responsive';
      this.show = sidebarOpened ? false : 'responsive';
    });
    this.$root.$on('toggle-sidebar-mobile', () => {
      const sidebarClosed = this.show === 'responsive' || this.show === false;
      this.show = sidebarClosed ? true : 'responsive';
    });
    this.downloadSidebarData();
  },
  methods: {
    dropdown(data) {
      let result = {
        _name: 'CSidebarNavDropdown',
        name: data['name'],
        route: data['href'],
        icon: data['icon'],
        _children: [],
      };
      for (let i = 0; i < data['elements'].length; i++) {
        if (data['elements'][i]['slug'] == 'dropdown') {
          result._children.push(this.dropdown(data['elements'][i]));
        } else {
          result._children.push({
            _name: 'CSidebarNavItem',
            name: data['elements'][i]['name'],
            to: data['elements'][i]['href'],
            icon: data['elements'][i]['icon'],
          });
        }
      }
      return result;
    },
    rebuildData(data) {
      this.buffor = [
        {
          _name: 'CSidebarNav',
          _children: [],
        },
      ];
      for (let k = 0; k < data.length; k++) {
        switch (data[k]['slug']) {
          case 'link':
            if (data[k]['href'].indexOf('http') !== -1) {
              this.buffor[0]._children.push({
                _name: 'CSidebarNavItem',
                name: data[k]['name'],
                href: data[k]['href'],
                icon: data[k]['icon'],
                target: '_blank',
              });
            } else {
              this.buffor[0]._children.push({
                _name: 'CSidebarNavItem',
                name: data[k]['name'],
                to: data[k]['href'],
                icon: data[k]['icon'],
              });
            }
            break;
          case 'title':
            this.buffor[0]._children.push({
              _name: 'CSidebarNavTitle',
              _children: [data[k]['name']],
            });
            break;
          case 'dropdown':
            this.buffor[0]._children.push(this.dropdown(data[k]));
            break;
        }
      }
      return this.buffor;
    },
    downloadSidebarData() {
      let self = this;
      let locale = 'en';
      if (typeof localStorage.locale !== 'undefined') {
        locale = localStorage.getItem('locale');
      }
      axios
        .get(
          this.$apiAdress +
            '/api/menusimhp?token=' +
            localStorage.getItem('api_token')
          // +
          // '&locale=' +
          // locale
        )
        .then(function (response) {
          self.nav = self.rebuildData(response.data);
        })
        .catch(function (error) {
          console.log(error);
          self.$router.push({ path: '/login' });
        });
    },
  },
};
</script>

<style scoped>
.sidebar-logo {
  max-width: 55%;
}

.sidebar-logo-collapse {
  max-width: 35%;
}
</style>
