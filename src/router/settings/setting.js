const Dashboard = () => import('@/views/Dashboard')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const EditUser = () => import('@/views/users/EditUser')

//Notes
const Notes = () => import('@/views/notes/Notes')
const Note = () => import('@/views/notes/Note')
const EditNote = () => import('@/views/notes/EditNote')
const CreateNote = () => import('@/views/notes/CreateNote')

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


const routeCoreUiSetting = [
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
  }
]


export default routeCoreUiSetting;