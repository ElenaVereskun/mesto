import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const profilePopup = document.querySelector('.profile-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupForm = document.querySelector('.profile-popup__form');
const profilePopupName = profilePopupForm.querySelector('.profile-popup__user_info_name');
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__user_info_job');
const popupAdd = document.querySelector('.popup-add');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup-add__form');
const popupPhoto = document.querySelector('.popup-photo');
const popupConfirmation = document.querySelector('.popup-confirm');
const popupAvatar = document.querySelector('.popup-avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup-avatar__form');
const editAvatarButton = document.querySelector('.profile__edit-avatar');

const options = ({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClassActive: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
});

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar');

const formValidatorPopupAdd = new FormValidator(options, popupAddForm);
formValidatorPopupAdd.enableValidation();

const formValidatorPopupProfile = new FormValidator(options, profilePopupForm);
formValidatorPopupProfile.enableValidation();

const formValidatorPopupAvatar = new FormValidator(options, popupAvatarForm);
formValidatorPopupAvatar.enableValidation();

const popupWithImage = new PopupWithImage(popupPhoto);
popupWithImage.setEventListeners();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-64',
  {
    authorization: '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95'
  }
);
//загрузка данных в шапку профиля
function addProfileUser() {
  api.getUserProfileInfo()
    .then((res) => {
      profileJob.textContent = res.about;
      profileName.textContent = res.name;
      profileAvatar.src = res.avatar;
    })
}
addProfileUser();
//9. Обновление аватара пользователя
editAvatarButton.addEventListener('click', () => {
  popupAvatar.classList.add('popup_opened');
})
const popupEditAvatar = new PopupWithForm({
  popup: popupAvatar,
  handleFormSubmit: (data) => {
    api.editAvatar(data)
      .then((res) => {
        profileAvatar.src = res.avatar;
      })
      .catch((error) => {
        console.error(`ошибка: ${error}`)
      })
      .finally(() => {
        formValidatorPopupAvatar._disableButton("Сохранение...");
      })
    popupEditAvatar.close();
  }
});
popupEditAvatar.setEventListeners();

//2. Загрузка карточек с сервера
api.getCards()
  .then((res) => {
    const cardsList = new Section({
      items: res,
      renderer: (data) => {
        return createCard(data);
      },
    },
      '.elements'
    );
    cardsList.renderItems();
  });

const handleLikeClick = (likes, id, cardData) => {
  if (likes) {
    api.likeCard(id)
      .then((res) => {
        console.log(res.likes);
        cardData.addLike(res.likes);
      })
  }
}
const handleDeleteLikeClick = (likes, id, cardData) => {
  if (!likes)
    api.deleteLikeCard(id, cardData)
      .then((res) => {
        console.log(res.likes)
        cardData.disLike(res.likes);
      })
}
const popupWithConfirmation = new PopupWithConfirmation(
  popupConfirmation,
  (cardId) => {
    console.log(cardId);
    api.deleteCard(cardId)//здесь нужно передавать id
      .then((res) => {
        console.log(res)
      })
  });
popupWithConfirmation.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    cardData,
    '#element-template',
    (name, link) => popupWithImage.open(name, link),
    (cardData) => popupWithConfirmation.open(cardData),//здесь cardData undefined
    (likes, id) => handleLikeClick(likes, id),
    (likes, id, cardData) => handleDeleteLikeClick(likes, id, cardData),
  );
  return card.generateCard(cardData);
}

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'

});

profileEditButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  const getElements = userInfo.getUserInfo();
  profilePopupName.value = getElements.name;
  profilePopupJob.value = getElements.job;
});

const popupWithProfileForm = new PopupWithForm({
  popup: profilePopup,
  handleFormSubmit: (data) => {
    api.editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(data.name, data.job);
        res.about = data.job;
        res.name = data.name;
      })
      .catch((error) => {
        console.error(`ошибка: ${error}`)
      })
      .finally(() => {
        formValidatorPopupProfile._disableButton("Сохранение...");
      })
    popupWithProfileForm.close();
  }
});
popupWithProfileForm.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupWithAddForm.open();
  formValidatorPopupAdd.resetValidation();
});

//4. Добавление новой карточки
const popupWithAddForm = new PopupWithForm({
  popup: popupAdd,
  handleFormSubmit: (data) => {
    api.createCard(data)
      .then((res) => {
        const newCard = createCard(res);
        console.log(res);
        console.log(newCard);
        document.querySelector('.elements').prepend(newCard);
      })
      .catch((error) => {
        console.error(`ошибка: ${error}`)
      })
      .finally(() => {
        formValidatorPopupAdd._disableButton("Сохранение...");
      })
    popupWithAddForm.close();
  }
});
popupWithAddForm.setEventListeners();

