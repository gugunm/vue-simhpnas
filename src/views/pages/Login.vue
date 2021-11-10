<template>
  <div class="flex lg:w-full h-screen justify-center">
    <div class="img-login hidden lg:block lg:w-2/6 bg-red-500">
      <div class="flex flex-col px-8 h-full text-white justify-center">
        <!-- <h1 class="text-4xl text-center">SIMHPNAS</h1> -->
        <div class="text-left px-4">
          <CImg
            class="inline-block w-52 lg:w-60 mb-2"
            src="img/simhp/text-logo-white.svg"
          />
          <p class="text-left text-base lg:text-lg tracking-wide">
            Sistem Infomasi Manajemen Hasil Pengawasan Nasional
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex-initial content-center w-full lg:w-4/6 bg-white p-6 lg:py-14"
    >
      <div class="w-full lg:max-w-xl">
        <div class="flex flex-col text-left w-full">
          <div class="flex justify-start content-center mb-4 lg:hidden">
            <!-- <CImg class="inline-block w-8 mr-2" src="/img/simhp/logo.svg" /> -->
            <CImg
              class="inline-block h-10 mr-2"
              src="img/simhp/text-logo.svg"
            />
            <!-- <h3 class="text-2xl font-bold inline-block">SIMHPNAS</h3> -->
          </div>
          <!-- <div>

          </div> -->
          <p class="text-3xl leading-normal tracking-wide font-medium mb-4">
            Halo,<br />Selamat Datang!
          </p>
          <form
            method="POST"
            class="flex flex-col"
            @submit.prevent="submitForm"
          >
            <p class="mb-3 tracking-wide">Silahkan login untuk melanjutkan</p>
            <div class="flex flex-wrap mb-4">
              <div class="w-full">
                <input
                  v-model="email"
                  class="
                    rounded-lg
                    appearance-none
                    block
                    w-full
                    text-gray-700
                    border border-gray-200
                    py-3
                    px-4
                    mb-3
                    leading-tight
                    tracking-wide
                    focus:outline-none focus:bg-white focus:border-gray-500
                  "
                  type="text"
                  placeholder="email"
                />
                <input
                  v-model="password"
                  class="
                    rounded-lg
                    appearance-none
                    block
                    w-full
                    text-gray-700
                    border border-gray-200
                    py-3
                    px-4
                    leading-tight
                    focus:outline-none focus:bg-white focus:border-gray-500
                  "
                  type="password"
                  placeholder="password"
                />
              </div>
            </div>
            <!-- <div class="text-right">
              <router-link
                to="/"
                class="
                  text-right
                  inline-block
                  mt-1
                  mb-3
                  hover:no-underline hover:text-blue-700
                "
              >
                Lupa password?
              </router-link>
            </div> -->
            <button
              class="
                rounded-lg
                appearance-none
                block
                w-full
                bg-red-500
                text-white
                py-3
                px-4
                leading-tight
                hover:bg-red-600
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
          <p class="mt-3 tracking-wide">
            Belum punya akun? silahkan
            <a
              href="mailto:pusinfowas@bpkp.go.id?subject=Permintaan Piloting SIMHPNAS"
              target="_blank"
              class="
                inline-block
                font-bold
                hover:no-underline
                text-red-500
                hover:text-red-600
              "
            >
              Hubungi Tim Kami
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CoverImg from '../../assets/img/cover.jpg';

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

.img-login {
  background-image: url('/img/simhp/bg-login.jpg');
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  /* background-position: left; */
  /* margin-right: 100px; */
  /* background-position: right; */
  background-position-x: 80%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
