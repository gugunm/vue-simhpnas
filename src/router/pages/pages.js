// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

const pages = [
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


export default pages;