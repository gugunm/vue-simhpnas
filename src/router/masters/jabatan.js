// const MasterRefJabatan = () => import('@/views/masters/mReferensi/refJabatan/index.vue')
const MasterRefJabatan = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJabatan/index.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJabatan/index.vue'));
  });
};
// const MasterCreateRefJabatan = () => import('@/views/masters/mReferensi/refJabatan/Create.vue')
const MasterCreateRefJabatan = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJabatan/Create.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJabatan/Create.vue'));
  });
};
// const MasterEditRefJabatan = () => import('@/views/masters/mReferensi/refJabatan/Edit.vue')
const MasterEditRefJabatan = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJabatan/Edit.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJabatan/Edit.vue'));
  });
};

const routeJabatan = // MasterCreateRefJabatan
// MasterEditRefJabatan
{
  path: 'jabatan',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'master-ref-jabatan',
      component: MasterRefJabatan,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'master-create-ref-jabatan',
      component: MasterCreateRefJabatan,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idJabatan/edit',
      name: 'master-edit-ref-jabatan',
      component: MasterEditRefJabatan,
      meta: {
        requiresUser: true
      },
      props: true
    }
  ]
}

export default routeJabatan;