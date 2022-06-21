<template>
  <CRow>
    <CCol
      col="12"
      lg="6"
    >
      <CCard no-header>
        <CCardBody>
          <h3>Create Menu Element</h3>
          <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
            ({{ dismissCountDown }}) {{ message }}
          </CAlert>
          <CSelect
            label="Menu"
            :value.sync="menuelement.menu"
            :plain="true"
            :options="menulist"
            @update:value="updateSelectParent()"
          />
          <p>Roles</p>
          <div class="m-3">
            <CInputCheckbox
              v-for="rol in role"
              :key="rol"
              :label="rol"
              name="selectRoles"
              @update:checked="selectRadioSelectRole(rol)"
            />
          </div>

          <p>Name</p>
          <CInput
            v-for="lang in langs"
            :key="lang.id"
            :label="lang.name"
            type="text"
            :placeholder="lang.name"
            @change="(state) => changeLang(state, lang.short_name)"
          />

          <CSelect
            label="Type"
            :value.sync="menuelement.type"
            :plain="true"
            :options="types"
            @update:value="changeType()"
          />
          <p>Other</p>
          <div v-if="divHref">
            <CInput
              v-model="menuelement.href"
              label="Href"
              type="text"
              placeholder="Href"
            />
          </div>
          <div v-if="divDropdownParent">
            <CSelect
              label="Dropdown parent"
              :value.sync="menuelement.parent"
              :plain="true"
              :options="parents"
            />
          </div>
          <div v-if="divIcon">
            Icon - Find icon class in:
            <a
              href="https://coreui.io/docs/icons/icons-list/#coreui-icons-free-502-icons"
              target="_blank"
            >
              CoreUI icons documentation
            </a>
            <br>
            <CInput
              v-model="menuelement.icon"
              type="text"
              placeholder="CoreUI Icon class - example: cil-bell"
            />
          </div>
          <CButton
            color="primary"
            @click="store()"
          >
            Create
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
  name: 'CreateMenuElement',
  data: () => {
    return {
      role: [],
      menulist: [],
      parents: [],
      langs: [],
      types: [
        { label: 'Link', value: 'link' },
        { label: 'Title', value: 'title' },
        { label: 'Dropdown', value: 'dropdown' },
      ],
      menuelement: {
        menu: 0,
        name: '',
        role: [],
        type: 'link',
        href: '',
        icon: '',
        parent: null,
      },
      message: '',
      dismissSecs: 7,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      divHref: false,
      divDropdownParent: false,
      divIcon: false,
    };
  },
  mounted: function () {
    this.getData();
    this.menuelement.menu = this.$route.params.menu;
    this.updateSelectParent();
    this.changeType();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    changeLang(value, lang) {
      this.menuelement['lang_' + lang] = value;
    },
    selectRadioSelectRole(role) {
      let temp = this.menuelement.role.indexOf(role);
      if (temp > -1) {
        this.menuelement.role.splice(temp, 1);
      } else {
        this.menuelement.role.push(role);
      }
    },
    changeType() {
      let temp = this.menuelement.type;
      if (temp == 'title') {
        this.divHref = false;
        this.divDropdownParent = false;
        this.divIcon = false;
      } else if (temp == 'link') {
        this.divHref = true;
        this.divDropdownParent = true;
        this.divIcon = true;
      } else {
        this.divHref = false;
        this.divDropdownParent = true;
        this.divIcon = true;
      }
    },
    updateSelectParent() {
      let self = this;
      axios
        .get(
          this.$apiAddress +
            '/api/menu/element/get-parents?token=' +
            localStorage.getItem('api_token') +
            '&menu=' +
            self.menuelement.menu
        )
        .then(function (response) {
          self.parents = [{ label: 'Has no parent', value: null }];
          for (let i = 0; i < response.data.length; i++) {
            self.parents.push(response.data[i]);
          }
        })
        .catch(function (error) {
          console.log(error);
          self.$router.push({ path: 'login' });
        });
    },
    store() {
      let self = this;
      // console.log( self.menuelement )
      axios
        .post(
          this.$apiAddress +
            '/api/menu/element/store?token=' +
            localStorage.getItem('api_token'),
          self.menuelement
        )
        .then(function () {
          self.name = '';
          self.message = 'Successfully created menu element.';
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
    getData() {
      let self = this;
      axios
        .get(
          this.$apiAddress +
            '/api/menu/element/create?token=' +
            localStorage.getItem('api_token') +
            '&id=' +
            self.$route.params.menu
        )
        .then(function (response) {
          self.role = response.data.roles;
          self.menulist = response.data.menulist;
          self.langs = response.data.langs;
          for (let i = 0; i < self.langs.length; i++) {
            self.menuelement['lang_' + self.langs[i].short_name] = '';
          }
        })
        .catch(function (error) {
          console.log(error);
          self.$router.push({ path: '/login' });
        });
    },
  },
};
</script>
