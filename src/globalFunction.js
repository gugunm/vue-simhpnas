export const func = {
  convertToRupiah: payload => {
    let rupiah = "";
    if (payload) {
      const angkarev = payload
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("")
      );
    }
    return "Rp 0";
  },

  rupiahToNumber: payload => {
    return Number(payload.replace(/[^0-9.-]+/g, ""));
  },

  isGanjil(value) {
    return value % 2 == 1 ? true : false;
  },

  isGenap(value) {
    return value % 2 == 0 ? true : false;
  }
};
