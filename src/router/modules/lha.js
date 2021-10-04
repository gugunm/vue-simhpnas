const Lha = () => import('@/views/modules/lha/index.vue')
const LhaCreate = () => import('@/views/modules/lha/Create.vue')
const LhaEdit = () => import('@/views/modules/lha/Edit.vue')
const LhaDetail = () => import('@/views/modules/lha/Detail.vue')


const routeModLha = {
  path: 'lha',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'module-lha',
      component: Lha,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'module-create-lha',
      component: LhaCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idLha',
      name: 'module-detail-lha',
      component: LhaDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idLha/edit',
      name: 'module-edit-lha',
      component: LhaEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}

export default routeModLha;