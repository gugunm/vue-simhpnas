// const MasterUserUtama = () => import('@/views/masters/mUserUtama')
const MasterUserUtama = resolve => {
  require.ensure(['@/views/masters/mUserUtama'], () => {
      resolve(require('@/views/masters/mUserUtama'));
  });
};


const routeUserUtama = {
  path: 'master-user-utama',
  name: 'Master User Utama',
  component: MasterUserUtama,
  meta: {
    requiresUser: true,
    // requiresAdmin: true,
    allowedUser: [0, 1],
  }
}


export default routeUserUtama