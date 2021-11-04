const UserUnitKerja = resolve => {
  require.ensure(['@/views/modules/userUnitKerja/index.vue'], () => {
      resolve(require('@/views/modules/userUnitKerja/index.vue'));
  });
};

const UserUnitKerjaCreate = resolve => {
  require.ensure(['@/views/modules/userUnitKerja/Create.vue'], () => {
      resolve(require('@/views/modules/userUnitKerja/Create.vue'));
  });
};

const UserUnitKerjaEdit = resolve => {
  require.ensure(['@/views/modules/userUnitKerja/Edit.vue'], () => {
      resolve(require('@/views/modules/userUnitKerja/Edit.vue'));
  });
};


const routeModUserUnitKerja = {
  path: 'manajemen-user',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [2],
  },
  children: [
    {
      path: '',
      name: 'module-user-unit-kerja',
      component: UserUnitKerja,
      meta: {
        requiresUser: true,
      },
    },
    {
      path: 'create',
      name: 'module-create-user-unit-kerja',
      component: UserUnitKerjaCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idUserUnitKerja/edit',
      name: 'module-edit-user-unit-kerja',
      component: UserUnitKerjaEdit,
      meta: {
        requiresUser: true
      },
      props: true
    }
  ]
}


export default routeModUserUnitKerja