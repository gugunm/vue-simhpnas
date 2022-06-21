<template>
  <CRow>
    <CCol
      col="12"
      lg="6"
    >
      <CCard>
        <CCardBody>
          <h3>Edit Email Template</h3>
          <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditEmailTemplate',
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
    };
  },
  mounted: function () {
    let self = this;
    axios
      .get(
        this.$apiAddress +
          '/api/mail/' +
          self.$route.params.id +
          '/edit?token=' +
          localStorage.getItem('api_token')
      )
      .then(function (response) {
        self.template = response.data.template;
      })
      .catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    update() {
      let self = this;
      axios
        .post(
          this.$apiAddress +
            '/api/mail/' +
            self.$route.params.id +
            '?token=' +
            localStorage.getItem('api_token'),
          {
            _method: 'PUT',
            name: self.template.name,
            subject: self.template.subject,
            content: self.template.content,
          }
        )
        .then(function (response) {
          self.message = 'Successfully updated note.';
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
            self.$router.push({ path: '/login' });
          }
        });
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
