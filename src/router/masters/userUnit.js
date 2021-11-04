// const MasterUserUnitKerja = () => import('@/views/masters/mUserUnitKerja')
const MasterUserUnit = resolve => {
  require.ensure(['@/views/masters/mUserUnitKerja'], () => {
      resolve(require('@/views/masters/mUserUnitKerja'));
  });
};
const MasterCreateUserUnit = resolve => {
  require.ensure(['@/views/masters/mUserUnitKerja/Create.vue'], () => {
      resolve(require('@/views/masters/mUserUnitKerja/Create.vue'));
  });
};
const MasterEditUserUnit = resolve => {
  require.ensure(['@/views/masters/mUserUnitKerja/Edit.vue'], () => {
      resolve(require('@/views/masters/mUserUnitKerja/Edit.vue'));
  });
};


const routeUserUnit = {
  path: 'master-user-unit-kerja',
  name: 'MasterUserUnitKerja',
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
      name: 'master-user-unit-index',
      component: MasterUserUnit,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'master-user-unit-create',
      component: MasterCreateUserUnit,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idUserUnit/edit',
      name: 'master-user-unit-edit',
      component: MasterEditUserUnit,
      meta: {
        requiresUser: true
      },
      props: true
    }
  ]
}

export default routeUserUnit;