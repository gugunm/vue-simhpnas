// UNIT KERJA
// const MasterUnitKerja = () => import('@/views/masters/mUnitKerja/index.vue')
const MasterUnitKerja = resolve => {
  require.ensure(['@/views/masters/mUnitKerja/index.vue'], () => {
      resolve(require('@/views/masters/mUnitKerja/index.vue'));
  });
};
// const MasterCreateUnitKerja = () => import('@/views/masters/mUnitKerja/Create.vue')
const MasterCreateUnitKerja = resolve => {
  require.ensure(['@/views/masters/mUnitKerja/Create.vue'], () => {
      resolve(require('@/views/masters/mUnitKerja/Create.vue'));
  });
};
// const MasterDetailUnitKerja = () => import('@/views/masters/mUnitKerja/Detail.vue')
const MasterDetailUnitKerja = resolve => {
  require.ensure(['@/views/masters/mUnitKerja/Detail.vue'], () => {
      resolve(require('@/views/masters/mUnitKerja/Detail.vue'));
  });
};
// const MasterEditUnitKerja = () => import('@/views/masters/mUnitKerja/Edit.vue')
const MasterEditUnitKerja = resolve => {
  require.ensure(['@/views/masters/mUnitKerja/Edit.vue'], () => {
      resolve(require('@/views/masters/mUnitKerja/Edit.vue'));
  });
};

const routeUnitKerja = {
  path: 'master-unit-kerja',
  name: 'master-unit-kerja',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [0, 1, 3, 4],
  },
  children: [
    {
      path: '/',
      name: 'master-unit-kerja-index',
      component: MasterUnitKerja,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'master-unit-kerja-create',
      component: MasterCreateUnitKerja,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idUnitKerja/edit',
      name: 'master-unit-kerja-edit',
      component: MasterEditUnitKerja,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idUnitKerja',
      name: 'master-unit-kerja-detail',
      component: MasterDetailUnitKerja,
      meta: {
        requiresUser: true
      },
      props: true
    },
  ]
}


export default routeUnitKerja;