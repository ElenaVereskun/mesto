const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = popup.querySelector('.popup__close-button');

const popupForm = document.querySelector('.popup__form');
const popupName = popupForm.querySelector('.popup__user_info_name');
const popupJob = popupForm.querySelector('.popup__user_info_job');

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


//попап редактирования профиля
function closePopup() {             //ф-ция закрытия попапа редактирования профиля
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {      //функция заполнения формы 
  evt.preventDefault();             //попапа редактирования профиля    

  profileName.textContent;
  profileJob.textContent;

  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;

  closePopup()
};
popupForm.addEventListener('submit', handleFormSubmit);

buttonEdit.addEventListener('click', () => {      //слушатель события //Добавить информацию 
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
});

buttonClose.addEventListener('click', closePopup); //слушатель события //закрыть попап редактирования профиля

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

function closePopupPhotoFn() {             //ф-ция закрытия попапа 'большое фото'
  popupPhoto.classList.remove('popup-photo_opened');
}

popupPhotoClose.addEventListener('click', closePopupPhotoFn) //слушатель события //закрыть попап Большое фото

buttonAdd.addEventListener('click', () => {      //слушатель события //открыть попап 'Новая карточка'
  popupAdd.classList.add('popupAdd_opened');
});

function closePopupAddFn() {             //ф-ция закрытия попапа добавления новой карточки
  popupAdd.classList.remove('popupAdd_opened');
}

const template = document.querySelector('#element-template').content;  //выбор template элемента для создания карточки
const elements = document.querySelector('.elements');

function createCard(item) {              //функция создания карточки
  const cloneElement = template.querySelector('.element').cloneNode(true);
  const cloneElementLink = cloneElement.querySelector('.element__link');
  const cloneElementName = cloneElement.querySelector('.element__title');
  const buttonLike = cloneElement.querySelector('.element__like');
  const buttonDelete = cloneElement.querySelectorAll('.element__delete');

  /* buttonDelete.addEventListener('click', () => {   //слушатель события // удаление карточки
    buttonDelete.closest('.element').remove();
  }); */
 
  buttonLike.addEventListener('click', () => {   //слушатель события // лайк фото
    buttonLike.classList.toggle('element__like_active');
  });

  cloneElementLink.addEventListener('click', () => {      //слушатель события //открыть попап 'Большое фото'
    popupPhoto.classList.add('popup-photo_opened');
    popupPhotoLink.src = cloneElementLink.src;
    popupPhotoTitle.textContent = cloneElementName.textContent;
  });

  popupAdd.addEventListener('submit', (evt) => {      //слушатель события //Добавить новую карточку
    evt.preventDefault();
    cloneElementLink.src = popupAddLink.src;
    cloneElementName.textContent = popupAddPlace.value;
    closePopupAddFn();
  }); 

  cloneElementLink.src = item.link;
  cloneElementName.textContent = item.name;
  return cloneElement;
};

const renderCards = (elements, item) => {       // создание карточек
  elements.append(createCard(item))
};

initialCards.forEach(item => {
  renderCards(elements, item)
});
