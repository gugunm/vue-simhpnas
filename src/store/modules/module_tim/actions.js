import axios from 'axios';
import { API_URL } from '@/utils/api.js'

export default {
  async loadTim(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/timaudit',
      params: {
        kode_lha: payload.idLha,
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data'
      );
      throw error;
    }

    const tims = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_timaudit"],
        kodeLha: responseData[key]["kode_lha"],
        nomorLha: responseData[key]["Nomor_LHA"],
        nomorUrut: responseData[key]["Nomor_Urut"],
        nama: responseData[key]["Nama"],
        nip: responseData[key]["NIP"],
        kodePeran: responseData[key]["Kode_Peran"],
        peran: responseData[key]["Peran"],
        kodeUnitAudit: responseData[key]["Kode_Unit_Audit"],
        unitAudit: responseData[key]["Unit_Audit"],
        kodeSubUnitAudit: responseData[key]["Kode_Sub_Unit_Audit"],
        subUnitAudit: responseData[key]["Sub_Unit_Audit"],
      };

      tims.push(data);
    }

    context.commit('setTim', tims);
    context.commit('setFetchTimestamp');
  },
}