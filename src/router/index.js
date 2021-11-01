import Vue from 'vue'
import Router from 'vue-router'

// +++++ ROUTE SETTINGS +++++
import routeCoreUiSetting from './settings/setting'

import routeUi from './settings/ui'
// +++++ ROUTE MASTER +++++
import routeObrik from './masters/obrik'
import routePenyebab from './masters/penyebab'
import routeWilayah from './masters/wilayah'
import routeLingkupAudit from './masters/lingkupAudit'
import routeJabatan from './masters/jabatan'
import routeAnggaran from './masters/anggaran'
import routeJenisObrik from './masters/jenisObrik'
import routeUnitAudit from './masters/unitAudit'
import routeRekomendasi from './masters/rekomendasi'
import routeTindakLanjut from './masters/tindakLanjut'
import routeTemuan from './masters/temuan'
import routeUnitKerja from './masters/unitKerja'
import routeUserUnit from './masters/userUnit'
import routeUserUtama from './masters/userUtama'
// +++++ ROUTE MODULES +++++
import routeModLha from './modules/lha'
import routeModTim from './modules/tim'
import routeModTemuan from './modules/temuan'
import routeModPenyebab from './modules/penyebab'
import routeModRekomendasi from './modules/rekomendasi'
import routeModTindakLanjut from './modules/tindakLanjut'
import routeModPelaku from './modules/pelaku'
// +++++ ROUTE PAGES +++++
import pages from './pages/pages'

// Containers
const TheContainer = () => import('@/containers/TheContainer')


Vue.use(Router)

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})


router.beforeEach((to, from, next) => {
  let roles = localStorage.getItem("roles");
  if (roles != null) {
    roles = roles.split(',')
  }
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (roles != null && roles.indexOf('admin') >= 0) {
      next()
    } else {
      next({
        path: '/login',
        // params: { nextUrl: to.fullPath }
      })
    }
  } else if (to.matched.some(record => record.meta.requiresUser)) {
    if (roles != null && roles.indexOf('user') >= 0) {
      next()
    } else {
      next({
        path: '/login',
        // params: { nextUrl: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: {
        requiresUser: true
      },
      children: [
        // SETTINGS
        ...routeCoreUiSetting,
        ...routeUi,
        // +++++ MASTERS +++++
        {
          path: 'master-referensi',
          name: 'master-referensi',
          component: {
            render(c) { return c('router-view') }
          },
          meta: {
            requiresUser: true
          },
          children: [
            routeWilayah,
            routeObrik,
            routeLingkupAudit,
            routeJabatan,
            routeAnggaran,
            routeJenisObrik,
            routeUnitAudit,
          ]
        },
        routePenyebab,
        routeRekomendasi,
        routeTindakLanjut,
        routeTemuan.routeRootTemuan,
        routeTemuan.routeKlpTemuan,
        routeTemuan.routeSubKlpTemuan,
        routeUnitKerja,
        routeUserUnit,
        routeUserUtama,

        // +++++ MODULES +++++
        routeModLha,
        routeModTim,
        routeModTemuan,
        routeModPenyebab,
        routeModRekomendasi,
        routeModTindakLanjut,
        routeModPelaku,
      ]
    },
    ...pages
  ]
}

