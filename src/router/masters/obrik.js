// UNIT OBRIK
// const MasterRefUnitObrik = () => import('@/views/masters/mReferensi/refObrik/unitObrik/index.vue')
const MasterRefUnitObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/unitObrik/index.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/unitObrik/index.vue'));
  });
};
// const MasterCreateRefUnitObrik = () => import('@/views/masters/mReferensi/refObrik/unitObrik/Create.vue')
const MasterCreateRefUnitObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/unitObrik/Create.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/unitObrik/Create.vue'));
  });
};
// const MasterEditRefUnitObrik = () => import('@/views/masters/mReferensi/refObrik/unitObrik/Edit.vue')
const MasterEditRefUnitObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/unitObrik/Edit.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/unitObrik/Edit.vue'));
  });
};

// UNIT BIDANG OBRIK
// const MasterRefBidangObrik = () => import('@/views/masters/mReferensi/refObrik/bidangObrik/index.vue')
const MasterRefBidangObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/bidangObrik/index.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/bidangObrik/index.vue'));
  });
};
// const MasterCreateRefBidangObrik = () => import('@/views/masters/mReferensi/refObrik/bidangObrik/Create.vue')
const MasterCreateRefBidangObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/bidangObrik/Create.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/bidangObrik/Create.vue'));
  });
};
// const MasterEditRefBidangObrik = () => import('@/views/masters/mReferensi/refObrik/bidangObrik/Edit.vue')
const MasterEditRefBidangObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/bidangObrik/Edit.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/bidangObrik/Edit.vue'));
  });
};

// UNIT SUB BIDANG OBRIK
// const MasterRefSubBidangObrik = () => import('@/views/masters/mReferensi/refObrik/subBidangObrik/index.vue')
const MasterRefSubBidangObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/subBidangObrik/index.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/subBidangObrik/index.vue'));
  });
};
// const MasterCreateRefSubBidangObrik = () => import('@/views/masters/mReferensi/refObrik/subBidangObrik/Create.vue')
const MasterCreateRefSubBidangObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/subBidangObrik/Create.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/subBidangObrik/Create.vue'));
  });
};
// const MasterEditRefSubBidangObrik = () => import('@/views/masters/mReferensi/refObrik/subBidangObrik/Edit.vue')
const MasterEditRefSubBidangObrik = resolve => {
  require.ensure(['@/views/masters/mReferensi/refObrik/subBidangObrik/Edit.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refObrik/subBidangObrik/Edit.vue'));
  });
};


const routeObrik = {
  path: 'obrik',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    // Master Ref Obrik
    {
      path: '',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'master-ref-obrik',
          component: MasterRefUnitObrik,
          meta: {
            requiresUser: true
          },
        },
        {
          path: 'create',
          name: 'master-create-ref-obrik',
          component: MasterCreateRefUnitObrik,
          meta: {
            requiresUser: true
          },
        },
        {
          path: ':idUnitObrik/edit',
          name: 'master-edit-ref-obrik',
          component: MasterEditRefUnitObrik,
          meta: {
            requiresUser: true
          },
          props: true
        }
      ]
    },
    // Master Ref Bidang Obrik
    {
      path: 'bidang-obrik/:idUnitObrik',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'master-ref-bidang-obrik',
          component: MasterRefBidangObrik,
          meta: {
            requiresUser: true
          },
          props: true
        },
        {
          path: 'create',
          name: 'master-create-ref-bidang-obrik',
          component: MasterCreateRefBidangObrik,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path: ':idBidangObrik/edit',
          name: 'master-edit-ref-bidang-obrik',
          component: MasterEditRefBidangObrik,
          meta: {
            requiresUser: true
          },
          props: true
        }
      ]
    },
    // Master Ref Sub Bidang Obrik
    {
      path: 'sub-bidang-obrik/:idBidangObrik',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'master-ref-sub-bidang-obrik',
          component: MasterRefSubBidangObrik,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path: 'create',
          name: 'master-create-ref-sub-bidang-obrik',
          component: MasterCreateRefSubBidangObrik,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path: ':idSubBidangObrik/edit',
          name: 'master-edit-ref-sub-bidang-obrik',
          component: MasterEditRefSubBidangObrik,
          meta: {
            requiresUser: true
          },
          props: true,
        }
      ]
    },
  ]
}


export default routeObrik;