const TindakLanjut = () => import('@/views/modules/tindakLanjut/index.vue')
const TindakLanjutCreate = () => import('@/views/modules/tindakLanjut/Create.vue')
const TindakLanjutDetail = () => import('@/views/modules/tindakLanjut/Detail.vue')
const TindakLanjutEdit = () => import('@/views/modules/tindakLanjut/Edit.vue')


const routeModTindakLanjut = {
  path: 'tindak-lanjut',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'module-tindak-lanjut',
      component: TindakLanjut,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'module-create-tindak-lanjut',
      component: TindakLanjutCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idTindakLanjut',
      name: 'module-detail-tindak-lanjut',
      component: TindakLanjutDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idTindakLanjut/edit',
      name: 'module-edit-tindak-lanjut',
      component: TindakLanjutEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}


export default routeModTindakLanjut