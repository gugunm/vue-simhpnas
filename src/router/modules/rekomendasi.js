// const Rekomendasi = () => import('@/views/modules/rekomendasi/index.vue')
const Rekomendasi = resolve => {
  require.ensure(['@/views/modules/rekomendasi/index.vue'], () => {
      resolve(require('@/views/modules/rekomendasi/index.vue'));
  });
};
// const RekomendasiCreate = () => import('@/views/modules/rekomendasi/Create.vue')
const RekomendasiCreate = resolve => {
  require.ensure(['@/views/modules/rekomendasi/Create.vue'], () => {
      resolve(require('@/views/modules/rekomendasi/Create.vue'));
  });
};
// const RekomendasiDetail = () => import('@/views/modules/rekomendasi/Detail.vue')
const RekomendasiDetail = resolve => {
  require.ensure(['@/views/modules/rekomendasi/Detail.vue'], () => {
      resolve(require('@/views/modules/rekomendasi/Detail.vue'));
  });
};
// const RekomendasiEdit = () => import('@/views/modules/rekomendasi/Edit.vue')
const RekomendasiEdit = resolve => {
  require.ensure(['@/views/modules/rekomendasi/Edit.vue'], () => {
      resolve(require('@/views/modules/rekomendasi/Edit.vue'));
  });
};


const routeModRekomendasi = {
  path: 'rekomendasi',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'module-rekomendasi',
      component: Rekomendasi,
      meta: {
        requiresUser: true,
        reload: true,
      },
    },
    {
      path: 'create',
      name: 'module-create-rekomendasi',
      component: RekomendasiCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idRekomendasi',
      name: 'module-detail-rekomendasi',
      component: RekomendasiDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idRekomendasi/edit',
      name: 'module-edit-rekomendasi',
      component: RekomendasiEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}

export default routeModRekomendasi