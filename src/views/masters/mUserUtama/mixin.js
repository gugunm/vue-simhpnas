import axios from 'axios';

export default {
  methods: {
    async loadLevelUser() {
      const response = await axios({
        method: 'GET',
        baseURL: this.$apiAddress,
        url: '/api/leveluserpusat',
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

    async loadEditUserUtamaById() {
      try {
        await this.$store.dispatch('m_user_utama/loadUserUtamaById', {
          idUser: this.idUserUtama,
        });

        const data = this.$store.getters['m_user_utama/userUtamaById'];  

        this.form = {
          name: data.name,
          email: data.email,
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