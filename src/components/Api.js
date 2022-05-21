const error = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(error);
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(error);
  }

  saveUserInfo(userData) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.nameUser,
        about: userData.workUser
      })
    })
      .then(error);
  }

  addCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(error);
  }

  // getUserInfoAndInitialCards() {
  //   return Promise.all([this.getInitialCards(), this.getUserInfo()])
  // }

  // addCard(data) {
  //   return fetch(this._url, {
  //     method: 'POST',
  //     headers: this._headers,
  //     body: JSON.stringify(data)
  //   })
  //   .then(error);
  // }
};