// TEMUAN
const MasterTemuan = () => import('@/views/masters/mTemuan/jenisTemuan/index.vue')
const MasterCreateTemuan = () => import('@/views/masters/mTemuan/jenisTemuan/Create.vue')
const MasterEditTemuan = () => import('@/views/masters/mTemuan/jenisTemuan/Edit.vue')

// KLP TEMUAN
const MasterKlpTemuan = () => import('@/views/masters/mTemuan/klpTemuan/index.vue')
const MasterCreateKlpTemuan = () => import('@/views/masters/mTemuan/klpTemuan/Create.vue')
const MasterEditKlpTemuan = () => import('@/views/masters/mTemuan/klpTemuan/Edit.vue')

// SUB KLP TEMUAN
const MasterSubKlpTemuan = () => import('@/views/masters/mTemuan/subKlpTemuan/index.vue')
const MasterCreateSubKlpTemuan = () => import('@/views/masters/mTemuan/subKlpTemuan/Create.vue')
const MasterEditSubKlpTemuan = () => import('@/views/masters/mTemuan/subKlpTemuan/Edit.vue')


const routeRootTemuan = {
  path: 'master-temuan',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'master-temuan',
      component: MasterTemuan,
      meta: {
        requiresUser: true
      }
    },
    {
      path: 'create',
      name: 'master-create-temuan',
      component: MasterCreateTemuan,
      meta: {
        requiresUser: true
      }
    },
    {
      path: ':idJenisTemuan/edit',
      name: 'master-edit-temuan',
      component: MasterEditTemuan,
      meta: {
        requiresUser: true
      },
      props: true
    }
  ]
}

const routeKlpTemuan = {
  path: 'master-kelompok-temuan/:idJenisTemuan',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'mkelompoktemuan',
      component: MasterKlpTemuan,
      meta: {
        requiresUser: true
      },
      props: true,
    },
    {
      path: 'create',
      name: 'master-create-klp-temuan',
      component: MasterCreateKlpTemuan,
      meta: {
        requiresUser: true
      },
      props: true,
    },
    {
      path: ':idKlpTemuan/edit',
      name: 'master-edit-klp-temuan',
      component: MasterEditKlpTemuan,
      meta: {
        requiresUser: true
      },
      props: true,
    }
  ]
}


const routeSubKlpTemuan = {
  path: 'master-sub-kelompok-temuan/:idKlpTemuan',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      name: 'msubkelompoktemuan',
      component: MasterSubKlpTemuan,
      meta: {
        requiresUser: true
      },
      props: true,
    },
    {
      path: 'create',
      name: 'master-create-sub-klp-temuan',
      component: MasterCreateSubKlpTemuan,
      meta: {
        requiresUser: true
      },
      props: true,
    },
    {
      path: ':idSubKlpTemuan/edit',
      name: 'master-edit-sub-klp-temuan',
      component: MasterEditSubKlpTemuan,
      meta: {
        requiresUser: true
      },
      props: true,
    }
  ]
}

const routeTemuan = {
  routeRootTemuan,
  routeKlpTemuan,
  routeSubKlpTemuan
};


export default routeTemuan