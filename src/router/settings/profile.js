const Profile = resolve => {
  require.ensure(['@/views/settings/profile/index.vue'], () => {
      resolve(require('@/views/settings/profile/index.vue'));
  });
};

const routeProfile = [
  {
    path: 'profile',
    name: 'profile-index',
    component: Profile,
    meta: {
      requiresUser: true
    }
  }
];

export default routeProfile;