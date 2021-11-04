<template>
  <CDropdown
    in-nav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0 mt-1"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <!-- <span class="text-white font-semibold text-xl">S</span> -->
          <!-- <img src="img/avatars/6.jpg" class="c-avatar-img" /> -->
          <img
            :src="`https://avatars.dicebear.com/api/micah/${namaUser}.svg?background=%230000ff&mouth=smile`"
            class="c-avatar-img"
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <!-- <CDropdownItem>
      <CIcon name="cil-bell" /> Updates
      <CBadge color="info" class="ml-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="ml-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-task" /> Tasks
      <CBadge color="danger" class="ml-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-comment-square" /> Comments
      <CBadge color="warning" class="ml-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem> -->
    <CDropdownItem
      class="mt-2"
      @click="$router.push({ name: 'profile-index' })"
    >
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <!-- <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Settings</strong>
    </CDropdownHeader> -->
    <!-- <CDropdownItem> <CIcon name="cil-settings" /> Settings </CDropdownItem> -->
    <!-- <CDropdownItem>
      <CIcon name="cil-dollar" /> Payments
      <CBadge
        color="secondary"
        class="ml-auto"
      >
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-file" /> Projects
      <CBadge
        color="primary"
        class="ml-auto"
      >
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem> -->
    <CDropdownDivider />
    <!-- <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Lock Account
    </CDropdownItem> -->
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TheHeaderDropdownAccnt',
  data() {
    return {
      itemsCount: 42,
      namaUser: localStorage.getItem('name'),
    };
  },
  methods: {
    logout() {
      let self = this;
      axios
        .post(
          this.$apiAddress +
            '/api/logout?token=' +
            localStorage.getItem('api_token'),
          {}
        )
        .then(function (response) {
          localStorage.removeItem('api_token');
          localStorage.removeItem('tokenExpiration');
          localStorage.removeItem('idUnitKerja');
          localStorage.removeItem('level');
          localStorage.removeItem('name');
          localStorage.removeItem('roles');
          localStorage.removeItem('namaUnit');
          localStorage.removeItem('idSubUnitKerja');
          localStorage.removeItem('namaSubUnit');
          self.$router.push({ path: '/login' });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
