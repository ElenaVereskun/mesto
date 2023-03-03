
/* function enableValidation(form) {
    
    const inputs = Array.from(form)/* .filter(i.tagName !== 'BUTTON') */;
    /*form.addEventListener('submit', (event) => {
    
    for(const input of inputs) {
      if(input.checkValidity()){
           resetError(input)
      }else{
          event.preventDefault()
          activateError(input)
      }
    }
    });
    inputs.forEach(input => {
      input.addEventListener('keypress', () =>{
        for(const input of inputs) {
          if(input.checkValidity()){
               resetError(input)
          }else{
              activateError(input)
          }
        }
      })
    })
  };
  enableValidation(profilePopupForm);
  enableValidation(popupAddForm);
  
  function activateError(element) { //добавление класса /валидация форм
    element.paternNode.classList.add('popup__form_valid');
  }
  
  function resetError(element) {   //удаление класса /валидация формы
    element.paternNode.classList.remove('popup__form_valid');
    element.textContent = '';
  } */
const enableValidation = () => {

}

const setEventListeners = () => {
  
}

const input = profilePopupForm.querySelector('.profile-popup__user');  //находим первый инпут в форме
const inputs = Array.from(profilePopupForm.querySelectorAll('.profile-popup__user')); //массив всех импутов
const profileSaveButton = profilePopupForm.querySelector('.profile-popup__save-button'); //кнопка сохранить

inputs.forEach(input => {    // обходим массив импутов
  input.addEventListener('input', () => {
    const isValid = input.validity.valid;
    inputForm = input.parentNode;
    const errorInput = inputForm.querySelector('.profile-popup__error');

    if(isValid){
      errorInput.innerText = '';
      errorInput.classList.remove('profile-popup__error_active');
    }else{
      errorInput.innerText = input.validationMessage;
      errorInput.classList.add('profile-popup__error_active');
    }
    toggleProfileSaveButton(inputs, profileSaveButton);
  });
});


const toggleProfileSaveButton = (inputs, profileSaveButton) => {   //активна кнопка, если оба поля валидны
  const formIsValid = inputs.every(input => input.validity.valid);                 
     
   if(formIsValid) {
     profileSaveButton.removeAttribute('disabled');
     profileSaveButton.classList.remove('profile-popup__save-button_inactive');
   }else{
     profileSaveButton.setAttribute('disabled', 'true');
     profileSaveButton.classList.add('profile-popup__save-button_inactive');
   }
};
toggleProfileSaveButton(inputs, profileSaveButton);