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

  setUserInfo(formValues) {
    this._nameUser.textContent = formValues.nameUser;
    this._workUser.textContent = formValues.workUser;
  }
}