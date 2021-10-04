const FormPelaku = () => import('@/views/modules/formPelaku')


const routeModPelaku = {
  path: 'pelaku',
  name: 'Pelaku',
  component: FormPelaku,
  meta: {
    requiresUser: true
  }
}


export default routeModPelaku