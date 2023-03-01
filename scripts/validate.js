const profilePopupForm = document.querySelector('.profile-popup__form');
const popupAddForm = popupAdd.querySelector('.popup-add__form');


function enableValidation(form) {
    const inputs = Array.from(form).filter(i.tagName !== 'BUTTON');
    form.addEventListener('submit', (event) => {
    
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
    element.paternNode.classList.add('profile-popup__form_valid');
  }
  
  function resetError(element) {   //удаление класса /валидация формы
    element.paternNode.classList.remove('profile-popup__form_valid');
    element.textContent = '';
  }