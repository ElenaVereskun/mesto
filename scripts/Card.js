import { openPopup, closePopup } from './index.js';
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
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };
  generateCard() {
    this._element = this._getTemplate();

    this._cardsContainer = document.querySelector('.elements');
    this._profile = document.querySelector('.profile');   //выбор элементов для попапа"редактировать профиль"
    this._profileName = this._profile.querySelector('.profile__name');
    this._profileJob = this._profile.querySelector('.profile__job');

    this._buttonLike = this._element.querySelector('.element__like'); //кнопка лайк
    this._buttonDelete = this._element.querySelector('.element__delete'); //кнопка корзина

    this._profilePopup = document.querySelector('.profile-popup');
    this._profileEditButton = document.querySelector('.profile__edit-button');

    this._profilePopupForm = document.querySelector('.profile-popup__form');
    this._profilePopupName = this._profilePopupForm.querySelector('.profile-popup__user_info_name');
    this._profilePopupJob = this._profilePopupForm.querySelector('.profile-popup__user_info_job');

    this._popupPhoto = document.querySelector('.popup-photo');   //выбор элементов для попапа"большое фото"
    this._popupPhotoLink = this._popupPhoto.querySelector('.popup-photo__link');
    this._popupPhotoTitle = this._popupPhoto.querySelector('.popup-photo__title');

    this._popupAdd = document.querySelector('.popup-add');             //аргументы для попапа,
    this._buttonAdd = document.querySelector('.profile__add-button'); //который добавляет фото
    this._popupAddForm = this._popupAdd.querySelector('.popup-add__form');
    this._popupAddLink = this._popupAdd.querySelector('.popup-add__link');
    this._popupAddPlace = this._popupAdd.querySelector('.popup-add__place');

    this._buttonLikeListener();  //вызов метода //лайк фото
    this._buttonDeleteListener();  //вызов метода //удаление карточки
    this._openPopupPhotoListener();  //вызов метода //открыть попап 'Большое фото'
    this._profileEditButtonListener();//вызов метода Изменить данные
    this._buttonAddListener();        //вызов метода открыть попап Новая карточка

    this._popupAddCardFormSubmit();  //добавить новую карточку
    this._profilePopupFormSubmit();  //сохранить изменения в редактировании данных


    this._element.querySelector('.element__link').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__link').alt = this._name;

    // Вернём элемент наружу
    return this._element;
  }
  _profileEditButtonListener() {      //слушатель события //изменить информацию 
    this._profileEditButton.addEventListener('click', () => {
      this._openProfilePopupEdit();
    });
  }
  _openProfilePopupEdit() {      //изменить информацию 
    openPopup(this._profilePopup);
    this._profilePopupName.value = this._profileName.textContent;
    this._profilePopupJob.value = this._profileJob.textContent;
  }
  _buttonAddListener() {
    this._buttonAdd.addEventListener('click', () => {    //слушатель события //открыть попап 'Новая карточка'
      this._openPopupAdd();
    });
  }
  _openPopupAdd() {
    openPopup(this._popupAdd);
    /*     const formSelector = this._popupAdd.querySelector('.popup__form');
        const submitButton = formSelector.querySelector('.popup__save-button');
        const options = { inactiveButtonClass: 'popup__save-button_inactive' };
        disableButton(submitButton, options);  //кнопка не активна после отправки формы */
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
  _popupAddCardFormSubmit() {
    this._popupAddForm.addEventListener('submit', () => {
      this._handleCardFormSubmit();
    });
  }
  _handleCardFormSubmit(event) {    //заполнение формы
    event.preventDefault();
    const obj = {
      name: this._popupAddPlace.value,
      link: this._popupAddLink.value
    }
/*     this._cardsContainer.prepend(this.generateCard(obj));
       event.target.reset();       //очистка формы от введённых значений
       closePopup(popupAdd); */
  };
  _profilePopupFormSubmit() {
    this._profilePopupForm.addEventListener('submit', () => {
      this._handleProfileFormSubmit;
    });
  }
  _handleProfileFormSubmit(evt) {      //функция заполнения формы 
    evt.preventDefault();             //попапа редактирования профиля    

    this._profileName.textContent = this._profilePopupName.value;
    this._profileJob.textContent = this._profilePopupJob.value;

    closePopup(this._profilePopup)
  };
}
//создание карточек
initialCards.forEach((item) => {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});
const newCard = new Card(obj,'#element-template');
const cardElement = newCard.generateCard();
document.querySelector('.elements').append(cardElement);
