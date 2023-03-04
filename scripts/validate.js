const formPopup = document.querySelectorAll('form'); //найденЫ формы

const setEventListeners = (formPopup) => {
  const inputs = Array.from(formPopup.querySelectorAll('input')); //массив всех инпутов
  const popupSaveButton = formPopup.querySelector('.popup__save-button'); //кнопка сохранить

  inputs.forEach(input => {    // обходим массив импутов
    input.addEventListener('input', () => {
      const isValid = input.validity.valid;
      inputForm = input.parentNode;
      const errorInput = inputForm.querySelector('.popup__error');

      if (isValid) {
        errorInput.innerText = '';
        errorInput.classList.remove('popup__error_active');
      } else {
        errorInput.innerText = input.validationMessage;
        errorInput.classList.add('popup__error_active');
      }
      togglePopupSaveButton(inputs, popupSaveButton);
    });
  });

  const input = formPopup.querySelector('input');  //находим первый инпут в форме

  const togglePopupSaveButton = (inputs, popupSaveButton) => {   //активна кнопка, если оба поля валидны
    const formIsValid = inputs.every(input => input.validity.valid);
    if (formIsValid) {
      popupSaveButton.removeAttribute('disabled');
      popupSaveButton.classList.remove('popup__save-button_inactive');
      input.classList.remove('popup__input_disabled');
    } else {
      popupSaveButton.setAttribute('disabled', 'true');
      popupSaveButton.classList.add('popup__save-button_inactive');
      input.classList.add('popup__input_disabled');
    }
  };
  togglePopupSaveButton(inputs, popupSaveButton);
}

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll('form'));  //массив элементов, найденных по тегу
  forms.forEach(formPopup => {
    setEventListeners(formPopup);
  });
};
enableValidation();