import Card from './Card.js';

/* import FormValidator from './FormValidator'; */

const profilePopup = document.querySelector('.profile-popup');
const profilePopupForm = document.querySelector('.profile-popup__form');
const profilePopupName = profilePopupForm.querySelector('.profile-popup__user_info_name');
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__user_info_job');
const profile = document.querySelector('.profile');   //выбор элементов для попапа"редактировать профиль"
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const popupAdd = document.querySelector('.popup-add');   //аргументы для попапа//который добавляет фото
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

/* Card._buttonAddListener();//метод Открыть попап новая карточка */

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

export { openPopup };