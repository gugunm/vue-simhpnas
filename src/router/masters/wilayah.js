// const MasterRefWilayah = () => import('@/views/masters/mReferensi/refWilayah/provinsi')
const MasterRefWilayah = resolve => {
  require.ensure(['@/views/masters/mReferensi/refWilayah/provinsi'], () => {
      resolve(require('@/views/masters/mReferensi/refWilayah/provinsi'));
  });
};
// const MasterRefWilayahKabkot = () => import('@/views/masters/mReferensi/refWilayah/kabkot')
const MasterRefWilayahKabkot = resolve => {
  require.ensure(['@/views/masters/mReferensi/refWilayah/kabkot'], () => {
      resolve(require('@/views/masters/mReferensi/refWilayah/kabkot'));
  });
};
// const MasterRefWilayahKecamatan = () => import('@/views/masters/mReferensi/refWilayah/kecamatan')
const MasterRefWilayahKecamatan = resolve => {
  require.ensure(['@/views/masters/mReferensi/refWilayah/kecamatan'], () => {
      resolve(require('@/views/masters/mReferensi/refWilayah/kecamatan'));
  });
};
// const MasterRefWilayahKelurahan = () => import('@/views/masters/mReferensi/refWilayah/kelurahan')
const MasterRefWilayahKelurahan = resolve => {
  require.ensure(['@/views/masters/mReferensi/refWilayah/kelurahan'], () => {
      resolve(require('@/views/masters/mReferensi/refWilayah/kelurahan'));
  });
};

const routeWilayah = {
  path: 'wilayah',
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    // MasterRefWilayah
    {
      path: '/',
      name: 'master-ref-wilayah',
      component: MasterRefWilayah,
      meta: {
        requiresUser: true
      },
    },
    // MasterRefWilayahKabkot
    {
      path: 'provinsi/:idProvinsi',
      name: 'master-ref-wilayah-provinsi',
      component: MasterRefWilayahKabkot,
      meta: {
        requiresUser: true
      },
      props: true
    },
    // MasterRefWilayahKecamatan
    {
      path: 'kabkot/:idKabkot',
      name: 'master-ref-wilayah-kabkot',
      component: MasterRefWilayahKecamatan,
      meta: {
        requiresUser: true
      },
      props: true
    },
    // MasterRefWilayahKelurahan
    {
      path: 'kecamatan/:idKecamatan',
      name: 'master-ref-wilayah-kecamatan',
      component: MasterRefWilayahKelurahan,
      meta: {
        requiresUser: true
      },
      props: true
    },
  ]
}


export default routeWilayah;