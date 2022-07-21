import axios from "axios";
import { API_URL } from "@/utils/api.js";

export default {
  async loadRekomendasiCreate(context, payload) {
    const response = await axios({
      method: "GET",
      baseURL: API_URL,
      url: "/api/rekomendasi/create",
      params: {
        kode_temuan: payload.idTemuan,
        token: localStorage.getItem("api_token")
      }
    });

    const responseData = response.data;

    if (response.status != 200) {
      const error = new Error(responseData.message || "Failed to fetch data");
      throw error;
    }

    return responseData;
  },

  async loadRekomendasi(context, payload) {
    const response = await axios({
      method: "GET",
      baseURL: API_URL,
      url: "/api/rekomendasi",
      params: {
        kode_temuan: payload.idTemuan,
        token: localStorage.getItem("api_token")
      }
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(responseData.message || "Failed to fetch data");
      throw error;
    }

    const rekomendasi = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_rekomendasi"],
        kodeTemuan: responseData[key]["kode_temuan"],
        nomorTemuan: responseData[key]["Nomor_Temuan"],
        kodeLha: responseData[key]["kode_lha"],
        nomorLha: responseData[key]["Nomor_LHA"],
        nomorRekomendasi: responseData[key]["Nomor_Rekomendasi"],
        kodeKelompokRekomendasi: responseData[key]["Kode_Kelompok_Rekomendasi"],
        kelompokRekomendasi: responseData[key]["Kelompok_Rekomendasi"],
        kodeSubKelompokRekomendasi:
          responseData[key]["Kode_Sub_Kelompok_Rekomendasi"],
        subKelompokRekomendasi: responseData[key]["Sub_Kelompok_Rekomendasi"],
        memoRekomendasi: responseData[key]["Memo_Rekomendasi"],
        flagPelaku: responseData[key]["Flag_Pelaku"],
        nilaiRekomendasi: responseData[key]["Nilai_Rekomendasi"],
        // nilaiTL: responseData[key]["Nilai_TL"],
        nilaiTL: responseData[key]["Nilai_Tindak_Lanjut"],
        statusRekomendasi: responseData[key]["Status_Rekomendasi"],
        memoKoreksiRek: responseData[key]["Memo_Koreksi_rek"],
        kodeUnitObrikTl: responseData[key]["Kode_Unit_Obrik_TL"],
        unitObrik: responseData[key]["Unit_Obrik"],
        kodeBidangObrikTl: responseData[key]["Kode_Bidang_Obrik_TL"],
        bidangObrik: responseData[key]["Bidang_Obrik"],
        kodeSubBidangObrikTl: responseData[key]["Kode_Sub_Bidang_Obrik_TL"],
        subBidangObrik: responseData[key]["Sub_Bidang_Obrik"],
        unitObrik: responseData["Unit_Obrik"],
        bidangObrik: responseData["Bidang_Obrik"]
        // subBidangObrik: responseData["Sub_Bidang_Obrik"],
      };
      rekomendasi.push(data);
    }

    context.commit("setRekomendasi", rekomendasi);
    context.commit("setFetchTimestamp");
  },

  async loadRekomendasiById(context, payload) {
    const response = await axios({
      method: "GET",
      baseURL: API_URL,
      url: `/api/rekomendasi/${payload.idRekomendasi}`,
      params: {
        token: localStorage.getItem("api_token")
      }
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(responseData.message || "Failed to fetch data");
      throw error;
    }

    const data = {
      id: responseData["kode_rekomendasi"],
      kodeTemuan: responseData["kode_temuan"],
      nomorTemuan: responseData["Nomor_Temuan"],
      kodeLha: responseData["kode_lha"],
      nomorLha: responseData["Nomor_LHA"],
      nomorRekomendasi: responseData["Nomor_Rekomendasi"],
      kodeKelompokRekomendasi: responseData["Kode_Kelompok_Rekomendasi"],
      kelompokRekomendasi: responseData["Kelompok_Rekomendasi"],
      kodeSubKelompokRekomendasi: responseData["Kode_Sub_Kelompok_Rekomendasi"],
      subKelompokRekomendasi: responseData["Sub_Kelompok_Rekomendasi"],
      memoRekomendasi: responseData["Memo_Rekomendasi"],
      flagPelaku: responseData["Flag_Pelaku"],
      nilaiRekomendasi: responseData["Nilai_Rekomendasi"],
      nilaiTemuan: responseData["Nilai_Temuan"],
      nilaiTL: responseData["Nilai_TL"],
      statusRekomendasi: responseData["Status_Rekomendasi"],
      memoKoreksiRek: responseData["Memo_Koreksi_rek"],
      kodeUnitObrikTl: responseData["Kode_Unit_Obrik_TL"],
      unitObrik: responseData["Unit_Obrik"],
      kodeBidangObrikTl: responseData["Kode_Bidang_Obrik_TL"],
      bidangObrik: responseData["Bidang_Obrik"],
      kodeSubBidangObrikTl: responseData["Kode_Sub_Bidang_Obrik_TL"],
      subBidangObrik: responseData["Sub_Bidang_Obrik"],
      unitObrik: responseData["kodeUnitObrik"],
      bidangObrik: responseData["kodeBidangObrik"],
      subBidangObrik: responseData["kodeSubBidangObrik"]
      // subBidangObrik: responseData[key]["Sub_Bidang_Obrik"],
    };

    context.commit("setRekomendasiById", data);
  },

  async createRekomendasi(context, payload) {
    const response = await axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: "/api/rekomendasi",
      params: {
        token: localStorage.getItem("api_token")
      }
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(responseData.message || "Failed to save data");
      throw error;
    }

    return response;
  },

  async loadSearchRekomendasi(context, payload) {
    const response = await axios({
      method: "GET",
      baseURL: API_URL,
      url: "/api/searchrekomendasi",
      params: {
        kode_temuan: payload.idTemuan,
        token: localStorage.getItem("api_token")
      }
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(responseData.message || "Failed to fetch data");
      throw error;
    }

    const rekomendasi = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_kelompok_rekomendasi"],
        deskripsi: responseData[key]["diskripsi"]
      };
      rekomendasi.push(data);
    }

    context.commit("setSearchRekomendasi", rekomendasi);
  },

  async deleteRekomendasiById(context, payload) {
    const response = await axios({
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/rekomendasi/${payload.idRekomendasi}`,
      params: {
        token: localStorage.getItem("api_token")
      }
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(responseData.message || "Failed to delete data");
      throw error;
    }

    return response;
  },

  async updateRekomendasiById(context, payload) {
    const response = await axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: payload.data,
      baseURL: API_URL,
      url: `/api/rekomendasi/${payload.idRekomendasi}`,
      params: {
        token: localStorage.getItem("api_token")
      }
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(responseData.message || "Failed to update data");
      throw error;
    }

    return response;
  }
};
