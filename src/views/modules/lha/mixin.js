export default {
  methods: {
    async loadGroupLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch(
          'm_ref_lingkup_audit/loadRefGroupLingkupAudit', {
            forceRefresh: refresh,
          }
        );

        this.optionsGroupLingkupAudit =
          this.$store.getters['m_ref_lingkup_audit/refGroupLingkupAudit'];
        
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadLingkupAudit(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_lingkup_audit/loadRefLingkupAudit', {
          idGroupLingkupAudit: this.valueGroupLingkupAudit.id,
          forceRefresh: refresh,
        });
        this.optionsLingkupAudit = this.$store.getters['m_ref_lingkup_audit/refLingkupAudit'];       
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadJenisObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('m_ref_jenis_obrik/loadRefJenisObrik', {
          forceRefresh: refresh,
        });
        this.optionsJenisObrik = this.$store.getters['m_ref_jenis_obrik/refJenisObrik'];
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadUnitObrik(refresh = false) {
      this.loading = true;
      try {

        await this.$store.dispatch('m_ref_unit_obrik/loadRefUnitObrik', {
          forceRefresh: refresh,
        });

        this.optionsUnitObrik = this.$store.getters['m_ref_unit_obrik/refUnitObrik'];
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadBidangObrik(refresh = false) {
      this.loading = true;
      try {

        await this.$store.dispatch('m_ref_unit_obrik/loadRefBidangObrik', {
          idUnitObrik: this.valueUnitObrik.id,
          forceRefresh: refresh,
        });

        this.optionsBidangObrik = this.$store.getters['m_ref_unit_obrik/refBidangObrik'];
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadSubBidangObrik(refresh = false) {
      this.loading = true;
      try {

        await this.$store.dispatch('m_ref_unit_obrik/loadRefSubBidangObrik', {
          idBidangObrik: this.valueBidangObrik.id,
          forceRefresh: refresh,
        });

        this.optionsSubBidangObrik = this.$store.getters['m_ref_unit_obrik/refSubBidangObrik'];
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadJenisAnggaran(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch(
          'm_ref_jenis_anggaran/loadRefJenisAnggaran',
          {
            forceRefresh: refresh,
          }
        );
        this.optionsJenisAnggaran =
          this.$store.getters['m_ref_jenis_anggaran/refJenisAnggaran'];
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
    },

    async loadSearchKelurahan(query, refresh = false) {
      this.loadingKelurahan = true
      try {

        await this.$store.dispatch('m_ref_wilayah/loadSearchKelurahan', {
          textSearch: query,
          forceRefresh: refresh,
        });

        this.optionsKelurahan = this.$store.getters['m_ref_wilayah/searchKelurahan'];

        this.loadingKelurahan = false
     
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },

    async loadKelurahanById(refresh = false) {
      try {
        const kelurahanById = await this.$store.dispatch('m_ref_wilayah/loadKelurahanById', {
          idKelurahan: this.form.kelurahan,
          forceRefresh: refresh,
        });

        return kelurahanById
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },


    async loadEditLhaById() {
      this.loading = true;
      try {
        await this.$store.dispatch('module_lha/loadLhaById', {
          idLha: this.idLha,
        });
        
        const data = this.$store.getters['module_lha/lhaById'];

        this.form = {
          noPkpt: data.nomorPkpt,
          tahunPkpt: data.tahunPkpt,

          noLha: data.nomorLha,
          tglLha: data.tglLha,

          noSt: data.nomorST,
          tglSt: data.tglST,

          groupLingkupAudit: data.groupLingkupAudit,
          lingkupAudit: data.lingkupAudit,

          jenisObrik: data.jenisObrik,
          unitObrik: data.unitObrik,
          bidangObrik: data.bidangObrik,

          kelurahan: data.kelurahan,
          provinsi: data.provinsi,
          kabkot: data.kabkot,
          kecamatan: data.kecamatan,

          judulLaporan: data.judulLaporan,
          tahunAnggaran: data.tahunAnggaran,
          jenisAnggaran: data.jenisAnggaran,
          namaPimpinan: data.namaPimpinan,
          nipPimpinan: data.nipPimpinan,

          nilaiRencana: data.rencanaAnggaran,
          nilaiRealisasi: data.realisasiAnggaran,
          nilaiDiaudit: data.anggaranYangDiaudit,
          ringkasanLha: data.ringkasanLha,
          flagTpk: data.flagTpk,

          accept: false,
        }

        this.editData = data

      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loading = false;
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