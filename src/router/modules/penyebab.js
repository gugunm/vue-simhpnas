// const Penyebab = () => import('@/views/modules/penyebab/index.vue')
const Penyebab = resolve => {
  require.ensure(['@/views/modules/penyebab/index.vue'], () => {
      resolve(require('@/views/modules/penyebab/index.vue'));
  });
};
// const PenyebabCreate = () => import('@/views/modules/penyebab/Create.vue')
const PenyebabCreate = resolve => {
  require.ensure(['@/views/modules/penyebab/Create.vue'], () => {
      resolve(require('@/views/modules/penyebab/Create.vue'));
  });
};
// const PenyebabEdit = () => import('@/views/modules/penyebab/Edit.vue')
const PenyebabEdit = resolve => {
  require.ensure(['@/views/modules/penyebab/Edit.vue'], () => {
      resolve(require('@/views/modules/penyebab/Edit.vue'));
  });
};
// const PenyebabDetail = () => import('@/views/modules/penyebab/Detail.vue')
const PenyebabDetail = resolve => {
  require.ensure(['@/views/modules/penyebab/Detail.vue'], () => {
      resolve(require('@/views/modules/penyebab/Detail.vue'));
  });
};


const routeModPenyebab =  {
  path: 'penyebab',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [3, 4],
  },
  children: [
    {
      path: '',
      name: 'module-penyebab',
      component: Penyebab,
      meta: {
        requiresUser: true,
        reload: true,
      },
    },
    {
      path: 'create',
      name: 'module-create-penyebab',
      component: PenyebabCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idPenyebab',
      name: 'module-detail-penyebab',
      component: PenyebabDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idPenyebab/edit',
      name: 'module-edit-penyebab',
      component: PenyebabEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}


export default routeModPenyebab