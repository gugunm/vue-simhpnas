<template>
  <CRow>
    <CCol col="12" xl="6">
      <transition name="slide">
        <CCard>
          <CCardBody>
            <h3>Edit {{ form.name }}</h3>
            <CAlert :show.sync="dismissCountDown" color="primary" fade>
              ({{ dismissCountDown }}) {{ message }}
            </CAlert>
            <UpdateResourceField
              v-for="column in columns"
              :key="column.id"
              :column="column"
              :relations="relations"
              :options="inputOptions"
              :get-data="getData"
              @sendData="receiveDataFormField"
            />

            <CButton class="mt-2" color="primary" @click="updateFirstStep()">
              Edit
            </CButton>
            <CButton class="mt-2" color="primary" @click="goBack">
              Back
            </CButton>
          </CCardBody>
        </CCard>
      </transition>
    </CCol>
  </CRow>
</template>

<script>
import UpdateResourceField from './UpdateResourceField';
import axios from 'axios';

export default {
  name: 'CreateResources',
  components: {
    UpdateResourceField: UpdateResourceField,
  },
  data: () => {
    return {
      message: '',
      dismissSecs: 7,
      dismissCountDown: 0,
      form: {},
      columns: [],
      relations: [],
      inputOptions: [],
      receiveFormFields: [],
      getData: false,
    };
  },
  computed: {},
  watch: {
    activePage() {
      this.getResources();
    },
  },
  mounted: function () {
    this.getFields();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updateFirstStep() {
      this.getData = true;
    },
    receiveDataFormField(data) {
      let self = this;
      self.receiveFormFields.push(data);
      if (self.receiveFormFields.length == self.columns.length) {
        self.update();
      }
    },
    preparePostDataForStore() {
      let formData = new FormData();
      for (let i = 0; i < this.receiveFormFields.length; i++) {
        formData.append(
          this.receiveFormFields[i].name,
          this.receiveFormFields[i].data
        );
      }
      formData.append('_method', 'PUT');
      return formData;
    },
    update(files, event) {
      let self = this;
      let postData = self.preparePostDataForStore();
      axios
        .post(
          this.$apiAddress +
            '/api/resource/' +
            self.$route.params.bread +
            '/resource/' +
            self.$route.params.id +
            '?token=' +
            localStorage.getItem('api_token'),
          postData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(function () {
          self.$router.go(-1);
          self.message = 'Successfully edited ' + self.form.name;
          self.showAlert();
        })
        .catch(function (error) {
          console.log(error);
          self.$router.push({ path: '/login' });
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    getFields() {
      let self = this;
      axios
        .get(
          this.$apiAddress +
            '/api/resource/' +
            self.$route.params.bread +
            '/resource/' +
            self.$route.params.id +
            '/edit?token=' +
            localStorage.getItem('api_token')
        )
        .then(function (response) {
          self.form = response.data.form;
          self.columns = response.data.columns;
          self.relations = response.data.relations;
          self.inputOptions = response.data.inputOptions;
        })
        .catch(function (error) {
          console.log(error);
          self.$router.push({ path: '/login' });
        });
    },
  },
};
</script>

<style scoped>
</style>
