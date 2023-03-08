const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClassActive: 'popup__error_active'
};

const hiddenError = (errorInput) => {  //ф-ция скрывает ошибку
  errorInput.textContent = '';
  errorInput.classList.remove(options.errorClassActive);
};

const showError = (errorInput, message) => {  //ф-ция показывает ошибку
  errorInput.textContent = message;
  errorInput.classList.add(options.errorClassActive);
};

const toggleErrorState = (inputSelector) => {   //проверка на валидность
  const isValid = inputSelector.validity.valid;
  const errorInput = document.querySelector(`.${inputSelector.id}-error`); //показ ошибки под инпутом

  if (isValid) {
    hiddenError(errorInput);
  } else {
    showError(errorInput, inputSelector.validationMessage);
  }
};

const enableButton = (submitButtonSelector) => { //кнопка активна
  submitButtonSelector.removeAttribute('disabled');
  submitButtonSelector.classList.remove(options.inactiveButtonClass);
};

const disableButton = (submitButtonSelector) => { //кнопка не активна
  submitButtonSelector.setAttribute('disabled', 'true');
  submitButtonSelector.classList.add(options.inactiveButtonClass);
};

const togglePopupSaveButton = (inputs, submitButtonSelector, options) => {   //активна кнопка, если оба поля валидны
  const formSelector = document.querySelector(options.formSelector); //найдена форма
  const inputSelector = formSelector.querySelector(options.inputSelector);
  const formIsValid = inputs.every(inputSelector => inputSelector.validity.valid);
  if (formIsValid) {
    enableButton(submitButtonSelector);
  } else {
    disableButton(submitButtonSelector);
  }
};

const setEventListeners = (formSelector, options) => {
  const inputs = Array.from(formSelector.querySelectorAll(options.inputSelector)); //массив всех инпутов
  const submitButtonSelector = formSelector.querySelector(options.submitButtonSelector); //кнопка сохранить

  inputs.forEach(input => {    // обходим массив импутов
    input.addEventListener('input', () => {
      toggleErrorState(input);
      togglePopupSaveButton(inputs, submitButtonSelector, options);
    });
    togglePopupSaveButton(inputs, submitButtonSelector, options);
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
  errorClassActive: 'popup__error_active'
});
