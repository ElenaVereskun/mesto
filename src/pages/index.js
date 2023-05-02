import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  profilePopup,
  profileEditButton,
  profilePopupForm,
  profilePopupName,
  profilePopupJob,
  popupAdd,
  buttonAdd,
  popupAddForm,
  popupPhoto,
  popupConfirmation,
  popupAvatar,
  popupAvatarForm,
  buttonEditAvatar,
  options,
  profileName,
  profileJob,
  profileAvatar
} from '../components/utils.js';
//валидация
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
//класс Section, массив пока пустой
const cardsList = new Section({
  items: [],
  renderer: (item) => createCard(item)
},
  '.elements');
let userId;
Promise.all([api.getUserProfileInfo(), api.getCards()])
  .then(([res, cardsData]) => {
    userId = res._id;
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserInfoAvatar(res.avatar);
    cardsData.forEach((cardData) => {
      const newCard = createCard(cardData, userId);
      cardsList.addItem(newCard);
    })
    cardsList.renderItems(cardsData, userId);
  })
  .catch(err => console.log(err));

//9. Обновление аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
})
const popupEditAvatar = new PopupWithForm({
  popup: popupAvatar,
  handleFormSubmit: (data) => {
    popupEditAvatar.loading(true, 'Сохранение...');
    api.editAvatar(data)
      .then((res) => {
        profileAvatar.src = userInfo.setUserInfoAvatar(res);//useInfo class
        popupEditAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupEditAvatar.loading(false)
      });
  }
});
popupEditAvatar.setEventListeners();

//8. Постановка и снятие лайка
const handleLikeClick = (likes, cardId, cardData) => {
  api.likeCard(cardId)
    .then((res) => {
      cardData.countLikes(res.likes);
    })
    .catch(err => console.log(err));
}
const handleDeleteLikeClick = (likes, cardId, cardData) => {
  api.deleteLikeCard(cardId)
    .then((res) => {
      cardData.countLikes(res.likes);
    })
    .catch(err => console.log(err));
}
const popupWithConfirmation = new PopupWithConfirmation(
  popupConfirmation,
  (data, cardId) => {
    popupWithConfirmation.loading(true, 'Удаление...')
    api.deleteCard(cardId)
      .then(() => {
        data.remove();
        popupWithConfirmation.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithConfirmation.loading(false)        
      });
  });
popupWithConfirmation.setEventListeners();

function createCard(cardData, userId) {
  const card = new Card(
    cardData,
    '#element-template',
    (name, link) => popupWithImage.open(name, link),
    (data, cardId) => popupWithConfirmation.open(data, cardId),
    (likes, cardId, cardData) => handleLikeClick(likes, cardId, cardData),
    (likes, cardId, cardData) => handleDeleteLikeClick(likes, cardId, cardData),
  );
  return card.generateCard(cardData, userId);
}
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
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
    popupWithProfileForm.loading(true, 'Сохранение...');
    api.editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(data.name, data.job);
        res.about = data.job;
        res.name = data.name;
        popupWithProfileForm.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithProfileForm.loading(false);
      });
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
    popupWithAddForm.loading(true, 'Сохранение...');
    api.createCard(data)
      .then((res) => {
        cardsList.addItem(createCard(res));
        popupWithAddForm.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithAddForm.loading(false);
      })
  }
});
popupWithAddForm.setEventListeners();

