<template>
  <CContainer class="login-container d-flex align-items-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm @submit.prevent="login" method="POST">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  v-model="email"
                  prependHtml="<i class='cui-user'></i>"
                  placeholder="Email"
                  autocomplete="email"
                >
                  <template #prepend-content>@</template>
                  <!-- <template #prepend-content><CIcon name="cil-user"/></template> -->
                </CInput>
                <CInput
                  v-model="password"
                  prependHtml="<i class='cui-lock-locked'></i>"
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton type="submit" color="dark" class="px-4">Login</CButton>
                  </CCol>
                  <CCol col="6" class="text-right">
                    <!-- <CButton color="link" class="px-0">Forgot password?</CButton> -->
                    <!-- <CButton color="link" class="d-md-none" @click="goRegister()">Register now!</CButton> -->
                  </CCol>
                </CRow>
                  <CAlert
                  class="mt-3"
                    v-if="showMessage"
                    color="danger"
                    :show.sync="currentAlertCounter"
                    closeButton
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
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            text-color="white"
            class="login-logo text-center py-5 d-md-down-none"
            body-wrapper
          >
            <CImg
              class="g-logo-collapse mb-3"
              name="logo-collapse"
              size="custom-size"
              src="img/simhp/logo.svg"
            />
            <p class="c-grey" >Sistem Informasi Manajemen Hasil Pengawasan Nasional</p>
            <!-- <p class="c-grey">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> -->
            <!-- <CButton
              color="primary"
              class="active mt-3"
              @click="goRegister()"
            >
              Register Now!
            </CButton> -->
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>

import axios from "axios";
// import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'Login',
  // components: { VueRecaptcha },
  data() {
    return {
      email: '',
      password: '',
      showMessage: false,
      message: '',
      currentAlertCounter: 0
    }
  },
  methods: {
    goRegister(){
      this.$router.push({ path: 'register' });
    },
    login() {
      let self = this;
      self.showMessage = false;
      self.currentAlertCounter= 5;

      axios.post( this.$apiAdress + '/api/login', {
        email: self.email,
        password: self.password,
      }).then(function (response) {
        self.email = '';
        self.password = '';
        localStorage.setItem("api_token", response.data.access_token);
        localStorage.setItem('roles', response.data.roles);
        self.$router.push({ path: 'dashboard' });
      })
      .catch(function (error) {
        self.message = 'E-mail atau password anda salah!';
        self.showMessage = true;
        console.log(error);
      });

    },
  }
}

</script>


<style scoped>
.login-container{
  justify-content: center;
}

.login-container .card-body {
  min-width: 500px;
}

.login-logo {
  background-color: #303C50;
  width: inherit;
}

.b-grey {
  background-color: #303C50
}

.c-grey {
  color: #EAF6FF;
}

.login-subtitle {
  width: 400px;
  margin-bottom: 1rem;
}

</style>
