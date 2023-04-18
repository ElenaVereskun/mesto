import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._link = this._popup.querySelector('.popup-photo__link')
        this._name = this._popup.querySelector('.popup-photo__title')
    }
    open(name, link) {
        super.open();
        this._link.src = link;
        this._name.textContent = name;
        this._link.alt = name;
    }
}
