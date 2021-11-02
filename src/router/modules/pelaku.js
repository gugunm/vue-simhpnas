// const Pelaku = () => import('@/views/modules/pelaku/index.vue')
const Pelaku = resolve => {
  require.ensure(['@/views/modules/pelaku/index.vue'], () => {
      resolve(require('@/views/modules/pelaku/index.vue'));
  });
};
// const PelakuCreate = () => import('@/views/modules/pelaku/Create.vue')
const PelakuCreate = resolve => {
  require.ensure(['@/views/modules/pelaku/Create.vue'], () => {
      resolve(require('@/views/modules/pelaku/Create.vue'));
  });
};
// const PelakuEdit = () => import('@/views/modules/pelaku/Edit.vue')
const PelakuEdit = resolve => {
  require.ensure(['@/views/modules/pelaku/Edit.vue'], () => {
      resolve(require('@/views/modules/pelaku/Edit.vue'));
  });
};
// const PelakuDetail = () => import('@/views/modules/pelaku/Detail.vue')
const PelakuDetail = resolve => {
  require.ensure(['@/views/modules/pelaku/Detail.vue'], () => {
      resolve(require('@/views/modules/pelaku/Detail.vue'));
  });
};


const routeModPelaku = {
  path: 'pelaku',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [3, 4],
  },
  children: [
    {
      path: '',
      name: 'module-pelaku',
      component: Pelaku,
      meta: {
        requiresUser: true,
        reload: true,
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