import Popup from "./Popup";
export default class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        this._popup = super(popup);
        this._handleFormSubmit = handleFormSubmit();// колбэк сабмита формы.
    }
    _getElement() {
        const formElement = document
            .querySelector(this._popup)
            .content
            .querySelector('.popup__form')
            .cloneNode(true);

        return formElement;
    }
    setEventListeners() {// еще добавлять обработчик сабмита формы.
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
            this._element.reset();
        });
    }
    _getInputValues() {//собирает данные всех полей формы.
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    generate() {
        this._element = this._getElement(); // создаём элемент
        this._setEventListeners(); // добавляем обработчики
        return this._element; // возвращаем наружу
    }

    close(event) {
        super.close();
        event.target.reset();//при закрытии попапа форма должна ещё и сбрасываться.
    }
}
