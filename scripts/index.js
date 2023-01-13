const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    popup.classList.remove('popup_opened');
});

let popupForm = document.querySelector('.popup__form');
let popupName = popupForm.querySelector('.popup__name');
let popupAbout = popupForm.querySelector('.popup__about');

function handleFormSubmit(evt) {
    evt.preventDefault();

    console.log(popupName.value);
    console.log(popupAbout.value);

    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');

    console.log(profileName.textContent);
    console.log(profileAbout.textContent);

    profileName.textContent = 'popupName.value';
    profileAbout.textContent = 'popupAbout.value';
}
popupForm.addEventListener('submit', handleFormSubmit);



