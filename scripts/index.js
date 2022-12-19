const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    popup.classList.add('.popup_opened');
});

closeButton.addEventListener('click', () => {
    popup.classList.remove('.popup_opened');
});
 















let formElement = document.querySelector('.profile');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    console.log(popupName.value);
    console.log(popupAbout.value);

    // Получите значение полей jobInput и nameInput из свойства value
    let popupName = popup.querySelector('.popup__name');
    let popupAbout = popup.querySelector('.popup__about');
    // Выберите элементы, куда должны быть вставлены значения полей
    console.log(profileName.textContent);
    console.log(profileAbout.textContent);
    // Вставьте новые значения с помощью textContent
}

formElement.addEventListener('submit', handleFormSubmit);