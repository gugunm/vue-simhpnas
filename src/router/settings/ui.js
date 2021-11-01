// const Colors = () => import('@/views/theme/Colors')
const Colors = resolve => {
  require.ensure(['@/views/theme/Colors'], () => {
      resolve(require('@/views/theme/Colors'));
  });
};
// const Typography = () => import('@/views/theme/Typography')
const Typography = resolve => {
  require.ensure(['@/views/theme/Typography'], () => {
      resolve(require('@/views/theme/Typography'));
  });
};
// const Charts = () => import('@/views/charts/Charts')
const Charts = resolve => {
  require.ensure(['@/views/charts/Charts'], () => {
      resolve(require('@/views/charts/Charts'));
  });
};
// const Widgets = () => import('@/views/widgets/Widgets')
const Widgets = resolve => {
  require.ensure(['@/views/widgets/Widgets'], () => {
      resolve(require('@/views/widgets/Widgets'));
  });
};
// const Tables = () => import('@/views/tables/Tables')
const Tables = resolve => {
  require.ensure(['@/views/tables/Tables'], () => {
      resolve(require('@/views/tables/Tables'));
  });
};
// const AdvancedTables = () => import('@/views/tables/AdvancedTables')
const AdvancedTables = resolve => {
  require.ensure(['@/views/tables/AdvancedTables'], () => {
      resolve(require('@/views/tables/AdvancedTables'));
  });
};
// const LazyLoadingTables = () => import('@/views/tables/LazyLoadingTables')
const LazyLoadingTables = resolve => {
  require.ensure(['@/views/tables/LazyLoadingTables'], () => {
      resolve(require('@/views/tables/LazyLoadingTables'));
  });
};
// const LazyLoadingTablesScroll = () => import('@/views/tables/LazyLoadingTablesScroll')
const LazyLoadingTablesScroll = resolve => {
  require.ensure(['@/views/tables/LazyLoadingTablesScroll'], () => {
      resolve(require('@/views/tables/LazyLoadingTablesScroll'));
  });
};
// Views - Components
// const Cards = () => import('@/views/base/Cards')
const Cards = resolve => {
  require.ensure(['@/views/base/Cards'], () => {
      resolve(require('@/views/base/Cards'));
  });
};
// const Switches = () => import('@/views/base/Switches')
const Switches = resolve => {
  require.ensure(['@/views/base/Switches'], () => {
      resolve(require('@/views/base/Switches'));
  });
};
// const Tabs = () => import('@/views/base/Tabs')
const Tabs = resolve => {
  require.ensure(['@/views/base/Tabs'], () => {
      resolve(require('@/views/base/Tabs'));
  });
};
// const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Breadcrumbs = resolve => {
  require.ensure(['@/views/base/Breadcrumbs'], () => {
      resolve(require('@/views/base/Breadcrumbs'));
  });
};
// const Carousels = () => import('@/views/base/Carousels')
const Carousels = resolve => {
  require.ensure(['@/views/base/Carousels'], () => {
      resolve(require('@/views/base/Carousels'));
  });
};
// const Collapses = () => import('@/views/base/Collapses')
const Collapses = resolve => {
  require.ensure(['@/views/base/Collapses'], () => {
      resolve(require('@/views/base/Collapses'));
  });
};
// const Jumbotrons = () => import('@/views/base/Jumbotrons')
const Jumbotrons = resolve => {
  require.ensure(['@/views/base/Jumbotrons'], () => {
      resolve(require('@/views/base/Jumbotrons'));
  });
};
// const ListGroups = () => import('@/views/base/ListGroups')
const ListGroups = resolve => {
  require.ensure(['@/views/base/ListGroups'], () => {
      resolve(require('@/views/base/ListGroups'));
  });
};
// const Navs = () => import('@/views/base/Navs')
const Navs = resolve => {
  require.ensure(['@/views/base/Navs'], () => {
      resolve(require('@/views/base/Navs'));
  });
};
// const Navbars = () => import('@/views/base/Navbars')
const Navbars = resolve => {
  require.ensure(['@/views/base/Navbars'], () => {
      resolve(require('@/views/base/Navbars'));
  });
};
// const Paginations = () => import('@/views/base/Paginations')
const Paginations = resolve => {
  require.ensure(['@/views/base/Paginations'], () => {
      resolve(require('@/views/base/Paginations'));
  });
};
// const Popovers = () => import('@/views/base/Popovers')
const Popovers = resolve => {
  require.ensure(['@/views/base/Popovers'], () => {
      resolve(require('@/views/base/Popovers'));
  });
};
// const ProgressBars = () => import('@/views/base/ProgressBars')
const ProgressBars = resolve => {
  require.ensure(['@/views/base/ProgressBars'], () => {
      resolve(require('@/views/base/ProgressBars'));
  });
};
// const Tooltips = () => import('@/views/base/Tooltips')
const Tooltips = resolve => {
  require.ensure(['@/views/base/Tooltips'], () => {
      resolve(require('@/views/base/Tooltips'));
  });
};
// Views - Buttons
// const StandardButtons = () => import('@/views/buttons/StandardButtons')
const StandardButtons = resolve => {
  require.ensure(['@/views/buttons/StandardButtons'], () => {
      resolve(require('@/views/buttons/StandardButtons'));
  });
};
// const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const ButtonGroups = resolve => {
  require.ensure(['@/views/buttons/ButtonGroups'], () => {
      resolve(require('@/views/buttons/ButtonGroups'));
  });
};
// const Dropdowns = () => import('@/views/buttons/Dropdowns')
const Dropdowns = resolve => {
  require.ensure(['@/views/buttons/Dropdowns'], () => {
      resolve(require('@/views/buttons/Dropdowns'));
  });
};
// const BrandButtons = () => import('@/views/buttons/BrandButtons')
const BrandButtons = resolve => {
  require.ensure(['@/views/buttons/BrandButtons'], () => {
      resolve(require('@/views/buttons/BrandButtons'));
  });
};
// Views - Editors
// const TextEditors = () => import('@/views/editors/TextEditors')
const TextEditors = resolve => {
  require.ensure(['@/views/editors/TextEditors'], () => {
      resolve(require('@/views/editors/TextEditors'));
  });
};
// const CodeEditors = () => import('@/views/editors/CodeEditors')
const CodeEditors = resolve => {
  require.ensure(['@/views/editors/CodeEditors'], () => {
      resolve(require('@/views/editors/CodeEditors'));
  });
};
// Views - Forms
// const BasicForms = () => import('@/views/forms/Forms')
const BasicForms = resolve => {
  require.ensure(['@/views/forms/Forms'], () => {
      resolve(require('@/views/forms/Forms'));
  });
};
// const AdvancedForms = () => import('@/views/forms/AdvancedForms')
const AdvancedForms = resolve => {
  require.ensure(['@/views/forms/AdvancedForms'], () => {
      resolve(require('@/views/forms/AdvancedForms'));
  });
};
// const ValidationForms = () => import('@/views/forms/ValidationForms')
const ValidationForms = resolve => {
  require.ensure(['@/views/forms/ValidationForms'], () => {
      resolve(require('@/views/forms/ValidationForms'));
  });
};
// Views GoogleMaps
// const GoogleMaps = () => import('@/views/GoogleMaps')
const GoogleMaps = resolve => {
  require.ensure(['@/views/GoogleMaps'], () => {
      resolve(require('@/views/GoogleMaps'));
  });
};
// Views - Icons
// const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const CoreUIIcons = resolve => {
  require.ensure(['@/views/icons/CoreUIIcons'], () => {
      resolve(require('@/views/icons/CoreUIIcons'));
  });
};
// const Brands = () => import('@/views/icons/Brands')
const Brands = resolve => {
  require.ensure(['@/views/icons/Brands'], () => {
      resolve(require('@/views/icons/Brands'));
  });
};
// const Flags = () => import('@/views/icons/Flags')
const Flags = resolve => {
  require.ensure(['@/views/icons/Flags'], () => {
      resolve(require('@/views/icons/Flags'));
  });
};
// Views - Notifications
// const Alerts = () => import('@/views/notifications/Alerts')
const Alerts = resolve => {
  require.ensure(['@/views/notifications/Alerts'], () => {
      resolve(require('@/views/notifications/Alerts'));
  });
};
// const Badges = () => import('@/views/notifications/Badges')
const Badges = resolve => {
  require.ensure(['@/views/notifications/Badges'], () => {
      resolve(require('@/views/notifications/Badges'));
  });
};
// const Modals = () => import('@/views/notifications/Modals')
const Modals = resolve => {
  require.ensure(['@/views/notifications/Modals'], () => {
      resolve(require('@/views/notifications/Modals'));
  });
};
// const Toaster = () => import('@/views/notifications/Toaster')
const Toaster = resolve => {
  require.ensure(['@/views/notifications/Toaster'], () => {
      resolve(require('@/views/notifications/Toaster'));
  });
};
// Plugins
// const Draggable = () => import('@/views/plugins/Draggable')
const Draggable = resolve => {
  require.ensure(['@/views/plugins/Draggable'], () => {
      resolve(require('@/views/plugins/Draggable'));
  });
};
// const Calendar = () => import('@/views/plugins/Calendar')
const Calendar = resolve => {
  require.ensure(['@/views/plugins/Calendar'], () => {
      resolve(require('@/views/plugins/Calendar'));
  });
};
// const Spinners = () => import('@/views/plugins/Spinners')
const Spinners = resolve => {
  require.ensure(['@/views/plugins/Spinners'], () => {
      resolve(require('@/views/plugins/Spinners'));
  });
};
// Views - UI Kits
// const Invoice = () => import('@/views/apps/invoicing/Invoice')
const Invoice = resolve => {
  require.ensure(['@/views/apps/invoicing/Invoice'], () => {
      resolve(require('@/views/apps/invoicing/Invoice'));
  });
};
// const Compose = () => import('@/views/apps/email/Compose')
const Compose = resolve => {
  require.ensure(['@/views/apps/email/Compose'], () => {
      resolve(require('@/views/apps/email/Compose'));
  });
};
// const Inbox = () => import('@/views/apps/email/Inbox')
const Inbox = resolve => {
  require.ensure(['@/views/apps/email/Inbox'], () => {
      resolve(require('@/views/apps/email/Inbox'));
  });
};
// const Message = () => import('@/views/apps/email/Message')
const Message = resolve => {
  require.ensure(['@/views/apps/email/Message'], () => {
      resolve(require('@/views/apps/email/Message'));
  });
};


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