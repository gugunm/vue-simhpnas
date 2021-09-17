<template>
  <div
    class="c-app bg-body-primary"
    :class="{ 'c-dark-theme': $store.state.ui.darkMode }"
  >
    <TheSidebar :locale="locale" />
    <TheAside />
    <CWrapper>
      <TheHeader
        class="bg-body-primary text-blue-1 border-t-0 border-b-0"
        @change-locale="changeLocale"
      />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view />
            </transition>
          </CContainer>
        </main>
        <TheFooter class="bg-body-primary text-blue-2" />
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
import TheAside from './TheAside';

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    TheAside,
  },
  data() {
    return {
      locale: 'en',
    };
  },
  methods: {
    changeLocale(value) {
      this.locale = value;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
