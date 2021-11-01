// REKOMENDASI
// const MasterRekomendasi = () => import('@/views/masters/mRekomendasi/rekomendasi/index.vue')
const MasterRekomendasi = resolve => {
  require.ensure(['@/views/masters/mRekomendasi/rekomendasi/index.vue'], () => {
      resolve(require('@/views/masters/mRekomendasi/rekomendasi/index.vue'));
  });
};
// const MasterCreateRekomendasi = () => import('@/views/masters/mRekomendasi/rekomendasi/Create.vue')
const MasterCreateRekomendasi = resolve => {
  require.ensure(['@/views/masters/mRekomendasi/rekomendasi/Create.vue'], () => {
      resolve(require('@/views/masters/mRekomendasi/rekomendasi/Create.vue'));
  });
};
// const MasterEditRekomendasi = () => import('@/views/masters/mRekomendasi/rekomendasi/Edit.vue')
const MasterEditRekomendasi = resolve => {
  require.ensure(['@/views/masters/mRekomendasi/rekomendasi/Edit.vue'], () => {
      resolve(require('@/views/masters/mRekomendasi/rekomendasi/Edit.vue'));
  });
};
// SUB REKOMENDASI
// const MasterSubRekomendasi = () => import('@/views/masters/mRekomendasi/subRekomendasi/index.vue')
const MasterSubRekomendasi = resolve => {
  require.ensure(['@/views/masters/mRekomendasi/subRekomendasi/index.vue'], () => {
      resolve(require('@/views/masters/mRekomendasi/subRekomendasi/index.vue'));
  });
};
// const MasterCreateSubRekomendasi = () => import('@/views/masters/mRekomendasi/subRekomendasi/Create.vue')
const MasterCreateSubRekomendasi = resolve => {
  require.ensure(['@/views/masters/mRekomendasi/subRekomendasi/Create.vue'], () => {
      resolve(require('@/views/masters/mRekomendasi/subRekomendasi/Create.vue'));
  });
};
// const MasterEditSubRekomendasi = () => import('@/views/masters/mRekomendasi/subRekomendasi/Edit.vue')
const MasterEditSubRekomendasi = resolve => {
  require.ensure(['@/views/masters/mRekomendasi/subRekomendasi/Edit.vue'], () => {
      resolve(require('@/views/masters/mRekomendasi/subRekomendasi/Edit.vue'));
  });
};


const routeRekomendasi = {
  path: 'master-rekomendasi',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    // MasterCreateRekomendasi
    // MasterEditRekomendasi
    {
      path: '',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'master-klp-rekomendasi',
          component: MasterRekomendasi,
          meta: {
            requiresUser: true
          },
        },
        {
          path: 'create',
          name: 'master-create-klp-rekomendasi',
          component: MasterCreateRekomendasi,
          meta: {
            requiresUser: true
          },
        },
        {
          path: ':idKlpRekomendasi/edit',
          name: 'master-edit-klp-rekomendasi',
          component: MasterEditRekomendasi,
          meta: {
            requiresUser: true
          },
          props: true
        }
      ]
    },
    // MasterCreateSubRekomendasi
    // MasterEditSubRekomendasi
    {
      path: ':idKlpRekomendasi',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path:'',
          name: 'master-sub-klp-rekomendasi',
          component: MasterSubRekomendasi,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path:'create',
          name: 'master-create-sub-klp-rekomendasi',
          component: MasterCreateSubRekomendasi,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path:':idSubKlpRekomendasi/edit',
          name: 'master-edit-sub-klp-rekomendasi',
          component: MasterEditSubRekomendasi,
          meta: {
            requiresUser: true
          },
          props: true,
        }
      ]
    }
  ]
}


export default routeRekomendasi;