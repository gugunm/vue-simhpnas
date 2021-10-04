const Rekomendasi = () => import('@/views/modules/rekomendasi/index.vue')
const RekomendasiCreate = () => import('@/views/modules/rekomendasi/Create.vue')
const RekomendasiDetail = () => import('@/views/modules/rekomendasi/Detail.vue')
const RekomendasiEdit = () => import('@/views/modules/rekomendasi/Edit.vue')


const routeModRekomendasi = {
  path: 'rekomendasi',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'module-rekomendasi',
      component: Rekomendasi,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'module-create-rekomendasi',
      component: RekomendasiCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idRekomendasi',
      name: 'module-detail-rekomendasi',
      component: RekomendasiDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idRekomendasi/edit',
      name: 'module-edit-rekomendasi',
      component: RekomendasiEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}

export default routeModRekomendasi