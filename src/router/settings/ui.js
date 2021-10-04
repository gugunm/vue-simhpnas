const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

const Tables = () => import('@/views/tables/Tables')
const AdvancedTables = () => import('@/views/tables/AdvancedTables')
const LazyLoadingTables = () => import('@/views/tables/LazyLoadingTables')
const LazyLoadingTablesScroll = () => import('@/views/tables/LazyLoadingTablesScroll')

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

// Plugins
const Draggable = () => import('@/views/plugins/Draggable')
const Calendar = () => import('@/views/plugins/Calendar')
const Spinners = () => import('@/views/plugins/Spinners')

// Views - UI Kits
const Invoice = () => import('@/views/apps/invoicing/Invoice')
const Compose = () => import('@/views/apps/email/Compose')
const Inbox = () => import('@/views/apps/email/Inbox')
const Message = () => import('@/views/apps/email/Message')


const routeUi = [
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

export default routeUi;