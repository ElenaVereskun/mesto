import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';

const profilePopup = document.querySelector('.profile-popup');
const profileEditButton = document.querySelector('.profile__edit-button');

const profilePopupForm = document.querySelector('.profile-popup__form');
/* const profilePopupName = profilePopupForm.querySelector('.profile-popup__user_info_name');
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__user_info_job'); */

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const cardsContainer = document.querySelector('.elements');
const popupAddSelector = document.querySelector('.popup-add');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup-add__form');
const popupAddLink = popupAddForm.querySelector('.popup-add__link');
const popupAddPlace = popupAddForm.querySelector('.popup-add__place');

const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoLink = popupPhoto.querySelector('.popup-photo__link');
const popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');

const options = ({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClassActive: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
});

//создание класса валидации для формы добавления новой карточки
const formValidatorPopupAdd = new FormValidator(options, popupAddForm);
formValidatorPopupAdd.enableValidation();
//создание класса валидации для формы редактирования профиля
const formValidatorPopupProfile = new FormValidator(options, profilePopupForm);
formValidatorPopupProfile.enableValidation();

const initialCards = [    // исходный массив с ссылками на фото и названиями мест
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

formValidatorPopupAdd.resetValidation();
/* function createCard() {        //функция создания карточки
  const obj = {
    name: popupAddPlace.value,
    link: popupAddLink.value
  }
  const card = new Card(obj, '#element-template');
  return card.generateCard();
};
function addCard(card) {       //функция добавления новой карточки
  cardsContainer.prepend(card);
}; */





const popupWithImage = new PopupWithImage('.popup-photo', initialCards);
//создание карточек

const cardsList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#element-template', () => {
      popupWithImage.open();
    });
    const cardElement = card.generateCard();
    return cardElement;
  },
},
  '.elements'
);
cardsList.renderItems();


const popupProfileClass = new Popup(profilePopup);
popupProfileClass.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

profileEditButton.addEventListener('click', () => {
  popupProfileClass.open();
  const getElements = userInfo.getUserInfo();
  document.querySelector('.profile-popup__user_info_name').value = getElements.name;
  document.querySelector('.profile-popup__user_info_job').value = getElements.job;
});

const popupWithProfileForm = new PopupWithForm({
  popupSelector: profilePopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.name, data.job);
    popupWithProfileForm.close();
  }
});
popupWithProfileForm.generate();

const popupAddClass = new Popup(popupAddSelector);
popupAddClass.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddClass.open();
  formValidatorPopupAdd.resetValidation();
});

const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (data) => {
    const card = new Card(data, '#element-template', () => {
      popupWithImage.open();
    });
    card.generateCard();
    cardsList.addItem();
    popupWithAddForm.close();
  }
});
popupWithAddForm.generate();