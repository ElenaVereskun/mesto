
export default class FormValidator {
  constructor(options, form) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._errorClassActive = options.errorClassActive,
      this._inputErrorClass = options.inputErrorClass;
    this._form = form;
    console.log(options.inputSelector);
  }
  _hiddenError = () => {  //ф-ция скрывает ошибку
    this._errorInput.textContent = '';
    this._errorInput.classList.remove(this._options.errorClassActive);
    this._inputSelector.classList.remove(this._options.inputErrorClass);
  };
  _showError = () => {  //ф-ция показывает ошибку
    this._errorInput.textContent = message;
    this._errorInput.classList.add(this._options.errorClassActive);
    this._inputSelector.classList.add(this._options.inputErrorClass);
  };
  _toggleErrorState = () => {   //проверка на валидность
    this._errorInput = this._form.querySelector(`.${this._inputSelector.id}-error`); //показ ошибки под инпутом
    if (this._inputSelector.validity.valid) {
      this._hiddenError();
    } else {
      this._showError();
    }
  };
  _disableButton = () => { //кнопка не активна
    this._submitButton.setAttribute('disabled', 'true');
    this._submitButton.classList.add(this._options.inactiveButtonClass);
  };
  _enableButton = () => { //кнопка активна
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._options.inactiveButtonClass);
  };
  _togglePopupAddButton = () => {   //активна кнопка, если оба поля валидны
    if (this._inputSelector.validity.valid) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };
  _setEventListeners = () => {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector)); //массив всех инпутов
    this._submitButton = this._form.querySelector(this._submitButtonSelector); //кнопка сохранить
    this._inputs.forEach(input => {    // обходим массив импутов
      input.addEventListener('input', () => {
        this._toggleErrorState();
        this._togglePopupAddButton();
      });
      this._togglePopupAddButton();
    });
  };
  //метод, включающий валидацию формы
  enableValidation = () => {
    this._setEventListeners();
  };
}


/* const hiddenError = (inputSelector, errorInput, options) => {  //ф-ция скрывает ошибку
  errorInput.textContent = '';
  errorInput.classList.remove(options.errorClassActive);
  inputSelector.classList.remove(options.inputErrorClass);
};

const showError = (inputSelector, errorInput, message, options) => {  //ф-ция показывает ошибку
  errorInput.textContent = message;
  errorInput.classList.add(options.errorClassActive);
  inputSelector.classList.add(options.inputErrorClass);
};

const toggleErrorState = (inputSelector, formSelector, options) => {   //проверка на валидность
  const isValid = inputSelector.validity.valid;
  const errorInput = formSelector.querySelector(`.${inputSelector.id}-error`); //показ ошибки под инпутом
  if (isValid) {
    hiddenError(inputSelector, errorInput, options);
  } else {
    showError(inputSelector, errorInput, inputSelector.validationMessage, options);
  }
};

const disableButton = (submitButton, options) => { //кнопка не активна
  submitButton.setAttribute('disabled', 'true');
  submitButton.classList.add(options.inactiveButtonClass);
};

const enableButton = (submitButton, options) => { //кнопка активна
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove(options.inactiveButtonClass);
};
const togglePopupAddButton = (inputs, submitButton, options) => {   //активна кнопка, если оба поля валидны
  const formIsValid = inputs.every(inputSelector => inputSelector.validity.valid);
  if (formIsValid) {
    enableButton(submitButton, options);
  } else {
    disableButton(submitButton, options);
  }
};

const setEventListeners = (formSelector, options) => {
  const inputs = Array.from(formSelector.querySelectorAll(options.inputSelector)); //массив всех инпутов
  const submitButton = formSelector.querySelector(options.submitButtonSelector); //кнопка сохранить
  inputs.forEach(input => {    // обходим массив импутов
    input.addEventListener('input', () => {
      toggleErrorState(input, formSelector, options);
      togglePopupAddButton(inputs, submitButton, options);
    });
    togglePopupAddButton(inputs, submitButton, options);
  });
};
///создать экземпляр класса 
const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));  //массив элементов, найденных по тегу
  forms.forEach(form => {
    setEventListeners(form, options);
  });
};
//вызвать метод после создания. Публичный !

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClassActive: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
});
 */