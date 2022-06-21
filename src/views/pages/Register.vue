<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm
                method="POST"
                @submit.prevent="register"
              >
                <h1>Register</h1>
                <p class="text-muted">
                  Create your account
                </p>
                <CInput
                  v-model="name"
                  placeholder="Username"
                  autocomplete="username"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>
                <CInput
                  v-model="email"
                  placeholder="Email"
                  prepend="@"
                  autocomplete="email"
                />
                <CInput
                  v-model="password"
                  placeholder="Password"
                  type="password"
                  prepend-html="<i class='cui-lock-locked'></i>"
                  autocomplete="new-password"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CInput
                  v-model="password_confirmation"
                  placeholder="Repeat password"
                  type="password"
                  prepend-html="<i class='cui-lock-locked'></i>"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CButton
                  type="submit"
                  color="success"
                  block
                >
                  Create Account
                </CButton>
              </CForm>
            </CCardBody>
            <!-- <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter> -->
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

  <script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
  },
  methods: {
    register() {
      var self = this;
      axios
        .post(this.$apiAddress + '/api/register', {
          name: self.name,
          email: self.email,
          password: self.password,
          password_confirmation: self.password_confirmation,
        })
        .then(function (response) {
          self.name = '';
          self.email = '';
          self.password = '';
          self.password_confirmation = '';
          // console.log(response);
          self.$router.push({ path: '/login' });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
