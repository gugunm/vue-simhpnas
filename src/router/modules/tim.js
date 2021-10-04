const FormTimAudit = () => import('@/views/modules/formTimAudit')


const routeModTim = {
  path: 'tim-audit',
  name: 'TimAudit',
  component: FormTimAudit,
  meta: {
    requiresUser: true
  }
}


export default routeModTim