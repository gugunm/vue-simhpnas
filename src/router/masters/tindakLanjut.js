// TINDAK LANJUT
const MasterTindakLanjut = () => import('@/views/masters/mTindakLanjut/tindakLanjut')
const MasterCreateTindakLanjut = () => import('@/views/masters/mTindakLanjut/tindakLanjut/Create.vue')
const MasterEditTindakLanjut = () => import('@/views/masters/mTindakLanjut/tindakLanjut/Edit.vue')

// SUB TINDAK LANJUT
const MasterSubTindakLanjut = () => import('@/views/masters/mTindakLanjut/subTindakLanjut')
const MasterCreateSubTindakLanjut = () => import('@/views/masters/mTindakLanjut/subTindakLanjut/Create.vue')
const MasterEditSubTindakLanjut = () => import('@/views/masters/mTindakLanjut/subTindakLanjut/Edit.vue')


const routeTindakLanjut = {
  path: 'master-tindak-lanjut',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    // MasterCreateTindakLanjut
    // MasterEditTindakLanjut
    {
      path: '',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path:'',
          name: 'master-tl',
          component: MasterTindakLanjut,
          meta: {
            requiresUser: true
          }
        },
        {
          path:'create',
          name: 'master-create-tl',
          component: MasterCreateTindakLanjut,
          meta: {
            requiresUser: true
          }
        },
        {
          path:':idKlpTindakLanjut/edit',
          name: 'master-edit-tl',
          component: MasterEditTindakLanjut,
          meta: {
            requiresUser: true
          },
          props: true
        }
      ]
    },
    // MasterCreateSubTindakLanjut
    // MasterEditSubTindakLanjut
    {
      path: ':idKlpTindakLanjut',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'master-sub-tl',
          component: MasterSubTindakLanjut,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path: 'create',
          name: 'master-create-sub-tl',
          component: MasterCreateSubTindakLanjut,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path: ':idSubKlpTindakLanjut/edit',
          name: 'master-edit-sub-tl',
          component: MasterEditSubTindakLanjut,
          meta: {
            requiresUser: true
          },
          props: true,
        }
      ]
    },
  ]
}

export default routeTindakLanjut;