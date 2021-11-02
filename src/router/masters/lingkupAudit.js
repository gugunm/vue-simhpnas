// GROUP LINGKUP AUDIT
// const MasterRefGroupLingkupAudit = () => import('@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/index.vue')
const MasterRefGroupLingkupAudit = resolve => {
  require.ensure(['@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/index.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/index.vue'));
  });
};
// const MasterCreateRefGroupLingkupAudit = () => import('@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/Create')
const MasterCreateRefGroupLingkupAudit = resolve => {
  require.ensure(['@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/Create'], () => {
      resolve(require('@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/Create'));
  });
};
// const MasterEditRefGroupLingkupAudit = () => import('@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/Edit.vue')
const MasterEditRefGroupLingkupAudit = resolve => {
  require.ensure(['@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/Edit.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit/Edit.vue'));
  });
};

// LINGKUP AUDIT
// const MasterRefLingkupAudit = () => import('@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/index.vue')
const MasterRefLingkupAudit = resolve => {
  require.ensure(['@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/index.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/index.vue'));
  });
};
// const MasterCreateRefLingkupAudit = () => import('@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/Create.vue')
const MasterCreateRefLingkupAudit = resolve => {
  require.ensure(['@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/Create.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/Create.vue'));
  });
};
// const MasterEditRefLingkupAudit = () => import('@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/Edit.vue')
const MasterEditRefLingkupAudit = resolve => {
  require.ensure(['@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/Edit.vue'], () => {
      resolve(require('@/views/masters/mReferensi/refLingkupAudit/lingkupAudit/Edit.vue'));
  });
};

const routeLingkupAudit = {
  path: 'lingkup-audit',
  component: {
    render(c) { return c('router-view') }
  },
  meta: {
    allowedUser: [0, 1, 3, 4],
  },
  children: [
    {
      path: '',
      component: {
        render(c) { return c('router-view') }
      },
      // MasterCreateRefGroupLingkupAudit
      // MasterEditRefGroupLingkupAudit
      children: [
        {
          path: '',
          name: 'master-ref-group-lingkup-audit',
          component: MasterRefGroupLingkupAudit,
          meta: {
            requiresUser: true
          },
        },
        {
          path: 'create',
          name: 'master-create-ref-group-lingkup-audit',
          component: MasterCreateRefGroupLingkupAudit,
          meta: {
            requiresUser: true
          },
        },
        {
          path: ':idGroupLingkupAudit/edit',
          name: 'master-edit-ref-group-lingkup-audit',
          component: MasterEditRefGroupLingkupAudit,
          meta: {
            requiresUser: true
          },
          props: true
        }
      ]
    },
    {
      path: ':idGroupLingkupAudit',
      component: {
        render(c) { return c('router-view') }
      },
      // MasterCreateRefLingkupAudit
      // MasterEditRefLingkupAudit
      children: [
        {
          path: '',
          name: 'master-ref-lingkup-audit',
          component: MasterRefLingkupAudit,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path: 'create',
          name: 'master-create-ref-lingkup-audit',
          component: MasterCreateRefLingkupAudit,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path: ':idLingkupAudit/edit',
          name: 'master-edit-ref-lingkup-audit',
          component: MasterEditRefLingkupAudit,
          meta: {
            requiresUser: true
          },
          props: true,
        },
      ]
    }
  ]
}

export default routeLingkupAudit;