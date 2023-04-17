import Popup from "./Popup";
export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit
    }
    _getElement() {
        const formElement = this._popupSelector
        .querySelector('.popup__form');            
        return formElement;
    }
    generate() {
        this._element = this._getElement();        
        this.setEventListeners();
        return this._element;
    }
    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._element.reset();
        });
    }
    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    close() {
        super.close();
        this._element.reset();
    }
}
