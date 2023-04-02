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

const profile = document.querySelector('.profile');   //выбор элементов для попапа"редактировать профиль"
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const cardsContainer = document.querySelector('.elements');
const popupAdd = document.querySelector('.popup-add');             //аргументы для попапа,
const buttonAdd = document.querySelector('.profile__add-button'); //который добавляет фото
const popupAddForm = popupAdd.querySelector('.popup-add__form');
const popupAddLink = popupAddForm.querySelector('.popup-add__link');
const popupAddPlace = popupAddForm.querySelector('.popup-add__place');

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

/* function keyEscHandler(evt) {  //функция закрытия попапа по клику на 'Escape'
  if (evt.key === 'Escape') {
    const popupSome = document.querySelector('.popup_opened')
    closePopup(popupSome);
  }
}; */
/* function closePopupOverlay(evt) {  //функция закрытия попапа по клику на оверлэй
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}; */
/* function closePopup(popup) {           //ф-ция закрытия попапа
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyEscHandler); //удаление слушателя события Закрытия попапа по клику на Esc
}; */
/* function openPopup(popup) {            //ф-ция открытия попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyEscHandler);  //слушатель события Закрытия попапа по клику на Esc
}; */
buttonAdd.addEventListener('click', () => {    //слушатель события //открыть попап 'Новая карточка'
  openPopup(popupAdd);
  formValidatorPopupAdd.resetValidation();
});
// находим все крестики проекта по универсальному селектору
/* const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');  // находим 1 раз ближайший к крестику попап 
  button.addEventListener('click', () => closePopup(popup));  // устанавливаем обработчик закрытия на крестик
  popup.addEventListener('mousedown', closePopupOverlay);  //закрытие попапа по клику на оверлэй
}); */

/* function handleProfileFormSubmit(evt) {      //функция заполнения формы 
  evt.preventDefault();             //попапа редактирования профиля    

  profileName.textContent = profilePopupName.value;
  profileJob.textContent = profilePopupJob.value;

  closePopup(profilePopup)
}; */
/* profilePopupForm.addEventListener('submit', handleProfileFormSubmit); */

profileEditButton.addEventListener('click', () => {      //слушатель события //Добавить информацию 
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
});

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
/* popupAddForm.addEventListener('submit', (event) => {//слушатель события Добавить карточку
  event.preventDefault();
  addCard(createCard());
  event.target.reset();      //очистка формы от введённых значений
  closePopup(popupAdd);
}); */
//создание карточек
initialCards.forEach((item) => {
  const card = new Card(
    item, 
    '#element-template',
    handleCardClick = () => {
      this._element.querySelector('.element__link').addEventListener('click', () => {
        Popup.open(popupPhoto);
        popupPhotoLink.src = this._link;
        popupPhotoTitle.textContent = this._name;
        popupPhotoLink.alt = this._name;
      });
    });
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});
Section.renderItems();
Popup.setEventListeners();
PopupWithForm.generate();
PopupWithImage.generate();
UserInfo.getUserInfo();
//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
const PopupWithProfileForm = new PopupWithForm(
  profilePopup,
  handleFormSubmit = (evt) => {
      evt.preventDefault();             //попап редактирования профиля    
      profileName.textContent = profilePopupName.value;
      profileJob.textContent = profilePopupJob.value;
      Popup.close(profilePopup);
  }
);
PopupWithProfileForm.generate();

const PopupWithAddForm = new PopupWithForm(
  popupAdd,
  handleFormSubmit = (event) => {
    event.preventDefault();
    addCard(createCard());
    event.target.reset();      //очистка формы от введённых значений
    Popup.close(popupAdd);
  }
);
PopupWithAddForm.generate();