// const MasterUserUtama = () => import('@/views/masters/mUserUtama')
const MasterUserUtama = resolve => {
  require.ensure(['@/views/masters/mUserUtama/index.vue'], () => {
      resolve(require('@/views/masters/mUserUtama/index.vue'));
  });
};
const MasterCreateUserUtama = resolve => {
  require.ensure(['@/views/masters/mUserUtama/Create.vue'], () => {
      resolve(require('@/views/masters/mUserUtama/Create.vue'));
  });
};
const MasterEditUserUtama = resolve => {
  require.ensure(['@/views/masters/mUserUtama/Edit.vue'], () => {
      resolve(require('@/views/masters/mUserUtama/Edit.vue'));
  });
};
const MasterPasswordUserUtama = resolve => {
  require.ensure(['@/views/masters/mUserUtama/UpdatePassword.vue'], () => {
      resolve(require('@/views/masters/mUserUtama/UpdatePassword.vue'));
  });
};


const routeUserUtama = {
  path: 'master-user-utama',
  name: 'MasterUserUtama',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    requiresUser: true,
    // requiresAdmin: true,
    allowedUser: [0, 1],
  },
  children: [
    {
      path: '',
      name: 'master-user-utama-index',
      component: MasterUserUtama,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'master-user-utama-create',
      component: MasterCreateUserUtama,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idUserUtama/edit',
      name: 'master-user-utama-edit',
      component: MasterEditUserUtama,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idUserUtama/password',
      name: 'master-user-utama-password',
      component: MasterPasswordUserUtama,
      meta: {
        requiresUser: true
      },
      props: true
    }
  ]
}


export default routeUserUtama