// PENYEBAB
const MasterPenyebab = () => import('@/views/masters/mPenyebab/index.vue')
const MasterCreatePenyebab = () => import('@/views/masters/mPenyebab/Create.vue')
const MasterEditPenyebab = () => import('@/views/masters/mPenyebab/Edit.vue')

const routePenyebab = {
  path: 'master-penyebab',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'master-penyebab',
      component: MasterPenyebab,
      meta: {
        requiresUser: true
      },
    },
    {
      path: 'create',
      name: 'master-create-penyebab',
      component: MasterCreatePenyebab,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idPenyebab/edit',
      name: 'master-edit-penyebab',
      component: MasterEditPenyebab,
      meta: {
        requiresUser: true
      },
      props: true
    }
  ]
}

export default routePenyebab;