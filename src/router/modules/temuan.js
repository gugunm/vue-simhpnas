const Temuan = () => import('@/views/modules/temuan/index.vue')
const TemuanCreate = () => import('@/views/modules/temuan/Create.vue')
const TemuanDetail = () => import('@/views/modules/temuan/Detail.vue')
const TemuanEdit = () => import('@/views/modules/temuan/Edit.vue')

const routeModTemuan = {
  path: 'temuan',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'module-temuan',
      component: Temuan,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'module-create-temuan',
      component: TemuanCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idTemuan',
      name: 'module-detail-temuan',
      component: TemuanDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idTemuan/edit',
      name: 'module-edit-temuan',
      component: TemuanEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}


export default routeModTemuan;