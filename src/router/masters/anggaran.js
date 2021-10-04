const MasterRefJenisAnggaran = () => import('@/views/masters/mReferensi/refJenisAnggaran/index.vue')
const MasterCreateRefJenisAnggaran = () => import('@/views/masters/mReferensi/refJenisAnggaran/Create.vue')
const MasterEditRefJenisAnggaran = () => import('@/views/masters/mReferensi/refJenisAnggaran/Edit.vue')

const routeAnggaran = {
  path: 'jenis-anggaran',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'master-ref-jenis-anggaran',
      component: MasterRefJenisAnggaran,
      meta: {
        requiresUser: true
      }
    },
    {
      path: 'create',
      name: 'master-create-ref-jenis-anggaran',
      component: MasterCreateRefJenisAnggaran,
      meta: {
        requiresUser: true
      }
    },
    {
      path: ':idJenisAnggaran/edit',
      name: 'master-edit-ref-jenis-anggaran',
      component: MasterEditRefJenisAnggaran,
      meta: {
        requiresUser: true
      },
      props: true
    }
  ]
}

export default routeAnggaran;