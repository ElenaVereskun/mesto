const options = {
  formSelector: '.popup__form',
  submitSelector: '.popup__save-button',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_disabled',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorSelector: '.popup__error',
  errorClassActive: 'popup__error_active'
};

/*const formPopup = document.querySelectorAll(options.formSelector); //найденЫ формы

 const setEventListeners = (formPopup) => {
  const inputs = Array.from(formPopup.querySelectorAll(options.inputSelector)); //массив всех инпутов
  const popupSaveButton = formPopup.querySelector(options.submitSelector); //кнопка сохранить

  inputs.forEach(input => {    // обходим массив импутов
    input.addEventListener('input', () => {
      const isValid = input.validity.valid;
      inputForm = input.closest(options.formSelector);
      const errorInput = inputForm.querySelector(options.errorClass);

      if (isValid) {
        errorInput.innerText = '';
        errorInput.classList.remove(options.errorClassActive);
      } else {
        errorInput.innerText = input.validationMessage;
        errorInput.classList.add(options.errorClassActive);
      }
      togglePopupSaveButton(inputs, popupSaveButton);
    });
  });

  const input = formPopup.querySelector('input');  //находим первый инпут в форме

  const togglePopupSaveButton = (inputs, popupSaveButton) => {   //активна кнопка, если оба поля валидны
    const formIsValid = inputs.every(input => input.validity.valid);
    if (formIsValid) {
      popupSaveButton.removeAttribute('disabled');
      popupSaveButton.classList.remove(options.inactiveButtonClass);
      input.classList.remove(options.inputErrorSelector);
    } else {
      popupSaveButton.setAttribute('disabled', 'true');
      popupSaveButton.classList.add(options.inactiveButtonClass);
      input.classList.add(options.inputErrorSelector);
    }
  };
  togglePopupSaveButton(inputs, popupSaveButton);
}

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));  //массив элементов, найденных по тегу
  forms.forEach(formPopup => {
    setEventListeners(formPopup);
  });
};
enableValidation(); */

const formPopup = document.querySelector(options.formSelector); //найдены все формы
const input = document.querySelector('input');  //находим первый инпут в форме

const hiddenError = (errorInput) => {  //ф-ция скрывает ошибку
  errorInput.textContent = '';
  errorInput.classList.remove(options.errorClassActive);
}

const showError = (errorInput, message) => {  //ф-ция показывает ошибку
  errorInput.textContent = message;
  errorInput.classList.add(options.errorClassActive);
}
const toggleErrorState = (input, options) => {   //проверка на валидность
  const isValid = input.validity.valid;
  const inputForm = input.closest(options.formSelector);
  const errorInput = inputForm.querySelector(options.errorSelector);

  if (isValid) {
    hiddenError(errorInput, options.errorClassActive);
  } else {
    showError(errorInput, input.validationMessage, options.errorClassActive);
  }
};

const enableButton = (popupSaveButton) => { //кнопка активна
  popupSaveButton.removeAttribute('disabled');
  popupSaveButton.classList.remove(options.inactiveButtonClass);
};

const disableButton = (popupSaveButton) => { //кнопка не активна
  popupSaveButton.setAttribute('disabled', 'true');
  popupSaveButton.classList.add(options.inactiveButtonClass);
};

const enableInput = (input) => {
  input.classList.remove(options.inputErrorClass); //не активное красное подчёркивание инпута
};
const disableInput = (input) => {
  input.classList.add(options.inputErrorClass);  //активно красное подчёркивание инпута
};

const togglePopupSaveButton = (inputs, popupSaveButton, options) => {   //активна кнопка, если оба поля валидны
  const formIsValid = inputs.every(input => input.validity.valid);
  if (formIsValid) {
    enableButton(popupSaveButton, options.inactiveButtonClass);
    enableInput(input, options.inputErrorClass);
  } else {
    disableButton(popupSaveButton, options.inactiveButtonClass);
    disableInput(input, options.inputErrorClass);
  }
};

const setEventListeners = (formPopup) => {
  const inputs = Array.from(formPopup.querySelectorAll(options.inputSelector)); //массив всех инпутов
  const popupSaveButton = formPopup.querySelector(options.submitSelector); //кнопка сохранить

  inputs.forEach(input => {    // обходим массив импутов
    input.addEventListener('input', () => {
      toggleErrorState(input, options);
      togglePopupSaveButton(inputs, popupSaveButton, options.inactiveButtonClass);
    });
    togglePopupSaveButton(inputs, popupSaveButton, options.inactiveButtonClass);
  });
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));  //массив элементов, найденных по тегу
  forms.forEach(formPopup => {
    setEventListeners(formPopup);
  });
};

enableValidation(options); //передаём все параметры