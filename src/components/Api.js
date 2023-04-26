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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //2. Загрузка карточек с сервера
    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })

    }
    //7. Удаление карточки
    deleteCard(data) {
        return fetch(`${this.url}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: data._id
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    };

    //8. Постановка и снятие лайка
    likeCard(data){
        return fetch(`${this.url}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: data._id
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    };

    deleteLikeCard(data){
        return fetch(`${this.url}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: data._id
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    };
}
