
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
const input = profilePopupForm.querySelector('.profile-popup__user');
const inputs = profilePopupForm.querySelectorAll('.profile-popup__user');
const profileSaveButton = profilePopupForm.querySelector('.profile-popup__save-button');

inputs.forEach(input => {
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
  });
});

let formIsValid = true;
for(let i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  const isValid = input.validity.valid;
  if(!isValid) {
    formIsValid = false;
    break;
  }
}

if(formIsValid) {
  profileSaveButton.disabled ='';
  profileSaveButton.classList.remove('profile-popup__save-button_inactive');
}else{
  profileSaveButton.disabled ='true';
  profileSaveButton.classList.add('profile-popup__save-button_inactive');
}
profileSaveButton.disabled ='';
 profileSaveButton.classList.remove('profile-popup__save-button_inactive');
