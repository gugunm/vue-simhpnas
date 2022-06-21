<template>
  <div
    class="c-app bg-body-primary"
    :class="{ 'c-dark-theme': $store.state.ui.darkMode }"
  >
    <div v-if="!!mobileScreen" class="lg:hidden">
      <TheSidebar v-if="!!mobileScreen" :locale="locale" />
      <CWrapper>
        <TheHeader
          class="bg-body-primary text-blue-1 border-t-0 border-b-0"
          @change-locale="changeLocale"
        />
        <div class="wrapper-content">
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
    </div>
    <div v-else class="grid-wrapper">
      <div class="flex justify-center items-center border-b">
        <h1 class="title-gradient tracking-wide">
          SimhpNas
        </h1>
      </div>
      <!-- <div class="border-b"> -->
      <TheHeader
        class="bg-body-primary text-blue-1"
        @change-locale="changeLocale"
      />
      <!-- </div> -->
      <div class="overflow-auto">
        <TheSidebar
          v-if="!mobileScreen"
          :locale="locale"
          :class-relative="true"
        />
      </div>
      <div class="overflow-auto">
        <!-- <div class="c-body bg-white "> -->
        <main class="c-main">
          <CContainer fluid>
            <!-- <CContainer> -->
            <transition name="fade">
              <router-view />
            </transition>
          </CContainer>
        </main>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";
import TheAside from "./TheAside";

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

.grid-wrapper {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) 4fr;
  grid-template-rows: 80px auto;
  height: 100vh;
  isolation: isolate;
  /* grid grid-columns-[minmax(300px, 1fr) 4fr] grid-rows-[80px auto] h-screen */
}

.title-gradient {
  background: linear-gradient(to right, #0ea5e9, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 22px;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
}
</style>
