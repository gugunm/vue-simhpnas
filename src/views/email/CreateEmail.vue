<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard no-header>
        <CCardBody>
          <h4>Create Email Template</h4>
          <CAlert :show.sync="dismissCountDown" color="primary" fade>
            ({{ dismissCountDown }}) {{ message }}
          </CAlert>

          <CInput
            v-model="template.name"
            label="Name"
            type="text"
            placeholder="Name"
          />

          <CInput
            v-model="template.subject"
            label="Subject"
            type="text"
            placeholder="Subject"
          />

          <CTextarea
            v-model="template.content"
            textarea="true"
            label="Content"
            :rows="15"
            placeholder="Content.."
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
  name: 'CreateEmailTemplate',
  data: () => {
    return {
      template: {
        name: '',
        subject: '',
        content: '',
      },
      message: '',
      dismissSecs: 7,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  mounted: function () {},
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
            '/api/mail?token=' +
            localStorage.getItem('api_token'),
          self.template
        )
        .then(function (response) {
          self.template = {
            name: '',
            subject: '',
            content: '',
          };
          self.message = 'Successfully created Email Template.';
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
