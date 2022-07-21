export default {
  methods: {
    async loadLha(refresh = false) {
      try {
        await this.$store.dispatch("module_lha/loadLha", {
          forceRefresh: refresh
        });

        this.optionsLha = this.$store.getters["module_lha/lha"];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },

    async loadTemuan({ id = null }, refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("module_temuan/loadTemuan", {
          forceRefresh: refresh,
          idLha: id
        });

        this.optionsTemuan = this.$store.getters["module_temuan/temuan"];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },

    async loadSearchRekomendasi(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("module_rekomendasi/loadSearchRekomendasi", {
          idTemuan: this.$route.query.idtemuan
            ? this.$route.query.idtemuan
            : this.editData.kodeTemuan,
          forceRefresh: refresh
        });

        this.optionsRekomendasi = this.$store.getters[
          "module_rekomendasi/searchRekomendasi"
        ];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },

    async loadSubKlpRekomendasi(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("m_rekomendasi/loadSubKlpRekomendasi", {
          idKlpRekomendasi: this.valueRekomendasi.id,
          forceRefresh: refresh
        });

        this.optionsSubKlpRekomendasi = this.$store.getters[
          "m_rekomendasi/subKlpRekomendasi"
        ];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },

    async loadRekomendasiById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("module_rekomendasi/loadRekomendasiById", {
          idRekomendasi: this.idRekomendasi,
          forceRefresh: refresh
        });

        this.form = this.$store.getters["module_rekomendasi/rekomendasiById"];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },

    async loadEditRekomendasiById(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("module_rekomendasi/loadRekomendasiById", {
          idRekomendasi: this.idRekomendasi,
          forceRefresh: refresh
        });

        const data = this.$store.getters["module_rekomendasi/rekomendasiById"];

        // console.log("--> data edit : ", data);

        this.form = {
          nomorRekomendasi: data.nomorRekomendasi,
          klpRekomendasi: data.kodeKelompokRekomendasi,
          subKlpRekomendasi: data.kodeSubKelompokRekomendasi,
          memoRekomendasi: data.memoRekomendasi,
          flagPelaku: data.flagPelaku,
          nilaiRekomendasi: data.nilaiRekomendasi,

          unitObrik: data.unitObrik,
          bidangObrik: data.bidangObrik,

          accept: false
        };

        this.editData = data;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },

    async loadUnitObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("m_ref_unit_obrik/loadRefUnitObrik", {
          forceRefresh: refresh
        });

        this.optionsUnitObrik = this.$store.getters[
          "m_ref_unit_obrik/refUnitObrik"
        ];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },

    async loadBidangObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("m_ref_unit_obrik/loadRefBidangObrik", {
          idUnitObrik: this.valueUnitObrik.id,
          forceRefresh: refresh
        });

        this.optionsBidangObrik = this.$store.getters[
          "m_ref_unit_obrik/refBidangObrik"
        ];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },

    async loadSubBidangObrik(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch("m_ref_unit_obrik/loadRefSubBidangObrik", {
          idBidangObrik: this.valueBidangObrik.id,
          forceRefresh: refresh
        });

        this.optionsSubBidangObrik = this.$store.getters[
          "m_ref_unit_obrik/refSubBidangObrik"
        ];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.loading = false;
    },

    toastSuccess(msg) {
      this.$toast.open({
        message: msg,
        type: "success",
        position: "top-right",
        duration: 3000
      });
    },

    toastError(msg) {
      this.$toast.open({
        message: msg,
        type: "error",
        position: "top-right",
        duration: 5000
      });
    }
  }
};
