const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = popup.querySelector('.popup__close-button');

let popupForm = document.querySelector('.popup__form');
let popupName = popupForm.querySelector('.popup__user_info_name');
let popupJob = popupForm.querySelector('.popup__user_info_job');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

let popupAdd = document.querySelector('.popup-add');             //аргументы для попапа,
let buttonAdd = document.querySelector('.profile__add-button'); //который добавляет фото
let buttonCloseAdd = popupAdd.querySelector('.popup-add__close-button');
let popupAddLink = popupAdd.querySelector('.popup-add__link');
let popupAddPlace = popupAdd.querySelector('.popup-add__place');

const buttonLike = document.querySelector('.element__like'); //выбор кнопки лайк


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

function initialCardsLink() {              //список ссылок из массива
  for (let a = 0; a < 6; a++) {
    console.log(initialCards[a].link)
  };
};
initialCardsLink();

function initialCardsName() {              //список названий мест из массива
  for (let b = 0; b < 6; b++) {
    console.log(initialCards[b].name)
  };
};
initialCardsName();

function cardCreate() {              //функция создания карточки

  const template = document.querySelector('#element-template').content;
  const element = document.querySelector('.card');

  const cloneElement = template.querySelector('.element').cloneNode(true);
  cloneElement.querySelector('.element__link').src = initialCards[0].link;
  cloneElement.querySelector('.element__title').textContent = initialCards[0].name;

  element.prepend(cloneElement);      // отображение на странице
};

cardCreate();             //вызов функции создания карточки


function fnClose() {             //ф-ция закрытия попапа редактирования профиля
  popup.classList.remove('popup_opened');
}

function fnCloseAdd() {             //ф-ция закрытия попапа добавления фото
  popupAdd.classList.remove('popupAdd_opened');
}


function handleFormSubmit(evt) {      //функция заполнения формы 
  evt.preventDefault();             //попапа редактирования профиля    

  profileName.textContent;
  profileJob.textContent;

  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;

  fnClose()
}
popupForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {      //функция заполнения формы 
  evt.preventDefault();             //добавить карточку, название места и ссылка  

  cloneElement.querySelector('.element__link').src = popupAddLink.src;
  cloneElement.querySelector('.element__title').textContent = popupAddPlace.value;

  fnCloseAdd()
}
popupAdd.addEventListener('submit', handleFormSubmit);

buttonEdit.addEventListener('click', () => {      //слушатель события //Добавить информацию
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
});

/* buttonLike.addEventListener('click', () => {
  if ($(this).hasClass('element__like_active'))
    $(this).removeClass('element__like_active');
else
    $(this).addClass('element__like_active');
}); */

buttonClose.addEventListener('click', fnClose) //слушатель события //закрыть попап редактирования профиля

buttonAdd.addEventListener('click', () => {      //слушатель события //открыть попап 'Добавить новое место'
  popupAdd.classList.add('popupAdd_opened');
});

let popupPhoto = document.querySelector('.popup-photo');   //выбор элементов "большое фото"
let popupLink = document.querySelector('.element__link');
let popupPhotoClose = popupPhoto.querySelector('.popup-photo__close-button');

popupLink.addEventListener('click', () => {      //слушатель события //открыть попап 'Большое фото'
  popupPhoto.classList.add('popup-photo_opened');
});

function fnCloseBigPhoto() {             //ф-ция закрытия попапа 'большое фото'
  popupPhoto.classList.remove('popup-photo_opened');
}

popupPhotoClose.addEventListener('click', fnCloseBigPhoto) //слушатель события //закрыть попап Большое фото

buttonCloseAdd.addEventListener('click', fnCloseAdd) //слушатель события //закрыть попап добавления фото

const buttonDelete = document.querySelector('.element__delete');  //выбор кнопки удаления фото

buttonDelete.addEventListener('click', function () {   //слушатель события // удаление карточки
  const listItem = buttonDelete.closest('.card');
  listItem.remove();
});
