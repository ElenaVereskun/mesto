const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = popup.querySelector('.popup__close-button');
let popupForm = document.querySelector('.popup__form');
let popupName = popupForm.querySelector('.popup_user-info_name');
let popupJob = popupForm.querySelector('.popup_user-info_job');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function handleFormSubmit(evt) {      //функция заполнения формы
    evt.preventDefault();

    popupName.value;
    popupJob.value;

    profileName.textContent;
    profileJob.textContent;

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;

    function fnClose() {
        popup.classList.remove('popup_opened');
    }
    fnClose()      //ф-ция закрытия попапа
}
popupForm.addEventListener('submit', handleFormSubmit);

buttonEdit.addEventListener('click', () => {      //слушатель события //Добавить информацию
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
});

buttonClose.addEventListener('click', () => {      //слушатель события закрыть попап    
    popup.classList.remove('popup_opened');
});
