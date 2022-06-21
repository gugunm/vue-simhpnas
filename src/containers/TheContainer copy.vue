<template>
  <div
    class="c-app bg-body-primary"
    :class="{ 'c-dark-theme': $store.state.ui.darkMode }"
  >
    <!-- <div> -->
    <TheSidebar v-if="!!mobileScreen" :locale="locale" />
    <CWrapper>
      <TheHeader
        class="bg-body-primary text-blue-1 border-t-0 border-b-0 fixed"
        @change-locale="changeLocale"
      />
      <div class="wrapper-content">
        <TheSidebar
          v-if="!mobileScreen"
          :locale="locale"
          :class-relative="true"
        />
        <div class="c-body relative bg-white ">
          <!-- <TheAside /> -->
          <main class="c-main relative">
            <CContainer fluid>
              <!-- <CContainer> -->
              <transition name="fade">
                <router-view />
              </transition>
            </CContainer>
          </main>
          <!-- <TheFooter class="bg-body-primary text-blue-2" /> -->
        </div>
      </div>
    </CWrapper>
    <!-- </div> -->
    <!-- <TheFooter class="bg-body-primary text-blue-2" /> -->
  </div>
  <!-- </div> -->
</template>

<script>
import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";
// import TheAside from "./TheAside";

export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader
    // TheFooter
    // TheAside
  },
  data() {
    return {
      locale: "en",
      mobileScreen: false
    };
  },
  mounted() {
    this.mobileScreen = window.innerWidth < 1024 ? true : false;
  },
  methods: {
    changeLocale(value) {
      this.locale = value;
    }
  }
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

.wrapper-content {
  display: flex;
  position: relative;
  z-index: 0;
}
</style>
