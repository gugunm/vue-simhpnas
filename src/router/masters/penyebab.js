// PENYEBAB
// const MasterPenyebab = () => import('@/views/masters/mPenyebab/index.vue')
const MasterPenyebab = resolve => {
  require.ensure(['@/views/masters/mPenyebab/index.vue'], () => {
      resolve(require('@/views/masters/mPenyebab/index.vue'));
  });
};
// const MasterCreatePenyebab = () => import('@/views/masters/mPenyebab/Create.vue')
const MasterCreatePenyebab = resolve => {
  require.ensure(['@/views/masters/mPenyebab/Create.vue'], () => {
      resolve(require('@/views/masters/mPenyebab/Create.vue'));
  });
};
// const MasterEditPenyebab = () => import('@/views/masters/mPenyebab/Edit.vue')
const MasterEditPenyebab = resolve => {
  require.ensure(['@/views/masters/mPenyebab/Edit.vue'], () => {
      resolve(require('@/views/masters/mPenyebab/Edit.vue'));
  });
};

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