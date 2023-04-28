import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
    constructor(popup, removeCard) {
        super(popup);
        this._elementForm = this._getElement();
        this._removeCard = removeCard
    }
    open(cardId) {
        console.log(cardId);//undefined какой-то объект пустой
        super.open();
        this._data = cardId;
    }
    _getElement() {
        const formPopup = this._popup
            .querySelector('.popup__form');
        return formPopup;
    }
    setEventListeners(cardData) {
        super.setEventListeners();
        this._elementForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log(cardData);//undefined
            this._removeCard(cardData);
        });
    }
}
