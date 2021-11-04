import axios from 'axios';

export default {
  methods: {
    async loadLevelUser() {
      const response = await axios({
        method: 'GET',
        baseURL: this.$apiAddress,
        url: '/api/leveluser',
        params: {
          token: localStorage.getItem('api_token'),
        },
      });

      const responseData = await response.data;

      if (response.status != 200) {
        const error = new Error(
          responseData.message || 'Failed to fetch data'
        );
        throw error;
      }
        
      this.optionsLevel = responseData;
    },

    async loadSubUnitAudit() {
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefSubUnitAudit', {
          idUnitAudit: localStorage.getItem('idUnitKerja'),
        });
        this.optionsSubUnitAudit = this.$store.getters['m_ref_unit_audit/refSubUnitAudit'];
      } catch (error) {
        this.toastError('Terjadi kesalahan saat load sub unit audit');
      }
    },

    async loadEditUserUnitById() {
      try {
        await this.$store.dispatch('m_user_unit/loadUserUnitById', {
          idUser: this.idUserUnitKerja,
        });

        const data = this.$store.getters['m_user_unit/userUnitById'];  

        this.form = {
          name: data.name,
          email: data.email,
          // kodeUnitAudit: data.kodeUnitAudit,
          kodeSubUnitAudit: data.kodeSubUnitAudit,
          level: data.level,
          accept: false,
        }
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },


    toastSuccess(msg) {
      this.$toast.open({
        message: msg,
        type: 'success',
        position: 'top-right',
        duration: 3000,
      });
    },

    toastError(msg) {
      this.$toast.open({
        message: msg,
        type: 'error',
        position: 'top-right',
        duration: 5000,
      });
    },
  }
}