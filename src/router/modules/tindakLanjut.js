const FormTindakLanjut = () => import('@/views/modules/formTindakLanjut')


const routeModTindakLanjut = {
  path: 'tindak-lanjut',
  name: 'Tindak Lanjut',
  component: FormTindakLanjut,
  meta: {
    requiresUser: true
  }
}


export default routeModTindakLanjut