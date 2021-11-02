// const MasterUserUnitKerja = () => import('@/views/masters/mUserUnitKerja')
const MasterUserUnitKerja = resolve => {
  require.ensure(['@/views/masters/mUserUnitKerja'], () => {
      resolve(require('@/views/masters/mUserUnitKerja'));
  });
};


const routeUserUnit = {
  path: 'master-user-unit-kerja',
  name: 'Master User Unit Kerja',
  component: MasterUserUnitKerja,
  meta: {
    requiresUser: true,
    // requiresAdmin: true,
    allowedUser: [0, 1],
  }
}

export default routeUserUnit;