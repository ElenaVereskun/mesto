const hiddenError = (inputSelector, errorInput, options) => {  //ф-ция скрывает ошибку
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

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));  //массив элементов, найденных по тегу
  forms.forEach(form => {
    setEventListeners(form, options);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClassActive: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
});