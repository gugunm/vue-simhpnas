// const Lha = () => import('@/views/modules/lha/index.vue')
const Lha = resolve => {
  require.ensure(['@/views/modules/lha/index.vue'], () => {
      resolve(require('@/views/modules/lha/index.vue'));
  });
};
// const LhaCreate = () => import('@/views/modules/lha/Create.vue')
const LhaCreate = resolve => {
  require.ensure(['@/views/modules/lha/Create.vue'], () => {
      resolve(require('@/views/modules/lha/Create.vue'));
  });
};
// const LhaEdit = () => import('@/views/modules/lha/Edit.vue')
const LhaEdit = resolve => {
  require.ensure(['@/views/modules/lha/Edit.vue'], () => {
      resolve(require('@/views/modules/lha/Edit.vue'));
  });
};
// const LhaDetail = () => import('@/views/modules/lha/Detail.vue')
const LhaDetail = resolve => {
  require.ensure(['@/views/modules/lha/Detail.vue'], () => {
      resolve(require('@/views/modules/lha/Detail.vue'));
  });
};


const routeModLha = {
  path: 'lha',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [2, 3, 4, 5, 6],
  },
  children: [
    {
      path: '',
      name: 'module-lha',
      component: Lha,
      meta: {
        requiresUser: true,
        reload: true,
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