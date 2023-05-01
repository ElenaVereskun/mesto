export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector}) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }
    setUserInfo(name, job) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }
    getUserInfo() {
        const obj = {
            name: this._profileName.textContent,
            job: this._profileJob.textContent
        }
        return obj
    }
    setUserInfoAvatar(avatar) {
        this._profileAvatar.src = avatar;
    }
}
