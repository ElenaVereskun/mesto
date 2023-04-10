import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(popupSelector, data) {
        super(popupSelector);
        this._name = data.name;
        this._link = data.link;
    }
    open() {
        super.open();
        document.querySelector('.element__link').src = this._link;
        document.querySelector('.element__title').textContent = this._name;
    }
}