import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(name, link) {
        super.open();
        console.log(link.src)
        this._popupSelector.querySelector('.popup-photo__link').src = link;
        this._popupSelector.querySelector('.popup-photo__title').textContent = name;
        this._popupSelector.querySelector('.popup-photo__link').alt = name;
    }
}
