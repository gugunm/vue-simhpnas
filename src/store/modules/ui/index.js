import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      sidebarShow: "responsive",
      sidebarMinimize: false,
      asideShow: false,
      darkMode: false,
      titleHeader: "Dashboard"
    };
  },
  mutations,
  actions,
  getters
};
