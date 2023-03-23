import { openPopup } from './index.js';
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__link').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__link').alt = this._name;
    this._setEventListener();
    // Вернём элемент наружу
    return this._element;
  }
  _setEventListener() {
    this._cardsContainer = document.querySelector('.elements');

    this._buttonLike = this._element.querySelector('.element__like'); //кнопка лайк
    this._buttonDelete = this._element.querySelector('.element__delete'); //кнопка корзина
    //выбор элементов для попапа"большое фото"
    this._popupPhoto = document.querySelector('.popup-photo');
    this._popupPhotoLink = this._popupPhoto.querySelector('.popup-photo__link');
    this._popupPhotoTitle = this._popupPhoto.querySelector('.popup-photo__title');

    this._buttonLikeListener();  //вызов метода //лайк фото
    this._buttonDeleteListener();  //вызов метода //удаление карточки
    this._openPopupPhotoListener();  //вызов метода //открыть попап 'Большое фото'
  }
  _buttonDeleteListener() {     // слушатель события удалить карточку
    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });
  }
  _handleDelete() {    //метод удалить карточку
    this._buttonDelete.closest('.element').remove();
  }
  _buttonLikeListener() {     // слушатель события поставить лайк
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });
  }
  _handleLike() {             //метод поставить лайк
    this._buttonLike.classList.toggle('element__like_active');
  };
  _openPopupPhotoListener() {  // стушатель попапа Большое фото
    this._element.querySelector('.element__link').addEventListener('click', () => {
      this._openPopupPhoto();
    });
  }
  _openPopupPhoto() {  // открытие попапа Большое фото
    openPopup(this._popupPhoto);
    this._popupPhotoLink.src = this._link;
    this._popupPhotoTitle.textContent = this._name;
    this._popupPhotoLink.alt = this._name;
  }
}