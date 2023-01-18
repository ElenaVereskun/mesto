const popup = document.querySelector('.popup');
const buttonEdit = popup.querySelector('.profile__edit-button');
const buttonClose = popup.querySelector('.popup__close-button');
let popupForm = document.querySelector('.popup__form');
let popupName = popupForm.querySelector('popup_user-info_name');
let popupJob = popupForm.querySelector('popup_user-info_job');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function hendler() {
    profileName.textContent;
    profileJob.textContent;

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    popupName.value;
    popupJob.value;

    profileName.textContent;
    profileJob.textContent;

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
}
popupForm.addEventListener('submit', handleFormSubmit);

buttonEdit.addEventListener('click', hendler => {
    popup.classList.add('popup_opened');
});

buttonClose.addEventListener('click', hendler => {
    popup.classList.remove('popup_opened');
});
