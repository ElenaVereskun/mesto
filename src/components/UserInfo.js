export default class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    }
    getUserInfo() {
        this._profileName = document.querySelector('.profile__name').textContent;
        this._profileJob = document.querySelector('.profile__job').textContent;
    }
    setUserInfo() {//который принимает новые данные пользователя 
        //и добавляет их на страницу.

    }
}