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

const popup = document.querySelector('.popup');

function closePopup(popup) {           //ф-ция закрытия попапа
  popup.classList.remove('popup_opened');
};

function openPopup(popup) {            //ф-ция открытия попапа
  popup.classList.add('popup_opened');
};


buttonAdd.addEventListener('click', () => {    //слушатель события //открыть попап 'Новая карточка'
  openPopup(popupAdd);
});

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');  // находим 1 раз ближайший к крестику попап 
  button.addEventListener('click', () => closePopup(popup));  // устанавливаем обработчик закрытия на крестик
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

const handleLike = () => {             //ф-ция посавить лайк
  buttonLike.classList.toggle('element__like_active');
};

const template = document.querySelector('#element-template').content;  //выбор template элемента для создания карточки
const elements = document.querySelector('.elements');

elements.addEventListener('click', (evt) => {   //слушатель события // удаление карточки
  if (evt.target.classList.contains('element__delete')) {
    handleDelete(evt)
  }
});

function createCard(item) {              //функция создания карточки
  const cloneElement = template.querySelector('.element').cloneNode(true);
  const cardImage = cloneElement.querySelector('.element__link');
  const cardName = cloneElement.querySelector('.element__title');
  const buttonLike = cloneElement.querySelector('.element__like');

  buttonLike.addEventListener('click', () => {   //слушатель события // лайк фото
    buttonLike.classList.toggle('element__like_active');
  });

  cardImage.addEventListener('click', () => {      //слушатель события //открыть попап 'Большое фото'
    openPopup(popupPhoto);
    popupPhotoLink.src = cardImage.src;
    popupPhotoTitle.textContent = cardName.textContent;
    popupPhotoLink.alt = cardName.textContent;
  });

  cardImage.src = item.link;
  cardName.textContent = item.name;
  cardImage.alt = item.name;
  return cloneElement;
};

function addCard(card) {       //функция добавления новой карточки
  elements.prepend(card);
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
}
popupAdd.addEventListener('submit', handleCardFormSubmit);

const renderCards = (elements, item) => {       // создание карточек
  elements.append(createCard(item))
};

initialCards.forEach(item => {
  renderCards(elements, item)
});

function keyEscHandler (evt) { //функция добавления карточки через Enter
  if(evt.key === 'Enter') {
    addCard(popupAddLink.value, popupAddPlace.value);
  }
 };
