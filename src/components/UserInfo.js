export default class UserInfo {
  constructor({nameUserSelector, workUserSelector}) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._workUser = document.querySelector(workUserSelector);
  }

  getUserInfo() {
    const info = {
      nameUser: this._nameUser.textContent,
      workUser: this._workUser.textContent,
    };
    return info;
  }

  setUserInfo(userData) {
    this._nameUser.textContent = userData.nameUser;
    this._workUser.textContent = userData.workUser;
  }
}