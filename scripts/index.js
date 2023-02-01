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

const buttonDelete = document.querySelector('.element__delete');  //выбор кнопки удаления фото

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

const initialCardsName = initialCards.filter(function (item) {   //отфильтрованы из массива названия мест
  return item.name;
});

const initialCardsLink = initialCards.filter(function (item) {   //отфильтрованы из массива ссылки
  return item.link;
});

const template = document.querySelector('#element').content;
const element = document.querySelector('.element');

const cloneElement = template.querySelector('.element').cloneNode(true);
cloneElement.querySelector('.element__link').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';
cloneElement.querySelector('.element__title').textContent = 'Байкал';

element.prepend(cloneElement);      // отображение на странице


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

buttonEdit.addEventListener('click', () => {      //слушатель события //Добавить информацию
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
});

buttonClose.addEventListener('click', fnClose) //слушатель события //закрыть попап редактирования профиля

buttonAdd.addEventListener('click', () => {      //слушатель события //Добавить новое место
  popupAdd.classList.add('popupAdd_opened');
});

buttonCloseAdd.addEventListener('click', fnCloseAdd) //слушатель события //закрыть попап добавления фото

/* buttonDelete.addEventListener('click', function() {   //слушатель события // удаление карточки
  const listItem = buttonDelete.closest('.element');
  listItem.remove();
});
 */
