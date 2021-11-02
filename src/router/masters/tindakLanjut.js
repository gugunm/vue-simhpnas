// TINDAK LANJUT
// const MasterTindakLanjut = () => import('@/views/masters/mTindakLanjut/tindakLanjut')
const MasterTindakLanjut = resolve => {
  require.ensure(['@/views/masters/mTindakLanjut/tindakLanjut'], () => {
      resolve(require('@/views/masters/mTindakLanjut/tindakLanjut'));
  });
};
// const MasterCreateTindakLanjut = () => import('@/views/masters/mTindakLanjut/tindakLanjut/Create.vue')
const MasterCreateTindakLanjut = resolve => {
  require.ensure(['@/views/masters/mTindakLanjut/tindakLanjut/Create.vue'], () => {
      resolve(require('@/views/masters/mTindakLanjut/tindakLanjut/Create.vue'));
  });
};
// const MasterEditTindakLanjut = () => import('@/views/masters/mTindakLanjut/tindakLanjut/Edit.vue')
const MasterEditTindakLanjut = resolve => {
  require.ensure(['@/views/masters/mTindakLanjut/tindakLanjut/Edit.vue'], () => {
      resolve(require('@/views/masters/mTindakLanjut/tindakLanjut/Edit.vue'));
  });
};
// SUB TINDAK LANJUT
// const MasterSubTindakLanjut = () => import('@/views/masters/mTindakLanjut/subTindakLanjut')
const MasterSubTindakLanjut = resolve => {
  require.ensure(['@/views/masters/mTindakLanjut/subTindakLanjut'], () => {
      resolve(require('@/views/masters/mTindakLanjut/subTindakLanjut'));
  });
};
// const MasterCreateSubTindakLanjut = () => import('@/views/masters/mTindakLanjut/subTindakLanjut/Create.vue')
const MasterCreateSubTindakLanjut = resolve => {
  require.ensure(['@/views/masters/mTindakLanjut/subTindakLanjut/Create.vue'], () => {
      resolve(require('@/views/masters/mTindakLanjut/subTindakLanjut/Create.vue'));
  });
};
// const MasterEditSubTindakLanjut = () => import('@/views/masters/mTindakLanjut/subTindakLanjut/Edit.vue')
const MasterEditSubTindakLanjut = resolve => {
  require.ensure(['@/views/masters/mTindakLanjut/subTindakLanjut/Edit.vue'], () => {
      resolve(require('@/views/masters/mTindakLanjut/subTindakLanjut/Edit.vue'));
  });
};


const routeTindakLanjut = {
  path: 'master-tindak-lanjut',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [0, 1, 3, 4],
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