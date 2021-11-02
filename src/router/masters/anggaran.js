// const MasterRefJenisAnggaran = () => import('@/views/masters/mReferensi/refJenisAnggaran/index.vue')
const MasterRefJenisAnggaran = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJenisAnggaran/index.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJenisAnggaran/index.vue'));
  });
};
// const MasterCreateRefJenisAnggaran = () => import('@/views/masters/mReferensi/refJenisAnggaran/Create.vue')
const MasterCreateRefJenisAnggaran = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJenisAnggaran/Create.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJenisAnggaran/Create.vue'));
  });
};
// const MasterEditRefJenisAnggaran = () => import('@/views/masters/mReferensi/refJenisAnggaran/Edit.vue')
const MasterEditRefJenisAnggaran = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJenisAnggaran/Edit.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJenisAnggaran/Edit.vue'));
  });
};

const routeAnggaran = {
  path: 'jenis-anggaran',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    requiresUser: true,
    requiresAdmin: true,
  },
  children: [
    {
      path: '',
      name: 'master-ref-jenis-anggaran',
      component: MasterRefJenisAnggaran,
    },
    {
      path: 'create',
      name: 'master-create-ref-jenis-anggaran',
      component: MasterCreateRefJenisAnggaran,
    },
    {
      path: ':idJenisAnggaran/edit',
      name: 'master-edit-ref-jenis-anggaran',
      component: MasterEditRefJenisAnggaran,
      props: true
    }
  ]
}

export default routeAnggaran;