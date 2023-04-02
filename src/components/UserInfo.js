export default class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    }
    getUserInfo() {//возвращает объект с данными пользователя. 
        //Этот метод пригодится когда данные пользователя нужно 
        //будет подставить в форму при открытии.
        this._profileName = document.querySelector('.profile__name').textContent;
        this._profileJob = document.querySelector('.profile__job').textContent;
    }
    setUserInfo() {//который принимает новые данные пользователя 
        //и добавляет их на страницу.

    }
}