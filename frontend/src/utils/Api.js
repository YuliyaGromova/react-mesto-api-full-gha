class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.Authorization;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(this._baseUrl + `/users/me`, {
      credentials: 'include',
      method: "GET",
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(this._baseUrl + `/cards`, {
      credentials: 'include',
      method: "GET",
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Редактирование профиля
  editUserInfo(data) {
    return fetch(this._baseUrl + `/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(this._baseUrl + `/cards`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Удаление карточки
  deleteCardApi(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      credentials: 'include',
      method: "DELETE",
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  // Постановка и снятие лайка
  putLike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      credentials: 'include',
      method: "PUT",
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  takeOfLike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      credentials: 'include',
      method: "DELETE",
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  changeLikeCardStatus(cardId, newStateLike) {
    if (newStateLike) {
      return this.putLike(cardId);
    } else {
      return this.takeOfLike(cardId);
    }
  }

  // Обновление аватара пользователя
  editAvatar(data) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._checkResult(res);
    });
  }
}

export const api = new Api({
  baseUrl: "https://api.gromova.students.nomoreparties.sbs",
  // baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
