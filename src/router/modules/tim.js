// const Tim = () => import('@/views/modules/tim/index.vue')
const Tim = resolve => {
  require.ensure(['@/views/modules/tim/index.vue'], () => {
      resolve(require('@/views/modules/tim/index.vue'));
  });
};
// const TimCreate = () => import('@/views/modules/tim/Create.vue')
const TimCreate = resolve => {
  require.ensure(['@/views/modules/tim/Create.vue'], () => {
      resolve(require('@/views/modules/tim/Create.vue'));
  });
};
// const TimDetail = () => import('@/views/modules/tim/Detail.vue')
const TimDetail = resolve => {
  require.ensure(['@/views/modules/tim/Detail.vue'], () => {
      resolve(require('@/views/modules/tim/Detail.vue'));
  });
};
// const TimEdit = () => import('@/views/modules/tim/Edit.vue')
const TimEdit = resolve => {
  require.ensure(['@/views/modules/tim/Edit.vue'], () => {
      resolve(require('@/views/modules/tim/Edit.vue'));
  });
};


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
        requiresUser: true,
        reload: true,
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