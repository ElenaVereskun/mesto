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
const profilePopupName = profilePopupForm.querySelector('.profile-popup__user_info_name');
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__user_info_job');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const cardsContainer = document.querySelector('.elements');
const popupAdd = document.querySelector('.popup-add');
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
function createCard() {        //функция создания карточки
  const obj = {
    name: popupAddPlace.value,
    link: popupAddLink.value
  }
  const card = new Card(obj, '#element-template');
  return card.generateCard();
};
function addCard(card) {       //функция добавления новой карточки
  cardsContainer.prepend(card);
};
//создание карточек
const cardsList = new Section({
  data: initialCards,
  renderer: () => {
    const card = new Card({
      items: initialCards,
      templateSelector: document.querySelector('#template')
    },
      handleCardClick = () => {
        this._element.querySelector('.element__link').addEventListener('click', () => {
        PopupWithImage.open(popupPhoto);
          popupPhotoLink.src = this._link;
          popupPhotoTitle.textContent = this._name;
          popupPhotoLink.alt = this._name;
        });
      })
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
  },
},
  cardsContainer
);
cardsList.renderItems();

buttonAdd.addEventListener('click', () => {    //слушатель события //открыть попап 'Новая карточка'
  PopupWithImage.open(popupAdd);
  formValidatorPopupAdd.resetValidation();
});

profileEditButton.addEventListener('click', () => {
  Popup.open(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
});

const PopupWithProfileForm = new PopupWithForm({
  popup: profilePopup = document.querySelector('.profile-popup'),             //попап редактирования профиля    
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    profileName.textContent = profilePopupName.value;
    profileJob.textContent = profilePopupJob.value;
    Popup.close(profilePopup);
  }
}
);
PopupWithProfileForm.setEventListeners();
const PopupWithAddForm = new PopupWithForm({
  popup: popupAdd = document.querySelector('.popup-add'),
  handleFormSubmit: (event) => {
    event.preventDefault();
    addCard(createCard());
    event.target.reset();
    Popup.close(popupAdd);
  }
}
);
PopupWithAddForm.setEventListeners();

UserInfo.getUserInfo();
