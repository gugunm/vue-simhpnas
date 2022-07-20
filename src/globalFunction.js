export const func = {
  convertToRupiah: payload => {
    return payload ? "Rp " + payload.toLocaleString("id-ID") : "Rp 0";
  },

  rupiahToNumber: payload => {
    return Number(payload.replace(/[^0-9.-]+/g, ""));
  },

  isGanjil(value) {
    return value % 2 == 1 ? true : false;
  },

  isGenap(value) {
    return value % 2 == 0 ? true : false;
  },

  getNextNomorUrutFromArray(currentLen) {
    currentLen = currentLen < 10 ? "0" + currentLen : currentLen;

    return currentLen;
  }
};
