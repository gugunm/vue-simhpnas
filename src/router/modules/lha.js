const FormLha = () => import('@/views/modules/formLha')


const routeModLha = {
  path: 'lha',
  name: 'Data LHA',
  component: FormLha,
  meta: {
    requiresUser: true
  }
}

export default routeModLha;