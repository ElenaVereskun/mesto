import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
    constructor(popup, removeCard) {
        super(popup);
        this._elementForm = this._getElement();
        this._removeCard = removeCard;
        this._buttonSubmit = this._popup.querySelector('.popup-confirm__save-button');
        this.defaultMessage = this._buttonSubmit.textContent;
    }
    open(cardData, cardId) {
        super.open();
        this.cardData = cardData;
        this.cardId = cardId;
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
            this._removeCard(this.cardData, this.cardId);
        });
    }
    loading(isLoading, loadingMessage) {
        if (isLoading) {
            this._buttonSubmit.textContent = loadingMessage;
        } else {
            this._buttonSubmit.textContent = this.defaultMessage;
        }
    }
}
