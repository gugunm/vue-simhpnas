const FormPenyebab = () => import('@/views/modules/formPenyebab')


const routeModPenyebab = {
  path: 'penyebab',
  name: 'Penyebab',
  component: FormPenyebab,
  meta: {
    requiresUser: true
  }
}


export default routeModPenyebab