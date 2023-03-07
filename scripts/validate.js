const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClassActive: 'popup__error_active'
};

const formSelector = document.querySelector(options.formSelector); //найдена форма
const inputSelector = formSelector.querySelector(options.inputSelector);  //находим инпут в форме

const hiddenError = (errorInput) => {  //ф-ция скрывает ошибку
  errorInput.textContent = '';
  errorInput.classList.remove(options.errorClassActive);
}

const showError = (errorInput, message) => {  //ф-ция показывает ошибку
  errorInput.textContent = message;
  errorInput.classList.add(options.errorClassActive);
}

const toggleErrorState = (inputSelector, options) => {   //проверка на валидность
  /* const formSelector = document.querySelector(options.formSelector); //найдена форма
  const inputSelector = formSelector.querySelector(options.inputSelector); */
  const isValid = inputSelector.validity.valid;
  const inputForm = inputSelector.closest(options.inputSelector);
  const errorInput = document.querySelector(`.${inputForm.id}-error`); //показ ошибки под инпутом

  if (isValid) {
    hiddenError(errorInput, options.errorClassActive);
  } else {
    showError(errorInput, inputSelector.validationMessage, options.errorClassActive);
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
  /* const formSelector = document.querySelector(options.formSelector); //найдена форма
  const inputSelector = formSelector.querySelector(options.inputSelector); */
  const formIsValid = inputs.every(inputSelector => inputSelector.validity.valid);
  if (formIsValid) {
    enableButton(submitButtonSelector, options.inactiveButtonClass);
    inputSelector.classList.remove(options.inputErrorClass); //не активное красное подчёркивание инпута
  } else {
    disableButton(submitButtonSelector, options.inactiveButtonClass);
    inputSelector.classList.add(options.inputErrorClass);  //активно красное подчёркивание инпута
  }
};

const setEventListeners = (formSelector) => {
  /* const formSelector = document.querySelector(options.formSelector); //найдена форма */
  const inputs = Array.from(formSelector.querySelectorAll(options.inputSelector)); //массив всех инпутов
  const submitButtonSelector = formSelector.querySelector(options.submitButtonSelector); //кнопка сохранить

  inputs.forEach(input => {    // обходим массив импутов
    input.addEventListener('input', () => {
      toggleErrorState(input, options);
      togglePopupSaveButton(inputs, submitButtonSelector, options.inactiveButtonClass);
    });
    togglePopupSaveButton(inputs, submitButtonSelector, options.inactiveButtonClass);
  });
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));  //массив элементов, найденных по тегу
  forms.forEach(form => {
    setEventListeners(form);
  });
};
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClassActive: 'popup__error_active'
});
