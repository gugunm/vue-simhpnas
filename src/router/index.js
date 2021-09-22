import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index.js';

// === SIMHPNAS ===
/* Master */
const MasterPenyebab = () => import('@/views/masters/mPenyebab')

const MasterUnitKerja = () => import('@/views/masters/mUnitKerja/index.vue')
const MasterCreateUnitKerja = () => import('@/views/masters/mUnitKerja/Create.vue')
const MasterDetailUnitKerja = () => import('@/views/masters/mUnitKerja/Detail.vue')
const MasterEditUnitKerja = () => import('@/views/masters/mUnitKerja/Edit.vue')

const MasterUserUnitKerja = () => import('@/views/masters/mUserUnitKerja')
const MasterUserUtama = () => import('@/views/masters/mUserUtama')

const MasterTindakLanjut = () => import('@/views/masters/mTindakLanjut/tindakLanjut')
const MasterSubTindakLanjut = () => import('@/views/masters/mTindakLanjut/subTindakLanjut')

const MasterRekomendasi = () => import('@/views/masters/mRekomendasi/rekomendasi')
const MasterSubRekomendasi = () => import('@/views/masters/mRekomendasi/subRekomendasi')

// master referensi
const MasterRefWilayah = () => import('@/views/masters/mReferensi/refWilayah/provinsi')
const MasterRefWilayahKabkot = () => import('@/views/masters/mReferensi/refWilayah/kabkot')
const MasterRefWilayahKecamatan = () => import('@/views/masters/mReferensi/refWilayah/kecamatan')
const MasterRefWilayahKelurahan = () => import('@/views/masters/mReferensi/refWilayah/kelurahan')

const MasterRefUnitObrik = () => import('@/views/masters/mReferensi/refObrik/unitObrik')
const MasterRefBidangObrik = () => import('@/views/masters/mReferensi/refObrik/bidangObrik')
const MasterRefSubBidangObrik = () => import('@/views/masters/mReferensi/refObrik/subBidangObrik')

const MasterRefGroupLingkupAudit = () => import('@/views/masters/mReferensi/refLingkupAudit/groupLingkupAudit')
const MasterRefLingkupAudit = () => import('@/views/masters/mReferensi/refLingkupAudit/lingkupAudit')

const MasterRefJabatan = () => import('@/views/masters/mReferensi/refJabatan')
const MasterRefJenisAnggaran = () => import('@/views/masters/mReferensi/refJenisAnggaran')
const MasterRefJenisObrik = () => import('@/views/masters/mReferensi/refJenisObrik')

const MasterRefUnitAudit = () => import('@/views/masters/mReferensi/refUnitAudit/unitAudit')
const MasterRefSubUnitAudit = () => import('@/views/masters/mReferensi/refUnitAudit/subUnitAudit')

// master temuan
const MasterTemuan = () => import('@/views/masters/mTemuan/jenisTemuan')
const MasterKlpTemuan = () => import('@/views/masters/mTemuan/klpTemuan')
const MasterSubKlpTemuan = () => import('@/views/masters/mTemuan/subKlpTemuan')

/* Modules */
const FormLha = () => import('@/views/modules/formLha')
const FormPelaku = () => import('@/views/modules/formPelaku')
const FormPenyebab = () => import('@/views/modules/formPenyebab')
const FormRekomendasi = () => import('@/views/modules/formRekomendasi')
const FormTemuan = () => import('@/views/modules/formTemuan')
const FormTimAudit = () => import('@/views/modules/formTimAudit')
const FormTindakLanjut = () => import('@/views/modules/formTindakLanjut')

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Switches = () => import('@/views/base/Switches')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tables = () => import('@/views/tables/Tables')
const AdvancedTables = () => import('@/views/tables/AdvancedTables')
const LazyLoadingTables = () => import('@/views/tables/LazyLoadingTables')
const LazyLoadingTablesScroll = () => import('@/views/tables/LazyLoadingTablesScroll')

const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Editors
const TextEditors = () => import('@/views/editors/TextEditors')
const CodeEditors = () => import('@/views/editors/CodeEditors')

// Views - Forms
const BasicForms = () => import('@/views/forms/Forms')
const AdvancedForms = () => import('@/views/forms/AdvancedForms')
const ValidationForms = () => import('@/views/forms/ValidationForms')

// Views GoogleMaps
const GoogleMaps = () => import('@/views/GoogleMaps')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')
const Toaster = () => import('@/views/notifications/Toaster')


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const EditUser = () => import('@/views/users/EditUser')

//Notes
const Notes = () => import('@/views/notes/Notes')
const Note = () => import('@/views/notes/Note')
const EditNote = () => import('@/views/notes/EditNote')
const CreateNote = () => import('@/views/notes/CreateNote')

// Plugins
const Draggable = () => import('@/views/plugins/Draggable')
const Calendar = () => import('@/views/plugins/Calendar')
const Spinners = () => import('@/views/plugins/Spinners')

// Views - UI Kits
const Invoice = () => import('@/views/apps/invoicing/Invoice')
const Compose = () => import('@/views/apps/email/Compose')
const Inbox = () => import('@/views/apps/email/Inbox')
const Message = () => import('@/views/apps/email/Message')

//Roles
const Roles = () => import('@/views/roles/Roles')
const Role = () => import('@/views/roles/Role')
const EditRole = () => import('@/views/roles/EditRole')
const CreateRole = () => import('@/views/roles/CreateRole')

//Bread
const Breads = () => import('@/views/bread/Breads')
const Bread = () => import('@/views/bread/Bread')
const EditBread = () => import('@/views/bread/EditBread')
const CreateBread = () => import('@/views/bread/CreateBread')
const DeleteBread = () => import('@/views/bread/DeleteBread')

//Resources
const Resources = () => import('@/views/resources/Resources')
const CreateResource = () => import('@/views/resources/CreateResources')
const Resource = () => import('@/views/resources/Resource')
const EditResource = () => import('@/views/resources/EditResource')
const DeleteResource = () => import('@/views/resources/DeleteResource')

//Email
const Emails = () => import('@/views/email/Emails')
const CreateEmail = () => import('@/views/email/CreateEmail')
const EditEmail = () => import('@/views/email/EditEmail')
const ShowEmail = () => import('@/views/email/ShowEmail')
const SendEmail = () => import('@/views/email/SendEmail')

const Menus = () => import('@/views/menu/MenuIndex')
const CreateMenu = () => import('@/views/menu/CreateMenu')
const EditMenu = () => import('@/views/menu/EditMenu')
const DeleteMenu = () => import('@/views/menu/DeleteMenu')

const MenuElements = () => import('@/views/menuElements/ElementsIndex')
const CreateMenuElement = () => import('@/views/menuElements/CreateMenuElement')
const EditMenuElement = () => import('@/views/menuElements/EditMenuElement')
const ShowMenuElement = () => import('@/views/menuElements/ShowMenuElement')
const DeleteMenuElement = () => import('@/views/menuElements/DeleteMenuElement')

const Media = () => import('@/views/media/Media')

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
        // SIMHPNAS
        /* Master */
        {
          path: 'master-penyebab',
          name: 'Master Penyebab',
          component: MasterPenyebab,
          meta: {
            requiresUser: true
          }
        },
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
            {
              path: 'wilayah',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                // MasterRefWilayah
                {
                  path: '/',
                  name: 'master-ref-wilayah',
                  component: MasterRefWilayah,
                  meta: {
                    requiresUser: true
                  },
                },
                // MasterRefWilayahKabkot
                {
                  path: 'provinsi/:idProvinsi',
                  name: 'master-ref-wilayah-provinsi',
                  component: MasterRefWilayahKabkot,
                  meta: {
                    requiresUser: true
                  },
                  props: true
                },
                // MasterRefWilayahKecamatan
                {
                  path: 'kabkot/:idKabkot',
                  name: 'master-ref-wilayah-kabkot',
                  component: MasterRefWilayahKecamatan,
                  meta: {
                    requiresUser: true
                  },
                  props: true
                },
                // MasterRefWilayahKelurahan
                {
                  path: 'kecamatan/:idKecamatan',
                  name: 'master-ref-wilayah-kecamatan',
                  component: MasterRefWilayahKelurahan,
                  meta: {
                    requiresUser: true
                  },
                  props: true
                },
              ]
            },
            {
              path: 'obrik',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                // Master Ref Obrik
                {
                  path: '/',
                  name: 'master-ref-obrik',
                  component: MasterRefUnitObrik,
                  meta: {
                    requiresUser: true
                  },
                },
                // Master Ref Bidang Obrik
                {
                  path: 'bidang-obrik/:idUnitObrik',
                  name: 'master-ref-bidang-obrik',
                  component: MasterRefBidangObrik,
                  meta: {
                    requiresUser: true
                  },
                  props: true
                },
                // Master Ref Sub Bidang Obrik
                {
                  path: 'sub-bidang-obrik/:idBidangObrik',
                  name: 'master-ref-sub-bidang-obrik',
                  component: MasterRefSubBidangObrik,
                  meta: {
                    requiresUser: true
                  },
                  props: true
                },
              ]
            },
            {
              path: 'lingkup-audit',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: '/',
                  name: 'master-ref-group-lingkup-audit',
                  component: MasterRefGroupLingkupAudit,
                  meta: {
                    requiresUser: true
                  },
                },
                {
                  path: ':idGroupLingkupAudit',
                  name: 'master-ref-lingkup-audit',
                  component: MasterRefLingkupAudit,
                  meta: {
                    requiresUser: true
                  },
                  props: true
                }
              ]
            },
            {
              path: 'jabatan',
              name: 'master-ref-jabatan',
              component: MasterRefJabatan,
              meta: {
                requiresUser: true
              }
            },
            {
              path: 'jenis-anggaran',
              name: 'master-ref-jenis-anggaran',
              component: MasterRefJenisAnggaran,
              meta: {
                requiresUser: true
              }
            },
            {
              path: 'jenis-obrik',
              name: 'master-ref-jenis-obrik',
              component: MasterRefJenisObrik,
              meta: {
                requiresUser: true
              }
            },
            {
              path: 'unit-audit',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: '/',
                  name: 'master-ref-unit-audit',
                  component: MasterRefUnitAudit,
                  meta: {
                    requiresUser: true
                  },
                },
                {
                  path: ':idUnitAudit',
                  name: 'master-ref-sub-unit-audit',
                  component: MasterRefSubUnitAudit,
                  meta: {
                    requiresUser: true
                  },
                  props: true
                }
              ]
            },
          ]
        },
        {
          path: 'master-rekomendasi',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/',
              name: 'master-klp-rekomendasi',
              component: MasterRekomendasi,
              meta: {
                requiresUser: true
              },
            },
            {
              path: ':idKlpRekomendasi',
              name: 'master-sub-klp-rekomendasi',
              component: MasterSubRekomendasi,
              meta: {
                requiresUser: true
              },
              props: true
            }
          ]
        },
        {
          path: 'master-tindak-lanjut',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/',
              name: 'master-tl',
              component: MasterTindakLanjut,
              meta: {
                requiresUser: true
              },
            },
            {
              path: ':idKlpTindakLanjut',
              name: 'master-sub-tl',
              component: MasterSubTindakLanjut,
              meta: {
                requiresUser: true
              },
              props: true
            },
          ]
        },
        {
          path: 'master-temuan',
          name: 'Master Temuan',
          component: MasterTemuan,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'master-kelompok-temuan/:idJenisTemuan',
          name: 'mkelompoktemuan',
          component: MasterKlpTemuan,
          meta: {
            requiresUser: true
          },
          props: true
        },
        {
          path: 'master-sub-kelompok-temuan/:idKlpTemuan',
          name: 'msubkelompoktemuan',
          component: MasterSubKlpTemuan,
          meta: {
            requiresUser: true
          },
          props: true
        },
        {
          path: 'master-unit-kerja',
          name: 'master-unit-kerja',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/',
              name: 'master-unit-kerja-index',
              component: MasterUnitKerja,
              meta: {
                requiresUser: true
              },
            },
            {
              path: 'create',
              name: 'master-unit-kerja-create',
              component: MasterCreateUnitKerja,
              meta: {
                requiresUser: true
              },
            },
            {
              path: ':idUnitKerja/edit',
              name: 'master-unit-kerja-edit',
              component: MasterEditUnitKerja,
              meta: {
                requiresUser: true
              },
              props: true
            },
            {
              path: ':idUnitKerja',
              name: 'master-unit-kerja-detail',
              component: MasterDetailUnitKerja,
              meta: {
                requiresUser: true
              },
              props: true
            },
          ]
        },
        {
          path: 'master-user-unit-kerja',
          name: 'Master User Unit Kerja',
          component: MasterUserUnitKerja,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'master-user-utama',
          name: 'Master User Utama',
          component: MasterUserUtama,
          meta: {
            requiresUser: true
          }
        },

        /* Modules */
        {
          path: 'lha',
          name: 'Data LHA',
          component: FormLha,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'pelaku',
          name: 'Pelaku',
          component: FormPelaku,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'penyebab',
          name: 'Penyebab',
          component: FormPenyebab,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'rekomendasi',
          name: 'Rekomendasi',
          component: FormRekomendasi,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'temuan',
          name: 'Temuan',
          component: FormTemuan,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'tim-audit',
          name: 'TimAudit',
          component: FormTimAudit,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'tindak-lanjut',
          name: 'Tindak Lanjut',
          component: FormTindakLanjut,
          meta: {
            requiresUser: true
          }
        },

        // ========
        {
          path: 'media',
          name: 'Media',
          component: Media,
          meta: {
            requiresAdmin: true
          }
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            requiresUser: true
          }
        },
        {
          path: 'colors',
          name: 'Colors',
          component: Colors,
          meta: {
            requiresAdmin: true
          }
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography,
          meta: {
            requiresAdmin: true
          }
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts,
          meta: {
            requiresAdmin: true
          }
        },
        {
          path: 'tables',
          redirect: '/tables/tables',
          name: 'Tables',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'tables',
              name: 'Basic tables',
              component: Tables,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'advanced-tables',
              name: 'Advanced tables',
              component: AdvancedTables,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'lazy-loading-tables',
              name: 'Lazy loading tables',
              component: LazyLoadingTables,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'lazy-loading-tables-scroll',
              name: 'Lazy loading tables scroll',
              component: LazyLoadingTablesScroll,
              meta: {
                requiresAdmin: true
              }
            }
          ]
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'menu',
          meta: { label: 'Menu' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Menus,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              // meta: { label: 'Create Menu' },
              name: 'CreateMenu',
              component: CreateMenu,
              meta: {
                label: 'Create Menu',
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              // meta: { label: 'Edit Menu' },
              name: 'EditMenu',
              component: EditMenu,
              meta: {
                label: 'Edit Menu',
                requiresAdmin: true
              }
            },
            {
              path: ':id/delete',
              // meta: { label: 'Delete Menu' },
              name: 'DeleteMenu',
              component: DeleteMenu,
              meta: {
                label: 'Delete Menu',
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'menuelement',
          meta: { label: 'MenuElement' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: ':menu/menuelement',
              component: MenuElements,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: ':menu/menuelement/create',
              // meta: { label: 'Create Menu Element' },
              name: 'Create Menu Element',
              component: CreateMenuElement,
              meta: {
                label: 'Create Menu Element',
                requiresAdmin: true
              }
            },
            {
              path: ':menu/menuelement/:id',
              // meta: { label: 'Menu Element Details'},
              name: 'Menu Element',
              component: ShowMenuElement,
              meta: {
                label: 'Menu Element Details',
                requiresAdmin: true
              }
            },
            {
              path: ':menu/menuelement/:id/edit',
              // meta: { label: 'Edit Menu Element' },
              name: 'Edit Menu Element',
              component: EditMenuElement,
              meta: {
                label: 'Edit Menu Element',
                requiresAdmin: true
              }
            },
            {
              path: ':menu/menuelement/:id/delete',
              // meta: { label: 'Delete Menu Element' },
              name: 'Delete Menu Element',
              component: DeleteMenuElement,
              meta: {
                label: 'Delete Menu Element',
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'users',
          meta: { label: 'Users' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              // meta: { label: 'User Details'},
              name: 'User',
              component: User,
              meta: {
                label: 'User Details',
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              // meta: { label: 'Edit User' },
              name: 'EditUser',
              component: EditUser,
              meta: {
                label: 'Edit User',
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'notes',
          meta: { label: 'Notes' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Notes,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              // meta: { label: 'Create Note' },
              name: 'CreateNote',
              component: CreateNote,
              meta: {
                label: 'Create Note',
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              // meta: { label: 'Note Details'},
              name: 'Note',
              component: Note,
              meta: {
                label: 'Note Details',
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              // meta: { label: 'Edit Note' },
              name: 'EditNote',
              component: EditNote,
              meta: {
                label: 'Edit Note',
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'roles',
          meta: { label: 'Roles' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Roles,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              // meta: { label: 'Create Role' },
              name: 'Create Note',
              component: CreateRole,
              meta: {
                label: 'Create Role',
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              // meta: { label: 'Role Details'},
              name: 'Role',
              component: Role,
              meta: {
                label: 'Role Details',
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              // meta: { label: 'Edit Role' },
              name: 'Edit Role',
              component: EditRole,
              meta: {
                label: 'Edit Role',
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'bread',
          meta: { label: 'Bread' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Breads,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              // meta: { label: 'Create Bread' },
              name: 'CreateBread',
              component: CreateBread,
              meta: {
                label: 'Create Bread',
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              // meta: { label: 'Bread Details'},
              name: 'Bread',
              component: Bread,
              meta: {
                label: 'Bread Details',
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              // meta: { label: 'Edit Bread' },
              name: 'Edit Bread',
              component: EditBread,
              meta: {
                label: 'Edit Bread',
                requiresAdmin: true
              }
            },
            {
              path: ':id/delete',
              // meta: { label: 'Delete Bread' },
              name: 'Delete Bread',
              component: DeleteBread,
              meta: {
                label: 'Delete Bread',
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'email',
          meta: { label: 'Emails' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Emails,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              // meta: { label: 'Create Email Template' },
              name: 'Create Email Template',
              component: CreateEmail,
              meta: {
                label: 'Create Email Template',
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              // meta: { label: 'Show Email Template'},
              name: 'Show Email Tempalte',
              component: ShowEmail,
              meta: {
                label: 'Show Email Template',
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              // meta: { label: 'Edit Email Tempalate' },
              name: 'Edit Email Template',
              component: EditEmail,
              meta: {
                label: 'Edit Email Tempalate',
                requiresAdmin: true
              }
            },
            {
              path: ':id/sendEmail',
              // meta: { label: 'Send Email' },
              name: 'Send Email',
              component: SendEmail,
              meta: {
                label: 'Send Email',
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'resource',
          meta: { label: 'Resources' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: ':bread/resource',
              component: Resources,
            },
            {
              path: ':bread/resource/create',
              meta: { label: 'Create Resource' },
              name: 'CreateResource',
              component: CreateResource
            },
            {
              path: ':bread/resource/:id',
              meta: { label: 'Resource Details' },
              name: 'Resource',
              component: Resource,
            },
            {
              path: ':bread/resource/:id/edit',
              meta: { label: 'Edit Resource' },
              name: 'Edit Resource',
              component: EditResource
            },
            {
              path: ':bread/resource/:id/delete',
              meta: { label: 'Delete Resource' },
              name: 'Delete Resource',
              component: DeleteResource
            },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'breadcrumb',
              name: 'Breadcrumb',
              component: Breadcrumbs,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'cards',
              name: 'Cards',
              component: Cards,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'carousel',
              name: 'Carousel',
              component: Carousels,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'collapse',
              name: 'Collapse',
              component: Collapses,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'jumbotron',
              name: 'Jumbotron',
              component: Jumbotrons,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'list-group',
              name: 'List Group',
              component: ListGroups,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'pagination',
              name: 'Pagination',
              component: Paginations,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'progress',
              name: 'Progress',
              component: ProgressBars,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips,
              meta: {
                requiresAdmin: true
              }
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'buttons',
              name: 'Standard Buttons',
              component: StandardButtons,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'button-group',
              name: 'Button Group',
              component: ButtonGroups,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons,
              meta: {
                requiresAdmin: true
              }
            }
          ]
        },
        {
          path: 'editors',
          redirect: '/editors/text-editors',
          name: 'Editors',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'text-editors',
              name: 'Text Editors',
              component: TextEditors,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'code-editors',
              name: 'Code Editors',
              component: CodeEditors,
              meta: {
                requiresAdmin: true
              }
            }
          ]
        },
        {
          path: 'forms',
          redirect: '/forms/basic-forms',
          name: 'Forms',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'basic-forms',
              name: 'Basic Forms',
              component: BasicForms,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'advanced-forms',
              name: 'Advanced Forms',
              component: AdvancedForms,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'validation-forms',
              name: 'Form Validation',
              component: ValidationForms,
              meta: {
                requiresAdmin: true
              }
            }
          ]
        },
        {
          path: 'google-maps',
          name: 'Google Maps',
          component: GoogleMaps,
          meta: {
            requiresAdmin: true
          }
        },
        {
          path: 'icon',
          redirect: '/icon/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Standard CoreUI Icons',
              component: CoreUIIcons,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags,
              meta: {
                requiresAdmin: true
              }
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'badge',
              name: 'Badge',
              component: Badges,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'toaster',
              name: 'Toaster',
              component: Toaster,
              meta: {
                requiresAdmin: true
              }
            }
          ]
        },
        {
          path: 'plugins',
          redirect: '/plugins/draggable',
          name: 'Plugins',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'draggable',
              name: 'Draggable Cards',
              component: Draggable,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'calendar',
              name: 'Calendar',
              component: Calendar,
              meta: {
                requiresAdmin: true
              }
            },
            {
              path: 'spinners',
              name: 'Spinners',
              component: Spinners,
              meta: {
                requiresAdmin: true
              }
            }
          ]
        },

        {
          path: 'apps',
          name: 'Apps',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'invoicing',
              redirect: '/apps/invoicing/invoice',
              name: 'Invoicing',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'invoice',
                  name: 'Invoice',
                  component: Invoice,
                  meta: {
                    requiresAdmin: true
                  }
                }
              ]
            },
            {
              path: 'email',
              redirect: '/apps/email/inbox',
              name: 'Email',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'compose',
                  name: 'Compose',
                  component: Compose,
                  meta: {
                    requiresAdmin: true
                  }
                },
                {
                  path: 'inbox',
                  name: 'Inbox',
                  component: Inbox,
                  meta: {
                    requiresAdmin: true
                  }
                },
                {
                  path: 'message',
                  name: 'Message',
                  component: Message,
                  meta: {
                    requiresAdmin: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    },
    {
      path: '/',
      redirect: '/login',
      name: 'Auth',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
      ]
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ]
}

