import { openPopup} from './index.js';
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
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    this._templateSelector = document.querySelector('#element-template');///????????????
    this._element = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    this._profile = document.querySelector('.profile');   //выбор элементов для попапа"редактировать профиль"
    this._profileName = this._profile.querySelector('.profile__name');
    this._profileJob = this._profile.querySelector('.profile__job');
    this._cardsContainer = document.querySelector('.elements');
    this._buttonLike = this._element.querySelector('.element__like'); //кнопка лайк
    this._buttonDelete = this._element.querySelector('.element__delete'); //кнопка корзина

    this._profilePopup = document.querySelector('.profile-popup');
    this._profileEditButton = document.querySelector('.profile__edit-button');

    this._profilePopupForm = document.querySelector('.profile-popup__form');
    this._profilePopupName = this._profilePopupForm.querySelector('.profile-popup__user_info_name');
    this._profilePopupJob = this._profilePopupForm.querySelector('.profile-popup__user_info_job');

    this._popupPhoto = document.querySelector('.popup-photo');   //выбор элементов для попапа"большое фото"
    this._popupPhotoClose = this._popupPhoto.querySelector('.popup-photo__close-button');
    this._popupPhotoLink = this._popupPhoto.querySelector('.popup-photo__link');
    this._popupPhotoTitle = this._popupPhoto.querySelector('.popup-photo__title');

    this._popupAdd = document.querySelector('.popup-add');             //аргументы для попапа,
    this._buttonAdd = document.querySelector('.profile__add-button'); //который добавляет фото
    this._buttonCloseAdd = this._popupAdd.querySelector('.popup-add__close-button');
    this._popupAddLink = document.querySelector('.popup-add__link');
    this._popupAddPlace = document.querySelector('.popup-add__place');
    this._popupAddForm = this._popupAdd.querySelector('.popup-add__form');
    // вернём DOM-элемент карточки
    return this._element;
  };
  generateCard() {
    this._getTemplate();
    const cardImage = this._element.querySelector('.element__link');
    const cardName = this._element.querySelector('.element__title');
    cardImage.src = this._link;
    cardName.textContent = this._name;
    cardImage.alt = this._name;

    // Вернём элемент наружу
    return this._element;
  }
  _profileEditButtonListener() {      //слушатель события //изменить информацию 
    this._profileEditButton.addEventListener('click', () => {
      Card._openProfilePopupEdit();
    });
  }
  _openProfilePopupEdit() {      //изменить информацию 
    openPopup(this._profilePopup);
    this._profilePopupName.value = this._profileName.textContent;
    this._profilePopupJob.value = this._profileJob.textContent;
  }
_buttonAddListener(){
  this._buttonAdd.addEventListener('click', () => {    //слушатель события //открыть попап 'Новая карточка'
   Card._popupAddListener();
  });
}
_popupAddListener(){
  openPopup(this._popupAdd);
  const formSelector = this._popupAdd.querySelector('.popup__form');
  const submitButton = formSelector.querySelector('.popup__save-button');
  const options = { inactiveButtonClass: 'popup__save-button_inactive' };
  disableButton(submitButton, options);  //кнопка не активна после отправки формы
}

  _buttonDeleteListener() {     // слушатель события удалить карточку
    this._buttonDelete.addEventListener('click', Card._handleDelete());
  }
  _handleDelete(evt) {
    evt.target.closest('.element').remove();    //метод удалить карточку
  }

  _buttonLikeListener() {     // слушатель события поставить лайк
    this._buttonLike.addEventListener('click', Card._handleLike());
  }
  _handleLike = () => {             //метод поставить лайк
    this._buttonLike.classList.toggle('element__like_active');
  };
  _openPopupPhotoListener() {  // стушатель попапа Большое фото
    this._element.querySelector('.element__link').addEventListener('click', () => {
      Card._openPopupPhoto();
    });
  }
  _openPopupPhoto() {  // открытие попапа Большое фото
    openPopup(this._popupPhoto);
    this._popupPhotoLink.src = data.link;
    this._popupPhotoTitle.textContent = data.name;
    this._popupPhotoLink.alt = data.name;
  }
}
//переберём весь исходный массив
initialCards.forEach((item) => {
  const card = new Card(item); // передаём объект аргументом
  const cardElement = card.generateCard();
  document.body.append(cardElement);
});
popupAddForm.addEventListener('submit', handleCardFormSubmit);