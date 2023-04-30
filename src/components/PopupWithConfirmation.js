import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
    constructor(popup, removeCard) {
        super(popup);
        this._elementForm = this._getElement();
        this._removeCard = removeCard
    }
    open(cardData) {
        super.open();
        this._data = cardData;
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
            this._removeCard(this._data);
        });
    }
}
