const FormTemuan = () => import('@/views/modules/formTemuan')

const routeModTemuan = {
  path: 'temuan',
  name: 'Temuan',
  component: FormTemuan,
  meta: {
    requiresUser: true
  }
}


export default routeModTemuan;