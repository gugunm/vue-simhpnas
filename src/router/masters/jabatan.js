const MasterRefJabatan = () => import('@/views/masters/mReferensi/refJabatan/index.vue')
const MasterCreateRefJabatan = () => import('@/views/masters/mReferensi/refJabatan/Create.vue')
const MasterEditRefJabatan = () => import('@/views/masters/mReferensi/refJabatan/Edit.vue')

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