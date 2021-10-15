<template>
  <div class="flex lg:w-full h-screen justify-center">
    <div class="flex-initial hidden lg:block lg:w-1/2 bg-blue-700">
      <!-- Won't grow, but will shrink if needed -->
    </div>
    <div
      class="
        flex-initial
        content-center
        w-full
        lg:w-1/2
        bg-white
        p-10
        lg:py-14
        lg:px-20
      "
    >
      <div class="flex flex-col text-left w-full">
        <div class="flex justify-start content-center mb-4">
          <CImg class="inline-block w-8 mr-2" src="img/simhp/logo-login.svg" />
          <h3 class="text-2xl font-bold inline-block">SIMHPNAS</h3>
        </div>
        <h1 class="text-4xl font-bold mb-4 xl:mt-8">
          Halo,<br />Selamat Datang!
        </h1>
        <form
          method="POST"
          class="flex flex-col lg:pr-20"
          @submit.prevent="submitForm"
        >
          <p class="mb-2">Login to manage your account</p>
          <div class="flex flex-wrap mb-2">
            <div class="w-full">
              <!-- <div class="inline-block relative w-full mb-2">
                <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 leading-tight focus:outline-none focus:shadow-outline">
                  <option>User Unit</option>
                  <option>User Pusat</option>
                  <option>User Admin</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div> -->
              <input
                v-model="email"
                class="
                  appearance-none
                  block
                  w-full
                  text-gray-700
                  border border-gray-200
                  py-3
                  px-4
                  mb-2
                  leading-tight
                  focus:outline-none
                  focus:bg-white
                  focus:border-gray-500
                "
                type="text"
                placeholder="email"
              />
              <input
                v-model="password"
                class="
                  appearance-none
                  block
                  w-full
                  text-gray-700
                  border border-gray-200
                  py-3
                  px-4
                  leading-tight
                  focus:outline-none
                  focus:bg-white
                  focus:border-gray-500
                "
                type="password"
                placeholder="password"
              />
            </div>
          </div>
          <div class="text-right">
            <router-link
              to="/"
              class="
                text-right
                inline-block
                mt-1
                mb-3
                hover:no-underline
                hover:text-blue-700
              "
            >
              Lupa password?
            </router-link>
          </div>
          <button
            class="
              appearance-none
              block
              w-full
              bg-blue-700
              text-white
              py-3
              px-4
              leading-tight
              focus:border
              focus:bg-blue-800
              hover:bg-blue-800
              focus:border-gray-500
            "
            type="submit"
            placeholder="password"
          >
            <template v-if="loading">
              <CSpinner color="white" size="sm" class="mr-2" />
              <!-- Loading... -->
            </template>
            <template v-else> Login </template>
          </button>
          <CAlert
            v-if="showMessage"
            class="mt-3"
            color="danger"
            :show.sync="currentAlertCounter"
            close-button
          >
            {{ message }}
            <CProgress
              :max="5"
              :value="currentAlertCounter"
              height="3px"
              color="danger"
              animate
            />
          </CAlert>
        </form>
        <p class="mt-3">
          Belum punya akun?
          <router-link
            to="/"
            class="
              inline-block
              font-bold
              hover:no-underline
              text-blue-600
              hover:text-blue-800
            "
          >
            Hubungi Tim Kami
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showMessage: false,
      message: '',
      currentAlertCounter: 0,
      mode: 'login',
      error: null,
      loading: false,
    };
  },
  methods: {
    goRegister() {
      this.$router.push({ path: 'register' });
    },
    async submitForm() {
      let self = this;
      self.loading = true;

      self.showMessage = false;
      self.currentAlertCounter = 5;

      const actionPayload = {
        email: self.email,
        password: self.password,
      };

      try {
        await this.$store.dispatch('auth/login', actionPayload);
        self.email = '';
        self.password = '';
        self.loading = false;
        this.$router.push({ path: 'dashboard' });
      } catch (err) {
        self.loading = false;
        self.message = 'E-mail atau password anda salah!';
        self.showMessage = true;
        self.error = err.message || 'Failed to authenticate, try later.';
        console.log(error);
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  justify-content: center;
}

.login-container .card-body {
  min-width: 500px;
}

.login-logo {
  background-color: #303c50;
  width: inherit;
}

.b-grey {
  background-color: #303c50;
}

.c-grey {
  color: #eaf6ff;
}

.login-subtitle {
  width: 400px;
  margin-bottom: 1rem;
}
</style>
