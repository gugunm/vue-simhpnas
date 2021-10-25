import axios from 'axios';
import { API_URL } from '@/utils/api.js'

export default {
  async loadLha(context) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: '/api/lhaindex',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to fetch data unit kerja.'
      );
      throw error;
    }

    const lha = [];

    for (const key in responseData) {
      const data = {
        id: responseData[key]["kode_lha"],
        nomorLha: responseData[key]["Nomor_LHA"],
        tglLha: responseData[key]["Tanggal_LHA"],
        nomorST: responseData[key]["Nomor_ST"],
        tglST: responseData[key]["Tanggal_ST"],
        grupLingkupAudit: responseData[key]["Grup_Lingkup_Audit"],
        lingkupAudit: responseData[key]["Lingkup_Audit"],
        jenisObrik: responseData[key]["Jenis_Obrik"],
        bidangObrik: responseData[key]["Bidang_Obrik"],
        subBidangObrik: responseData[key]["Sub_Bidang_Obrik"],
        judulLaporan: responseData[key]["Judul_laporan"],
        tahunAnggaran: responseData[key]["Tahun_Anggaran"],
        jenisAnggaran: responseData[key]["Jenis_Anggaran"],
        namaPimpinan: responseData[key]["Nama_Pimpinan"],
        nipPimpinan: responseData[key]["NIP_Pimpinan"],
        rencanaAnggaran: responseData[key]["Rencana_Anggaran"],
        realisasiAnggaran: responseData[key]["Realisasi_Anggaran"],
        flagTpk: responseData[key]["Flag_TPK"],
        flagKirim: responseData[key]["Flag_kirim"],
        jumlahTemuan: responseData[key]["Jumlah_Temuan"],
        nilaiTemuan: responseData[key]["Total_Nilai_Temuan"],
        jumlahRekomendasi: responseData[key]["Jumlah_Rekomendasi"],
        nilaiRekomendasi: responseData[key]["Total_Nilai_Rekomendasi"],
        jumlahTl: responseData[key]["Jumlah_Tindak_Lanjut"],
        nilaiTl: responseData[key]["Total_Nilai_Tindak_Lanjut"],
        anggaranYangDiaudit: responseData[key]["Anggaran_yang_diaudit"],
        flagDalnis: responseData[key]["Flag_Dalnis"],
        flagDaltu: responseData[key]["Flag_Daltu"],
        flagAdmin: responseData[key]["Flag_Admin"],
      };
      lha.push(data);
    }

    context.commit('setLha', lha);
    context.commit('setFetchTimestamp');
  },

  async loadLhaById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/lha/${payload.idLha}/edit`,
      params: {
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

    const lha = {
      nomorPkpt: responseData["Nomor_PKPT"],
      tahunPkpt: responseData["Tahun_PKPT"],

      nomorLha: responseData["Nomor_LHA"],
      tglLha: responseData["Tanggal_LHA"],
      nomorST: responseData["Nomor_ST"],
      tglST: responseData["Tanggal_ST"],
      kelurahan: responseData["Kode_Kelurahan"],
      provinsi: responseData["Kode_Provinsi"],
      kabkot: responseData["Kode_KabupatenKota"],
      kecamatan: responseData["Kode_Kecamatan"],

      groupLingkupAudit: responseData["Grup_Lingkup_Audit"],
      lingkupAudit: responseData["Lingkup_Audit"],
      jenisObrik: responseData["Jenis_Obrik"],
      unitObrik: responseData["Unit_Obrik"],
      bidangObrik: responseData["Bidang_Obrik"],
      subBidangObrik: responseData["Sub_Bidang_Obrik"],
      judulLaporan: responseData["Judul_laporan"],

      tahunAnggaran: responseData["Tahun_Anggaran"],
      jenisAnggaran: responseData["kode_jenis_anggaran"],
      namaPimpinan: responseData["Nama_Pimpinan"],
      nipPimpinan: responseData["NIP_Pimpinan"],

      rencanaAnggaran: responseData["Rencana_Anggaran"],
      realisasiAnggaran: responseData["Realisasi_Anggaran"],
      anggaranYangDiaudit: responseData["Anggaran_yang_diaudit"],

      ringkasanLha: responseData["Ringkasan_LHA"],
      isStored: responseData["is_stored"],
      uploadFileLha: responseData["Upload_file_LHA"],

      flagTpk: responseData["Flag_TPK"],
    };

    context.commit('setLhaById', lha);
  },

  async loadDetailLhaById(context, payload) {
    const response = await axios({
      method: 'GET',
      baseURL: API_URL,
      url: `/api/lha/${payload.idLha}`,
      params: {
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


    const timAudit = []
    for (const key in responseData["dataTimAudit"]){
      const data = {
        id: responseData["dataTimAudit"][key]["kode_timaudit"],
        nama: responseData["dataTimAudit"][key]["Nama"],
        nip: responseData["dataTimAudit"][key]["NIP"],
        kodePeran: responseData["dataTimAudit"][key]["Kode_Peran"],
        peran: responseData["dataTimAudit"][key]["Peran"],
      }
      timAudit.push(data);
    }

    const temuans = []
    for (const key in responseData["dataTemuan"]){

      const dataTemuanKeyPenyebab = responseData["dataTemuan"][key]["dataPenyebab"]
      const penyebabs = []

      // for (const keyPenyebab in responseData["dataTemuan"]){
      for (const keyPenyebab in dataTemuanKeyPenyebab){
        penyebabs.push({
          id: dataTemuanKeyPenyebab[keyPenyebab]["kode_penyebab"],
          nomorPenyebab: dataTemuanKeyPenyebab[keyPenyebab]["Nomor_Penyebab"],
          kodePenyebab: dataTemuanKeyPenyebab[keyPenyebab]["Ref_Kode_Penyebab"],
          deskripsi: dataTemuanKeyPenyebab[keyPenyebab]["diskripsi"],
          memoPenyebab: dataTemuanKeyPenyebab[keyPenyebab]["Memo_Penyebab"],   
        })
      }

      const dataTemuanKeyRekomendasi = responseData["dataTemuan"][key]["dataRekomendasi"]
      const rekomendasis = []

      for (const keyRekomendasi in dataTemuanKeyRekomendasi){

        const dataRekKeyTl = dataTemuanKeyRekomendasi[keyRekomendasi]["dataTL"]
        const tl = []

        for (const keyTl in dataRekKeyTl){
          tl.push({
            id: dataRekKeyTl[keyTl]["kode_tl"],
            nomorTl: dataRekKeyTl[keyTl]["Nomor_TL"],
            kodeKelompokTl: dataRekKeyTl[keyTl]["Kode_Kelompok_TL"],
            kelompokTl: dataRekKeyTl[keyTl]["Kelompok_TL"],
            kodeSubKelompokTl: dataRekKeyTl[keyTl]["Kode_Sub_Kelompok_TL"],
            subKelompokTl: dataRekKeyTl[keyTl]["Sub_Kelompok_TL"],
            memoTl: dataRekKeyTl[keyTl]["Memo_TL"],
            nilaiTl: dataRekKeyTl[keyTl]["Nilai_TL"],
            statusTl: dataRekKeyTl[keyTl]["Status_TL"],
            flagKirim: dataRekKeyTl[keyTl]["Flag_kirim"],
            tanggalEntry: dataRekKeyTl[keyTl]["Tanggal_Entry"],
            userEntry: dataRekKeyTl[keyTl]["User_Entry"],
            tanggalKt: dataRekKeyTl[keyTl]["Tanggal_KT"],
            userKt: dataRekKeyTl[keyTl]["User_KT"],
            tanggalUpdate: dataRekKeyTl[keyTl]["Tanggal_update"],
            userUpdate: dataRekKeyTl[keyTl]["User_Update"],
            flagDalnis: dataRekKeyTl[keyTl]["Flag_Dalnis"],
            tanggalDalnis: dataRekKeyTl[keyTl]["Tanggal_Dalnis"],
            userDalnis: dataRekKeyTl[keyTl]["User_Dalnis"],
            catatanDalnis: dataRekKeyTl[keyTl]["Catatan_Dalnis"],
            flagDaltu: dataRekKeyTl[keyTl]["Flag_Daltu"],
            tanggalDaltu: dataRekKeyTl[keyTl]["Tanggal_Daltu"],
            userDaltu: dataRekKeyTl[keyTl]["User_Daltu"],
            catatanDaltu: dataRekKeyTl[keyTl]["Catatan_Daltu"],
            flagAdmin: dataRekKeyTl[keyTl]["Flag_Admin"],
            tanggalAdmin: dataRekKeyTl[keyTl]["Tanggal_Admin"],
            userAdmin: dataRekKeyTl[keyTl]["User_Admin"],
            catatanAdmin: dataRekKeyTl[keyTl]["Catatan_Admin"],
            statusPostTl: dataRekKeyTl[keyTl]["Status_post_tl"],
            memoKoreksiTl: dataRekKeyTl[keyTl]["Memo_Koreksi_tl"],
            uploadFileTl: dataRekKeyTl[keyTl]["Upload_file_TL"],
          })
        }

        const dataRekKeyPelaku = dataTemuanKeyRekomendasi[keyRekomendasi]["dataPelaku"]
        const pelaku = []

        for (const keyPelaku in dataRekKeyPelaku){
          pelaku.push({
            id: dataRekKeyPelaku[keyPelaku]["kode_pelaku"],
            nomorUrut: dataRekKeyPelaku[keyPelaku]["Nomor_Urut"],
            nama: dataRekKeyPelaku[keyPelaku]["Nama"],
            nip: dataRekKeyPelaku[keyPelaku]["NIP"],
            kodeJabatan: dataRekKeyPelaku[keyPelaku]["Kode_Jabatan"],
            jabatan: dataRekKeyPelaku[keyPelaku]["Nama_Jabatan"],
            memoKesalahan: dataRekKeyPelaku[keyPelaku]["Memo_kesalahan"],
          })
        }

        rekomendasis.push({
          id: dataTemuanKeyRekomendasi[keyRekomendasi]["kode_rekomendasi"],
          nomorRekomendasi: dataTemuanKeyRekomendasi[keyRekomendasi]["Nomor_Rekomendasi"],
          kodeKelompokRekomendasi: dataTemuanKeyRekomendasi[keyRekomendasi]["Kode_Kelompok_Rekomendasi"],
          kelompokRekomendasi: dataTemuanKeyRekomendasi[keyRekomendasi]["Kelompok_Rekomendasi"],
          kodeSubKelompokRekomendasi: dataTemuanKeyRekomendasi[keyRekomendasi]["Kode_Sub_Kelompok_Rekomendasi"],
          subKelompokRekomendasi: dataTemuanKeyRekomendasi[keyRekomendasi]["Sub_Kelompok_Rekomendasi"],
          memoRekomendasi: dataTemuanKeyRekomendasi[keyRekomendasi]["Memo_Rekomendasi"],
          flagPelaku: dataTemuanKeyRekomendasi[keyRekomendasi]["Flag_Pelaku"],
          nilaiRekomendasi: dataTemuanKeyRekomendasi[keyRekomendasi]["Nilai_Rekomendasi"],
          nilaiTL: dataTemuanKeyRekomendasi[keyRekomendasi]["Nilai_TL"],
          statusRekomendasi: dataTemuanKeyRekomendasi[keyRekomendasi]["Status_Rekomendasi"],
          memoKoreksiRek: dataTemuanKeyRekomendasi[keyRekomendasi]["Memo_Koreksi_rek"],

          dataPelaku: pelaku,
          dataTl: tl
        })
      }

      temuans.push({
        id: responseData["dataTemuan"][key]["kode_temuan"],
        nomorTemuan: responseData["dataTemuan"][key]["Nomor_Temuan"],
        jenisTemuan: responseData["dataTemuan"][key]["Jenis_Temuan"],
        kelompokTemuan: responseData["dataTemuan"][key]["Kelompok_Temuan"],
        subKelompokTemuan: responseData["dataTemuan"][key]["Sub_Kelompok_Temuan"],
        memoTemuan: responseData["dataTemuan"][key]["Memo_Temuan"],
        flagTpk: responseData["dataTemuan"][key]["Flag_TPK"],
        posisiKasus: responseData["dataTemuan"][key]["Posisi_Kasus"],
        modusOperandi: responseData["dataTemuan"][key]["Modus_Operandi"],
        nilaiTemuan: responseData["dataTemuan"][key]["Nilai_Temuan"],
        jumlahRekomendasi: responseData["dataTemuan"][key]["Jumlah_Rekomendasi"],
        jumlahSaldoRekomendasi: responseData["dataTemuan"][key]["Jumlah_Saldo_Rekomendasi"],
        statusTemuan: responseData["dataTemuan"][key]["Status_Temuan"],
        memoKoreksiTemuan: responseData["dataTemuan"][key]["Memo_Koreksi_Tem"],
        dataPenyebab: penyebabs,
        dataRekomendasi: rekomendasis
      })
    }

    const lha = {
      id: responseData["kode_lha"],
      nomorLha: responseData["Nomor_LHA"],
      tglLha: responseData["Tanggal_LHA"],
      nomorST: responseData["Nomor_ST"],
      tglST: responseData["Tanggal_ST"],
      grupLingkupAudit: responseData["Grup_Lingkup_Audit"],
      lingkupAudit: responseData["Lingkup_Audit"],
      jenisObrik: responseData["Jenis_Obrik"],
      unitObrik: responseData["Unit_Obrik"],
      bidangObrik: responseData["Bidang_Obrik"],
      subBidangObrik: responseData["Sub_Bidang_Obrik"],
      judulLaporan: responseData["Judul_laporan"],
      tahunAnggaran: responseData["Tahun_Anggaran"],
      jenisAnggaran: responseData["Jenis_Anggaran"],
      namaPimpinan: responseData["Nama_Pimpinan"],
      nipPimpinan: responseData["NIP_Pimpinan"],
      rencanaAnggaran: responseData["Rencana_Anggaran"],
      realisasiAnggaran: responseData["Realisasi_Anggaran"],
      anggaranYangDiaudit: responseData["Anggaran_yang_diaudit"],
      flagTpk: responseData["Flag_TPK"],
      flagKirim: responseData["Flag_kirim"],
      flagDalnis: responseData["Flag_Dalnis"],
      flagDaltu: responseData["Flag_Daltu"],
      flagAdmin: responseData["Flag_Admin"],
      statusPostLha: responseData["Status_post_lha"],
      nomorPkpt: responseData["Nomor_PKPT"],
      tahunPkpt: responseData["Tahun_PKPT"],
      ringkasanLha: responseData["Ringkasan_LHA"],
      isStored: responseData["is_stored"],
      uploadFileLha: responseData["Upload_file_LHA"],
      provinsi: responseData["Provinsi"],
      kabkot: responseData["Kabkot"],
      kecamatan: responseData["Kecamatan"],
      kelurahan: responseData["Kelurahan"],
      dataTimAudit: timAudit,
      dataTemuan: temuans,
    };

    context.commit('setLhaById', lha);
  },

  async createLha(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload,
      baseURL: API_URL,
      url: '/api/lha',
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;
    
    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to save data'
      );
      throw error;
    }
    
    return responseData
  },

  async deleteLhaById(context, payload) {
    const response = await axios({
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/lha/${payload.idLha}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to delete data'
      );
      throw error;
    }

    return response
  },

  async updateLhaById(context, payload){
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload.data,
      baseURL: API_URL,
      url: `/api/lha/${payload.idLha}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to update data'
      );
      throw error;
    }

    return response
  },

  async sendLhaById(context, payload){
    const response = await axios({
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      baseURL: API_URL,
      url: `/api/kirimlha/${payload.idLha}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    if (response.status != 200) {
      const error = new Error(
        response.data.message || 'Failed to send data'
      );

      throw error;
    } 

    return response
  },

  async dalnisAddMemo(context, payload) {
    const response = await axios({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: payload.data,
      baseURL: API_URL,
      url: `/api/dalnisaddmemo/${payload.idLha}`,
      params: {
        token: localStorage.getItem('api_token')
      },
    })

    const responseData = await response.data;

    if (response.statusText != "OK") {
      const error = new Error(
        responseData.message || 'Failed to save data'
      );
      throw error;
    }

    return response
  }
}