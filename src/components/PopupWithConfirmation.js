import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
    constructor(popup){
        super(popup);
        this._elementForm = this._getElement();
    }

    _getElement() {
        const formPopup = this._popup
            .querySelector('.popup__form');
        return formPopup;
    }

    setEventListeners() {
        super.setEventListeners();
        this._elementForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDelete();
        });
    }
    _handleDelete() {
        this._elementForm.remove();
        this._elementForm = null;
    }
}