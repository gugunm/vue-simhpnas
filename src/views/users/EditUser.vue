<template>
  <CRow>
    <CCol
      col="12"
      lg="6"
    >
      <CCard no-header>
        <CCardBody>
          <CForm>
            <template slot="header">
              Edit User id:  {{ $route.params.id }}
            </template>
            <CAlert
              :show.sync="dismissCountDown"
              color="primary"
              fade
            >
              ({{ dismissCountDown }}) {{ message }}
            </CAlert>
            <CInput
              id="company"
              v-model="name"
              type="text"
              label="Name"
              placeholder="Name"
            />
            <CInput
              id="email"
              v-model="email"
              type="text"
              label="Email"
              placeholder="Email"
            />
            <CButton
              color="primary"
              @click="update()"
            >
              Save
            </CButton>
            <CButton
              color="primary"
              @click="goBack"
            >
              Back
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditUser',
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
        name: '',
        email: '',
        showMessage: false,
        message: '',
        dismissSecs: 7,
        dismissCountDown: 0,
        showDismissibleAlert: false
    }
  },
  mounted: function(){
    let self = this;
    axios.get( this.$apiAdress + '/api/users/' + self.$route.params.id + '/edit?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        self.name = response.data.name;
        self.email = response.data.email;
    }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    update() {
        let self = this;
        axios.post( this.$apiAdress + '/api/users/' + self.$route.params.id + '?token=' + localStorage.getItem("api_token"),
        {
            _method: 'PUT',
            name: self.name,
            email: self.email,
        })
        .then(function (response) {
            self.message = 'Successfully updated user.';
            self.showAlert();
        }).catch(function (error) {
            console.log(error);
            self.$router.push({ path: '/login' });
        });
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
  }
}


</script>
