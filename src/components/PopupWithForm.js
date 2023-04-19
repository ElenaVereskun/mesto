import Popup from "./Popup";
export default class PopupWithForm extends Popup {
    constructor({ popup, handleFormSubmit }) {
        super(popup);
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._elementForm = this._getElement();
        this._handleFormSubmit = handleFormSubmit
    }
    _getElement() {
        const formPopup = this._popup
            .querySelector('.popup__form');
        return formPopup;
    }
    getForm() {
        this._elementForm = this._getElement();
        return this._elementForm;
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
}
