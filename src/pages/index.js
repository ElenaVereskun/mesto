import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';

const profilePopup = document.querySelector('.profile-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupForm = document.querySelector('.profile-popup__form');
const profilePopupName = profilePopupForm.querySelector('.profile-popup__user_info_name');
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__user_info_job');
const popupAdd = document.querySelector('.popup-add');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup-add__form');
const popupPhoto = document.querySelector('.popup-photo');

const options = ({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClassActive: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
});

const formValidatorPopupAdd = new FormValidator(options, popupAddForm);
formValidatorPopupAdd.enableValidation();

const formValidatorPopupProfile = new FormValidator(options, profilePopupForm);
formValidatorPopupProfile.enableValidation();

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const popupWithImage = new PopupWithImage(popupPhoto);

function createCard(data) {
  const card = new Card(data, '#element-template', (name, link) => {
    popupWithImage.open(name, link);
    popupWithImage.setEventListeners();
  });
  return card.generateCard();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (data) => {
    return createCard(data);
  },
},
  '.elements'
);
cardsList.renderItems();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

profileEditButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  popupWithProfileForm.setEventListeners();
  const getElements = userInfo.getUserInfo();
  profilePopupName.value = getElements.name;
  profilePopupJob.value = getElements.job;
});

const popupWithProfileForm = new PopupWithForm({
  popup: profilePopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.name, data.job);
    popupWithProfileForm.close();
  }
});
popupWithProfileForm.getForm();

buttonAdd.addEventListener('click', () => {
  popupWithAddForm.open();
  popupWithAddForm.setEventListeners();
  formValidatorPopupAdd.resetValidation();
});

const popupWithAddForm = new PopupWithForm({
  popup: popupAdd,
  handleFormSubmit: (data) => {
    const cardNew = createCard(data);
    cardsList.addItem(cardNew);
    popupWithAddForm.close();
  }
});
popupWithAddForm.getForm();
