export default {
  methods: {
    async loadUnitAudit() {
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefUnitAudit');

        this.optionsUnitAudit = this.$store.getters['m_ref_unit_audit/refUnitAudit'];
      } catch (error) {
        this.toastError('Terjadi kesalahan saat load unit audit');
      }
    },

    async loadSubUnitAudit() {
      try {
        await this.$store.dispatch('m_ref_unit_audit/loadRefSubUnitAudit', {
          idUnitAudit: this.valueUnitAudit.id,
        });
        this.optionsSubUnitAudit = this.$store.getters['m_ref_unit_audit/refSubUnitAudit'];
      } catch (error) {
        this.toastError('Terjadi kesalahan saat load sub unit audit');
      }
    },

    async loadEditUserUnitById() {
      try {
        await this.$store.dispatch('m_user_unit/loadUserUnitById', {
          idUser: this.idUserUnit,
        });

        const data = this.$store.getters['m_user_unit/userUnitById'];  

        this.form = {
          name: data.name,
          email: data.email,
          kodeUnitAudit: data.kodeUnitAudit,
          // kodeSubUnitAudit: data.kodeSubUnitAudit,
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