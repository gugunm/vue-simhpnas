const Pelaku = () => import('@/views/modules/pelaku/index.vue')
const PelakuCreate = () => import('@/views/modules/pelaku/Create.vue')
const PelakuEdit = () => import('@/views/modules/pelaku/Edit.vue')
const PelakuDetail = () => import('@/views/modules/pelaku/Detail.vue')


const routeModPelaku = {
  path: 'pelaku',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'module-pelaku',
      component: Pelaku,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'module-create-pelaku',
      component: PelakuCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idPelaku',
      name: 'module-detail-pelaku',
      component: PelakuDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idPelaku/edit',
      name: 'module-edit-pelaku',
      component: PelakuEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}


export default routeModPelaku;