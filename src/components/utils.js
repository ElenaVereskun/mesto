export {profilePopup, 
    profileEditButton, 
    profilePopupForm, 
    profilePopupName, 
    profilePopupJob,
    popupAdd,
    buttonAdd,
    popupAddForm,
    popupPhoto,
    popupConfirmation,
    popupAvatar,
    popupAvatarForm,
    buttonEditAvatar,
    options,
    profileName,
    profileJob,
    profileAvatar
};
const profilePopup = document.querySelector('.profile-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupForm = document.querySelector('.profile-popup__form');
const profilePopupName = profilePopupForm.querySelector('.profile-popup__user_info_name');
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__user_info_job');
const popupAdd = document.querySelector('.popup-add');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup-add__form');
const popupPhoto = document.querySelector('.popup-photo');
const popupConfirmation = document.querySelector('.popup-confirm');
const popupAvatar = document.querySelector('.popup-avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup-avatar__form');
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');

const options = ({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClassActive: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
});

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar');

