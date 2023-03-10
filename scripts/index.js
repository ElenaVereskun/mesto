const profilePopup = document.querySelector('.profile-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');

const profilePopupForm = document.querySelector('.profile-popup__form');
const profilePopupName = profilePopupForm.querySelector('.profile-popup__user_info_name');
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__user_info_job');

const profile = document.querySelector('.profile');   //выбор элементов для попапа"редактировать профиль"
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const popupPhoto = document.querySelector('.popup-photo');   //выбор элементов для попапа"большое фото"
const popupPhotoClose = popupPhoto.querySelector('.popup-photo__close-button');
const popupPhotoLink = popupPhoto.querySelector('.popup-photo__link');
const popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');

const popupAdd = document.querySelector('.popup-add');             //аргументы для попапа,
const buttonAdd = document.querySelector('.profile__add-button'); //который добавляет фото
const buttonCloseAdd = popupAdd.querySelector('.popup-add__close-button');
const popupAddLink = document.querySelector('.popup-add__link');
const popupAddPlace = document.querySelector('.popup-add__place');
const popupAddForm = popupAdd.querySelector('.popup-add__form');

function keyEscHandler(evt) {  //функция закрытия попапа по клику на 'Escape'
  if (evt.key === 'Escape') {
    const popupSome = document.querySelector('.popup_opened')
    closePopup(popupSome);
  }
};

function closePopupOverlay(evt) {  //функция закрытия попапа по клику на оверлэй
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

function closePopup(popup) {           //ф-ция закрытия попапа
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyEscHandler); //удаление слушателя события Закрытия попапа по клику на Esc
};

function openPopup(popup) {            //ф-ция открытия попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyEscHandler);  //слушатель события Закрытия попапа по клику на Esc
};

buttonAdd.addEventListener('click', () => {    //слушатель события //открыть попап 'Новая карточка'
  openPopup(popupAdd);
  const formSelector = popupAdd.querySelector('.popup__form');
  const submitButton = formSelector.querySelector('.popup__save-button');
  disableButton(submitButton);  //кнопка не активна после отправки формы
});

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');  // находим 1 раз ближайший к крестику попап 
  button.addEventListener('click', () => closePopup(popup));  // устанавливаем обработчик закрытия на крестик
  popup.addEventListener('mousedown', closePopupOverlay);  //закрытие попапа по клику на оверлэй
});

function handleProfileFormSubmit(evt) {      //функция заполнения формы 
  evt.preventDefault();             //попапа редактирования профиля    

  profileName.textContent = profilePopupName.value;
  profileJob.textContent = profilePopupJob.value;

  closePopup(profilePopup)
};
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

profileEditButton.addEventListener('click', () => {      //слушатель события //Добавить информацию 
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
});

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
const handleDelete = (evt) => {             //ф-ция удалить карточку
  evt.target.closest('.element').remove();
};

const handleLike = () => {             //ф-ция поставить лайк
  buttonLike.classList.toggle('element__like_active');
};

const template = document.querySelector('#element-template').content;  //выбор template элемента для создания карточки
const cardsContainer = document.querySelector('.elements');

function createCard(item) {              //функция создания карточки
  const cloneElement = template.querySelector('.element').cloneNode(true);
  const cardImage = cloneElement.querySelector('.element__link');
  const cardName = cloneElement.querySelector('.element__title');
  const buttonLike = cloneElement.querySelector('.element__like'); //кнопка лайк
  const buttonDelete = cloneElement.querySelector('.element__delete'); //кнопка корзина

  buttonLike.addEventListener('click', () => {   //слушатель события // лайк фото
    buttonLike.classList.toggle('element__like_active');
  });

  buttonDelete.addEventListener('click', handleDelete);   //слушатель события // удаление карточки
  
  cardImage.addEventListener('click', () => {      //слушатель события //открыть попап 'Большое фото'
    openPopup(popupPhoto);
    popupPhotoLink.src = item.link;
    popupPhotoTitle.textContent = item.name;
    popupPhotoLink.alt = item.name;
  });

  cardImage.src = item.link;
  cardName.textContent = item.name;
  cardImage.alt = item.name;
  return cloneElement;
};

function addCard(card) {       //функция добавления новой карточки
  cardsContainer.prepend(card);
}

function handleCardFormSubmit(event) {    //заполнение формы и добавление новой карточки на страницу
  event.preventDefault();
  const obj = {
    name: popupAddPlace.value,
    link: popupAddLink.value
  }
  addCard(createCard(obj));
  event.target.reset();       //очистка формы от введённых значений
  closePopup(popupAdd);
};
popupAddForm.addEventListener('submit', handleCardFormSubmit);

const renderCards = (cardsContainer, item) => {       // создание карточек
  cardsContainer.append(createCard(item))
};

initialCards.forEach(item => {
  renderCards(cardsContainer, item)
});