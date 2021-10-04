const MasterUserUtama = () => import('@/views/masters/mUserUtama')


const routeUserUtama = {
  path: 'master-user-utama',
  name: 'Master User Utama',
  component: MasterUserUtama,
  meta: {
    requiresUser: true
  }
}


export default routeUserUtama