<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div>
              <h3 class="text-2xl">Profile</h3>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md="2" class="flex justify-center">
                <div
                  class="
                    w-32
                    h-32
                    rounded-full
                    flex
                    justify-center
                    items-center
                    border-2 border-blue-500
                  "
                >
                  <!-- src="img/avatars/6.jpg" -->
                  <img
                    :src="`https://avatars.dicebear.com/api/bottts/${profile.name}.svg?background=%23dbeafe&scale=80`"
                    class="c-avatar-img w-full h-full"
                  />
                </div>
              </CCol>
              <CCol md="10">
                <CRow class="mb-4">
                  <CCol>
                    <div>
                      <label class="text-sm font-medium">Nama Lengkap</label>
                      <p class="text-base">
                        {{ profile.name }}
                      </p>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-4">
                  <CCol>
                    <div>
                      <label class="text-sm font-medium">Email</label>
                      <p class="text-base">
                        {{ profile.email }}
                      </p>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-4">
                  <CCol>
                    <div>
                      <label class="text-sm font-medium">Unit Audit</label>
                      <p class="text-base">
                        {{ profile.deskripsiUnitAudit }}
                      </p>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-4">
                  <CCol>
                    <div>
                      <label class="text-sm font-medium">Sub Unit Audit</label>
                      <p class="text-base">
                        {{ profile.deskripsiSubUnitAudit }}
                      </p>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-4">
                  <CCol>
                    <div>
                      <label class="text-sm font-medium">Role</label>
                      <p class="text-base">
                        {{ profile.deskripsiLevel }}
                      </p>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mt-5">
                  <CCol md="12">
                    <p class="py-2 mb-2 text-base font-medium border-b">
                      Ubah Password
                    </p>
                  </CCol>
                  <CCol md="12">
                    <change-password />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
          <!-- <CCardFooter>
            <div class="flex justify-end py-2">
              <CButton color="info" class="px-5"> Simpan </CButton>
            </div>
          </CCardFooter> -->
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from 'axios';
import ChangePassword from './ChangePassword.vue';

export default {
  components: {
    ChangePassword,
  },
  data() {
    return {
      profile: {},
    };
  },
  async mounted() {
    await this.loadProfile();
  },
  methods: {
    async loadProfile() {
      try {
        const response = await axios({
          method: 'GET',
          baseURL: this.$apiAddress,
          url: '/api/profile',
          params: {
            token: localStorage.getItem('api_token'),
          },
        });

        this.profile = await response.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>
