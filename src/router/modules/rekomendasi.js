const FormRekomendasi = () => import('@/views/modules/formRekomendasi')


const routeModRekomendasi = {
  path: 'rekomendasi',
  name: 'Rekomendasi',
  component: FormRekomendasi,
  meta: {
    requiresUser: true
  }
}


export default routeModRekomendasi