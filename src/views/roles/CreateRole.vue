<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard no-header>
        <CCardBody>
          <h3>Create Role</h3>
          <CAlert :show.sync="dismissCountDown" color="primary" fade>
            ({{ dismissCountDown }}) {{ message }}
          </CAlert>

          <CInput
            v-model="role.name"
            label="Name"
            type="text"
            placeholder="Name"
          />

          <CButton color="primary" @click="store()"> Create </CButton>
          <CButton color="primary" @click="goBack"> Back </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CreateRole',
  /*
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  */
  data: () => {
    return {
      role: {
        name: '',
      },
      message: '',
      dismissSecs: 7,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  mounted: function () {
    let self = this;
    axios
      .get(
        this.$apiAddress +
          '/api/roles/create?token=' +
          localStorage.getItem('api_token')
      )
      .then(function (response) {
        self.statuses = response.data;
      })
      .catch(function (error) {
        console.log(error);
        self.$router.push({ path: 'login' });
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    store() {
      let self = this;
      axios
        .post(
          this.$apiAddress +
            '/api/roles?token=' +
            localStorage.getItem('api_token'),
          {
            name: self.role.name,
          }
        )
        .then(function (response) {
          self.note = {
            title: '',
            content: '',
            applies_to_date: '',
            status_id: null,
            note_type: '',
          };
          self.message = 'Successfully created role.';
          self.showAlert();
        })
        .catch(function (error) {
          if (error.response.data.message == 'The given data was invalid.') {
            self.message = '';
            for (let key in error.response.data.errors) {
              if (error.response.data.errors.hasOwnProperty(key)) {
                self.message += error.response.data.errors[key][0] + '  ';
              }
            }
            self.showAlert();
          } else {
            console.log(error);
            self.$router.push({ path: 'login' });
          }
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
