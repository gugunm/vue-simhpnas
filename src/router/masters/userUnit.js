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
    requiresUser: true
  }
}

export default routeUserUnit;