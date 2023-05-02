import Popup from "./Popup";
export default class PopupWithForm extends Popup {
    constructor({ popup, handleFormSubmit }) {
        super(popup);
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._elementForm = this._getElement();
        this._handleFormSubmit = handleFormSubmit;
        this._buttonSubmit = this._popup.querySelector('.popup__save-button');
        this.defaultMessage = this._buttonSubmit.textContent;
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
            this._handleFormSubmit(this._getInputValues());
        });
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    close() {
        super.close();
        this._elementForm.reset();
    }
    loading(isLoading, loadingMessage) {
        if (isLoading) {
            this._buttonSubmit.textContent = loadingMessage;
        } else {
            this._buttonSubmit.textContent = this.defaultMessage;
        }
    }
}
