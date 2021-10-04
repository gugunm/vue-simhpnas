const Tim = () => import('@/views/modules/tim/index.vue')
const TimCreate = () => import('@/views/modules/tim/Create.vue')
const TimDetail = () => import('@/views/modules/tim/Detail.vue')
const TimEdit = () => import('@/views/modules/tim/Edit.vue')


const routeModTim = {
  path: 'tim-audit',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'module-tim',
      component: Tim,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'module-create-tim',
      component: TimCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idTim',
      name: 'module-detail-tim',
      component: TimDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idTim/edit',
      name: 'module-edit-tim',
      component: TimEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}


export default routeModTim