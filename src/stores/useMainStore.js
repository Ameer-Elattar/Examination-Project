import { defineStore } from "pinia";

export const useMainStore = defineStore("useMainStore", {
  state: () => ({
    userData: JSON.parse(sessionStorage.getItem("userData")) || "",
  }),
  actions: {
    checkAuthentication() {
      console.log("pinia");
      return sessionStorage.userData ? true : false;
    },
    checkRole() {
      let userData = JSON.parse(sessionStorage.getItem("userData"));
      if (userData) return userData[0].role === "admin" ? true : false;
    },
  },
});
