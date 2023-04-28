export default class Api {
    constructor(url, headers) {
        this.url = url;
        this.headers = headers
    }
    //1. Загрузка информации о пользователе с сервера
    getUserProfileInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
            .then(res => this._errorCheck(res))
    }
    //2. Загрузка карточек с сервера
    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
            .then(res => this._errorCheck(res))
    }
    //3. Редактирование профиля
    editUserInfo(data) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
            .then(res => this._errorCheck(res))
    }
    //4. Добавление новой карточки
    createCard(data) {
        return fetch(`${this.url}/cards`, {
            method: 'Post',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(res => this._errorCheck(res))
    }
    //7. Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
        }).then(res => this._errorCheck(res))
    };

    //8. Постановка и снятие лайка
    likeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
        }).then(res => this._errorCheck(res))
    };
    deleteLikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
        }).then(res => this._errorCheck(res))
    };
    //9. Обновление аватара пользователя
    editAvatar(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.link
            })
        }).then(res => this._errorCheck(res))
    }
    _errorCheck(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}
