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

//попап редактирования профиля
function fnClose() {             //ф-ция закрытия попапа редактирования профиля
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {      //функция заполнения формы 
  evt.preventDefault();             //попапа редактирования профиля    

  profileName.textContent;
  profileJob.textContent;

  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;

  fnClose()
};
popupForm.addEventListener('submit', handleFormSubmit);

buttonEdit.addEventListener('click', () => {      //слушатель события //Добавить информацию
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
});

buttonClose.addEventListener('click', fnClose); //слушатель события //закрыть попап редактирования профиля

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

/* function initialCardsLink() {
  for (let a = 0; a < 6; a++) {
    console.log(initialCards[a].link)
  };
};
initialCardsLink();

function initialCardsName() {
  for (let b = 0; b < 6; b++) {
    console.log(initialCards[b].name)
  };
};
initialCardsName(); */
/* for (let a = 0; a < 6; a++)
  console.log(initialCards[a].link)
for (let b = 0; b < 6; b++)
  console.log(initialCards[b].name) */

let initialCardsName = initialCards.forEach(item => {              //список названий мест из массива
  return item['name'];
});

let initialCardsLink = initialCards.forEach(item => {              //список ссылок из массива
  return item['link'];
});

const template = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');

function cardCreate() {              //функция создания карточки
  const cloneElement = template.querySelector('.element').cloneNode(true);
  cloneElement.querySelector('.element__link').src = initialCards[4].link;
  cloneElement.querySelector('.element__title').textContent = initialCards[4].name;

  elements.append(cloneElement);      // отображение на странице
};

/* cardCreate();   */       //вызов функции создания карточки

function renderCards() {
  initialCards.forEach(item => {
    const cardHTML = cardCreate(item);
    template.append(cardHTML);
  });
}
renderCards();

//создание попапа Добавление новое место
buttonAdd.addEventListener('click', () => {      //слушатель события //открыть попап 'Добавить новое место'
  popupAdd.classList.add('popupAdd_opened');
});

function fnCloseAdd() {             //ф-ция закрытия попапа добавления новое место
  popupAdd.classList.remove('popupAdd_opened');
}

function handleFormSubmit(evt) {      //функция заполнения формы 
  evt.preventDefault();             //добавить карточку, название места и ссылка  
  cardCreate();
  /* popupLink.src = popupAddLink.src;                   ///Удалить если не будут нужны!
  popupTitle.textContent = popupAddPlace.value; */

  fnCloseAdd()
};

buttonCloseAdd.addEventListener('click', fnCloseAdd); //слушатель события //закрыть попап добавления фото

popupAdd.addEventListener('submit', handleFormSubmit);



// создание попапа 'Большое фото'
let popupPhoto = document.querySelector('.popup-photo');   //выбор элементов для попапа"большое фото"
let popupLink = document.querySelector('.element__link');
let popupTitle = document.querySelector('.element__title');
let popupPhotoClose = popupPhoto.querySelector('.popup-photo__close-button');
let popupPhotoLink = popupPhoto.querySelector('.popup-photo__link');
let popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');

popupLink.addEventListener('click', () => {      //слушатель события //открыть попап 'Большое фото'
  popupPhoto.classList.add('popup-photo_opened');
  popupPhotoLink.src = popupLink.src;
  popupPhotoTitle.textContent = popupTitle.textContent;
});

function fnCloseBigPhoto() {             //ф-ция закрытия попапа 'большое фото'
  popupPhoto.classList.remove('popup-photo_opened');
}

popupPhotoClose.addEventListener('click', fnCloseBigPhoto) //слушатель события //закрыть попап Большое фото




//Лайк фото
let buttonLike = document.querySelector('.element__like'); //выбор кнопки лайк

buttonLike.addEventListener('click', function () {   //слушатель события 
  buttonLike.classList.toggle('element__like_active');
});

const buttonDelete = document.querySelector('.element__delete');  //выбор кнопки удаления фото

buttonDelete.addEventListener('click', function () {   //слушатель события // удаление карточки
  const listItem = buttonDelete.closest('.element');
  listItem.remove();
});

