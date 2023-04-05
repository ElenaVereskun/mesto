export default class PopupWithImage extends Popup {
    constructor(popupSelector, data) {
        super(popupSelector);
        this._name = data.name;
        this._link = data.link;
    }
    open() {
        super.open();
        this._element.querySelector('.element__link').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }
}