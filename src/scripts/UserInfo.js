import {
  selectorNameUserLabel,
  selectorWorkUserLabel
} from "../utils/constants.js";

export default class UserInfo {
  constructor(selectorsUserInputs) {
    this._nameUser = document.querySelector(selectorNameUserLabel).textContent;
    this._workUser = document.querySelector(selectorWorkUserLabel).textContent;

  }

  getUserInfo() {
    const info = {
      nameUser: this._nameUser,
      workUser: this._workUser
    };
    return info;
  }

  setUserInfo(info) {
    this._nameUser = info.nameUser;
    this._workUser = info.workUser;
  }
}