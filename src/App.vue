<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    didAutoLogout() {
      return this.$store.getters['auth/didAutoLogout'];
    }
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/login');
      }
    }
  },
  // created() {
  //   this.$store.dispatch('auth/tryLogin');
  // }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
