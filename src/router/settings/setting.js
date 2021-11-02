// const Dashboard = () => import('@/views/Dashboard')
const Dashboard = resolve => {
  require.ensure(['@/views/Dashboard'], () => {
      resolve(require('@/views/Dashboard'));
  });
};

// Users
// const Users = () => import('@/views/users/Users')
const Users = resolve => {
  require.ensure(['@/views/users/Users'], () => {
      resolve(require('@/views/users/Users'));
  }, 'user');
};
// const User = () => import('@/views/users/User')
const User = resolve => {
  require.ensure(['@/views/users/User'], () => {
      resolve(require('@/views/users/User'));
  }, 'user');
};
// const EditUser = () => import('@/views/users/EditUser')
const EditUser = resolve => {
  require.ensure(['@/views/users/EditUser'], () => {
      resolve(require('@/views/users/EditUser'));
  }, 'user');
};

//Notes
// const Notes = () => import('@/views/notes/Notes')
const Notes = resolve => {
  require.ensure(['@/views/notes/Notes'], () => {
      resolve(require('@/views/notes/Notes'));
  }, 'note');
};
// const Note = () => import('@/views/notes/Note')
const Note = resolve => {
  require.ensure(['@/views/notes/Note'], () => {
      resolve(require('@/views/notes/Note'));
  }, 'note');
};
// const EditNote = () => import('@/views/notes/EditNote')
const EditNote = resolve => {
  require.ensure(['@/views/notes/EditNote'], () => {
      resolve(require('@/views/notes/EditNote'));
  }, 'note');
};
// const CreateNote = () => import('@/views/notes/CreateNote')
const CreateNote = resolve => {
  require.ensure(['@/views/notes/CreateNote'], () => {
      resolve(require('@/views/notes/CreateNote'));
  }, 'note');
};

//Roles
// const Roles = () => import('@/views/roles/Roles')
const Roles = resolve => {
  require.ensure(['@/views/roles/Roles'], () => {
      resolve(require('@/views/roles/Roles'));
  }, 'role');
};
// const Role = () => import('@/views/roles/Role')
const Role = resolve => {
  require.ensure(['@/views/roles/Role'], () => {
      resolve(require('@/views/roles/Role'));
  }, 'role');
};
// const EditRole = () => import('@/views/roles/EditRole')
const EditRole = resolve => {
  require.ensure(['@/views/roles/EditRole'], () => {
      resolve(require('@/views/roles/EditRole'));
  }, 'role');
};
// const CreateRole = () => import('@/views/roles/CreateRole')
const CreateRole = resolve => {
  require.ensure(['@/views/roles/CreateRole'], () => {
      resolve(require('@/views/roles/CreateRole'));
  }, 'role');
};

//Bread
// const Breads = () => import('@/views/bread/Breads')
const Breads = resolve => {
  require.ensure(['@/views/bread/Breads'], () => {
      resolve(require('@/views/bread/Breads'));
  }, 'bread');
};
// const Bread = () => import('@/views/bread/Bread')
const Bread = resolve => {
  require.ensure(['@/views/bread/Bread'], () => {
      resolve(require('@/views/bread/Bread'));
  }, 'bread');
};
// const EditBread = () => import('@/views/bread/EditBread')
const EditBread = resolve => {
  require.ensure(['@/views/bread/EditBread'], () => {
      resolve(require('@/views/bread/EditBread'));
  }, 'bread');
};
// const CreateBread = () => import('@/views/bread/CreateBread')
const CreateBread = resolve => {
  require.ensure(['@/views/bread/CreateBread'], () => {
      resolve(require('@/views/bread/CreateBread'));
  }, 'bread');
};
// const DeleteBread = () => import('@/views/bread/DeleteBread')
const DeleteBread = resolve => {
  require.ensure(['@/views/bread/DeleteBread'], () => {
      resolve(require('@/views/bread/DeleteBread'));
  }, 'bread');
};

//Resources
// const Resources = () => import('@/views/resources/Resources')
const Resources = resolve => {
  require.ensure(['@/views/resources/Resources'], () => {
      resolve(require('@/views/resources/Resources'));
  }, 'resource');
};
// const CreateResource = () => import('@/views/resources/CreateResources')
const CreateResource = resolve => {
  require.ensure(['@/views/resources/CreateResources'], () => {
      resolve(require('@/views/resources/CreateResources'));
  }, 'resource');
};
// const Resource = () => import('@/views/resources/Resource')
const Resource = resolve => {
  require.ensure(['@/views/resources/Resource'], () => {
      resolve(require('@/views/resources/Resource'));
  }, 'resource');
};
// const EditResource = () => import('@/views/resources/EditResource')
const EditResource = resolve => {
  require.ensure(['@/views/resources/EditResource'], () => {
      resolve(require('@/views/resources/EditResource'));
  }, 'resource');
};
// const DeleteResource = () => import('@/views/resources/DeleteResource')
const DeleteResource = resolve => {
  require.ensure(['@/views/resources/DeleteResource'], () => {
      resolve(require('@/views/resources/DeleteResource'));
  }, 'resource');
};

//Email
// const Emails = () => import('@/views/email/Emails')
const Emails = resolve => {
  require.ensure(['@/views/email/Emails'], () => {
      resolve(require('@/views/email/Emails'));
  }, 'role');
};
// const CreateEmail = () => import('@/views/email/CreateEmail')
const CreateEmail = resolve => {
  require.ensure(['@/views/email/CreateEmail'], () => {
      resolve(require('@/views/email/CreateEmail'));
  }, 'email');
};
// const EditEmail = () => import('@/views/email/EditEmail')
const EditEmail = resolve => {
  require.ensure(['@/views/email/EditEmail'], () => {
      resolve(require('@/views/email/EditEmail'));
  }, 'email');
};
// const ShowEmail = () => import('@/views/email/ShowEmail')
const ShowEmail = resolve => {
  require.ensure(['@/views/email/ShowEmail'], () => {
      resolve(require('@/views/email/ShowEmail'));
  }, 'email');
};
// const SendEmail = () => import('@/views/email/SendEmail')
const SendEmail = resolve => {
  require.ensure(['@/views/email/SendEmail'], () => {
      resolve(require('@/views/email/SendEmail'));
  }, 'email');
};

// const Menus = () => import('@/views/menu/MenuIndex')
const Menus = resolve => {
  require.ensure(['@/views/menu/MenuIndex'], () => {
      resolve(require('@/views/menu/MenuIndex'));
  }, 'menu');
};
// const CreateMenu = () => import('@/views/menu/CreateMenu')
const CreateMenu = resolve => {
  require.ensure(['@/views/menu/CreateMenu'], () => {
      resolve(require('@/views/menu/CreateMenu'));
  }, 'menu');
};
// const EditMenu = () => import('@/views/menu/EditMenu')
const EditMenu = resolve => {
  require.ensure(['@/views/menu/EditMenu'], () => {
      resolve(require('@/views/menu/EditMenu'));
  }, 'menu');
};
// const DeleteMenu = () => import('@/views/menu/DeleteMenu')
const DeleteMenu = resolve => {
  require.ensure(['@/views/menu/DeleteMenu'], () => {
      resolve(require('@/views/menu/DeleteMenu'));
  }, 'menu');
};

// const MenuElements = () => import('@/views/menuElements/ElementsIndex')
const MenuElements = resolve => {
  require.ensure(['@/views/menuElements/ElementsIndex'], () => {
      resolve(require('@/views/menuElements/ElementsIndex'));
  }, 'menu');
};
// const CreateMenuElement = () => import('@/views/menuElements/CreateMenuElement')
const CreateMenuElement = resolve => {
  require.ensure(['@/views/menuElements/CreateMenuElement'], () => {
      resolve(require('@/views/menuElements/CreateMenuElement'));
  }, 'menu');
};
// const EditMenuElement = () => import('@/views/menuElements/EditMenuElement')
const EditMenuElement = resolve => {
  require.ensure(['@/views/menuElements/EditMenuElement'], () => {
      resolve(require('@/views/menuElements/EditMenuElement'));
  }, 'menu');
};
// const ShowMenuElement = () => import('@/views/menuElements/ShowMenuElement')
const ShowMenuElement = resolve => {
  require.ensure(['@/views/menuElements/ShowMenuElement'], () => {
      resolve(require('@/views/menuElements/ShowMenuElement'));
  }, 'menu');
};
// const DeleteMenuElement = () => import('@/views/menuElements/DeleteMenuElement')
const DeleteMenuElement = resolve => {
  require.ensure(['@/views/menuElements/DeleteMenuElement'], () => {
      resolve(require('@/views/menuElements/DeleteMenuElement'));
  }, 'menu');
};

// const Media = () => import('@/views/media/Media')
const Media = resolve => {
  require.ensure(['@/views/media/Media'], () => {
      resolve(require('@/views/media/Media'));
  }, 'media');
};


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
      requiresUser: true,
      // requiresAdmin: true,
      allowedUser: [0, 1, 3, 4]
    },
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