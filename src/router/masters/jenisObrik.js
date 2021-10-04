
// JENIS OBRIK
const MasterRefJenisObrik = () => import('@/views/masters/mReferensi/refJenisObrik/index.vue')
const MasterCreateRefJenisObrik = () => import('@/views/masters/mReferensi/refJenisObrik/Create.vue')
const MasterEditRefJenisObrik = () => import('@/views/masters/mReferensi/refJenisObrik/Edit.vue')

const routeJenisObrik = {
  path: 'jenis-obrik',
  component: {
    render(c) { return c('router-view') }
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