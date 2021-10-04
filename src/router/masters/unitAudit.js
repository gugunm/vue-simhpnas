// UNIT AUDIT
const MasterRefUnitAudit = () => import('@/views/masters/mReferensi/refUnitAudit/unitAudit/index.vue')
const MasterCreateRefUnitAudit = () => import('@/views/masters/mReferensi/refUnitAudit/unitAudit/Create.vue')
const MasterEditRefUnitAudit = () => import('@/views/masters/mReferensi/refUnitAudit/unitAudit/Edit.vue')

// SUB UNIT AUDIT
const MasterRefSubUnitAudit = () => import('@/views/masters/mReferensi/refUnitAudit/subUnitAudit/index.vue')
const MasterCreateRefSubUnitAudit = () => import('@/views/masters/mReferensi/refUnitAudit/subUnitAudit/Create.vue')
const MasterEditRefSubUnitAudit = () => import('@/views/masters/mReferensi/refUnitAudit/subUnitAudit/Edit.vue')


const routeUnitAudit = {
  path: 'unit-audit',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    // MasterCreateRefUnitAudit
    // MasterEditRefUnitAudit
    {
      path: '',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'master-ref-unit-audit',
          component: MasterRefUnitAudit,
          meta: {
            requiresUser: true
          },
        },
        {
          path: 'create',
          name: 'master-create-ref-unit-audit',
          component: MasterCreateRefUnitAudit,
          meta: {
            requiresUser: true
          },
        },
        {
          path: ':idUnitAudit/edit',
          name: 'master-edit-ref-unit-audit',
          component: MasterEditRefUnitAudit,
          meta: {
            requiresUser: true
          },
          props: true
        }
      ]
    },
    // MasterCreateRefSubUnitAudit
    // MasterEditRefSubUnitAudit
    {
      path: ':idUnitAudit',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'master-ref-sub-unit-audit',
          component: MasterRefSubUnitAudit,
          meta: {
            requiresUser: true
          },
          props: true
        },
        {
          path: 'create',
          name: 'master-create-ref-sub-unit-audit',
          component: MasterCreateRefSubUnitAudit,
          meta: {
            requiresUser: true
          },
          props: true,
        },
        {
          path: ':idSubUnitAudit/edit',
          name: 'master-edit-ref-sub-unit-audit',
          component: MasterEditRefSubUnitAudit,
          meta: {
            requiresUser: true
          },
          props: true
        },
      ]
    }
  ]
}

export default routeUnitAudit