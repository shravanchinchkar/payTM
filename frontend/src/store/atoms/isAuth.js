import { atom } from "recoil";

export const isAuthenticated = atom({
  key: "isAuthenticated",
  default: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null,
});

export const sendMoneyAtom=atom({
  key:"sendMoneyAtom",
  default:""
})