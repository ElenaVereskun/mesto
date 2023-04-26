export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
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
}
