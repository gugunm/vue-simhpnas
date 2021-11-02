// const TindakLanjut = () => import('@/views/modules/tindakLanjut/index.vue')
const TindakLanjut = resolve => {
  require.ensure(['@/views/modules/tindakLanjut/index.vue'], () => {
      resolve(require('@/views/modules/tindakLanjut/index.vue'));
  });
};
// const TindakLanjutCreate = () => import('@/views/modules/tindakLanjut/Create.vue')
const TindakLanjutCreate = resolve => {
  require.ensure(['@/views/modules/tindakLanjut/Create.vue'], () => {
      resolve(require('@/views/modules/tindakLanjut/Create.vue'));
  });
};
// const TindakLanjutDetail = () => import('@/views/modules/tindakLanjut/Detail.vue')
const TindakLanjutDetail = resolve => {
  require.ensure(['@/views/modules/tindakLanjut/Detail.vue'], () => {
      resolve(require('@/views/modules/tindakLanjut/Detail.vue'));
  });
};
// const TindakLanjutEdit = () => import('@/views/modules/tindakLanjut/Edit.vue')
const TindakLanjutEdit = resolve => {
  require.ensure(['@/views/modules/tindakLanjut/Edit.vue'], () => {
      resolve(require('@/views/modules/tindakLanjut/Edit.vue'));
  });
};


const routeModTindakLanjut = {
  path: 'tindak-lanjut',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [2, 3, 4, 5, 6],
  },
  children: [
    {
      path: '',
      name: 'module-tindak-lanjut',
      component: TindakLanjut,
      meta: {
        requiresUser: true,
        reload: true,
      },
    },
    {
      path: 'create',
      name: 'module-create-tindak-lanjut',
      component: TindakLanjutCreate,
      meta: {
        requiresUser: true
      },
    },
    {
      path: ':idTindakLanjut',
      name: 'module-detail-tindak-lanjut',
      component: TindakLanjutDetail,
      meta: {
        requiresUser: true
      },
      props: true
    },
    {
      path: ':idTindakLanjut/edit',
      name: 'module-edit-tindak-lanjut',
      component: TindakLanjutEdit,
      meta: {
        requiresUser: true
      },
      props:true
    }
  ]
}


export default routeModTindakLanjut