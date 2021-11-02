
// JENIS OBRIK
// const MasterRefJenisObrik = () => import('@/views/masters/mReferensi/refJenisObrik/index.vue')
const MasterRefJenisObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJenisObrik/index.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJenisObrik/index.vue'));
  });
};
// const MasterCreateRefJenisObrik = () => import('@/views/masters/mReferensi/refJenisObrik/Create.vue')
const MasterCreateRefJenisObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJenisObrik/Create.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJenisObrik/Create.vue'));
  });
};
// const MasterEditRefJenisObrik = () => import('@/views/masters/mReferensi/refJenisObrik/Edit.vue')
const MasterEditRefJenisObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refJenisObrik/Edit.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refJenisObrik/Edit.vue'));
  });
};

const routeJenisObrik = {
  path: 'jenis-obrik',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [0, 1, 3, 4],
  },
  children: [
    {
      path:'',
      name: 'master-ref-jenis-obrik',
      component: MasterRefJenisObrik,
      meta: {
        requiresUser: true
      }
    },
    {
      path:'create',
      name: 'master-create-ref-jenis-obrik',
      component: MasterCreateRefJenisObrik,
      meta: {
        requiresUser: true
      }
    },
    {
      path:':idJenisObrik/edit',
      name: 'master-edit-ref-jenis-obrik',
      component: MasterEditRefJenisObrik,
      meta: {
        requiresUser: true
      },
      props: true
    }
  ]
}

export default routeJenisObrik;