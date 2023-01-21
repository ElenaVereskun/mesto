const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = popup.querySelector('.popup__close-button');
let popupForm = document.querySelector('.popup__form');
let popupName = popupForm.querySelector('.popup__user_info_name');
let popupJob = popupForm.querySelector('.popup__user_info_job');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function fnClose() {             //ф-ция закрытия попапа
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {      //функция заполнения формы
    evt.preventDefault();

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

buttonClose.addEventListener('click', fnClose) //слушатель события //закрыть попап
