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

//загрузка данных в шапку профиля
api.getUserProfileInfo()
  .then((res) => {
    console.log(res);
    profileJob.textContent = res.about;
    profileName.textContent = res.name;
    profileAvatar.src = res.avatar;
    const userId = res._id;
    console.log(userId);
  })
  .then(() => {
    api.getCards()  //2. Загрузка карточек с сервера
      .then((cardsData, userId) => {
        cardsData.forEach((cardData) => {
          const newCard = createCard(cardData, userId);
          cardsList.addItem(newCard);
        })
      })
      .catch(err => console.log(err));    
    cardsList.renderItems();  
  });

//9. Обновление аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
})
const popupEditAvatar = new PopupWithForm({
  popup: popupAvatar,
  handleFormSubmit: (data) => {
    api.editAvatar(data)
      .then((res) => {
        profileAvatar.src = userInfo.setUserInfoAvatar(res);//useInfo class
        popupEditAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        formValidatorPopupAvatar._disableButton("Сохранение...");
      })
  }
});
popupEditAvatar.setEventListeners();

//8. Постановка и снятие лайка
const handleLikeClick = (likes, id, cardData) => {
  api.likeCard(id)
    .then((res) => {
      cardData.countLikes(res.likes);
    })
    .catch(err => console.log(err));
}
const handleDeleteLikeClick = (likes, id, cardData) => {
  api.deleteLikeCard(id)
    .then((res) => {
      console.log(res);
      cardData.countLikes(res.likes);
    })
    .catch(err => console.log(err));
}
const popupWithConfirmation = new PopupWithConfirmation(
  popupConfirmation,
  (cardData) => {    
     api.deleteCard(cardData._id)
      .then((cardData) => {
        cardData.cardElementRemove();
        popupWithConfirmation.close();
      })
      .catch(err => console.log(err));
  });
popupWithConfirmation.setEventListeners();

function createCard(cardData, userId) {
  const card = new Card(
    cardData,
    '#element-template',
    (name, link) => popupWithImage.open(name, link),
    (cardData) => popupWithConfirmation.open(cardData),
    (likes, id, cardData) => handleLikeClick(likes, id, cardData),
    (likes, id, cardData) => handleDeleteLikeClick(likes, id, cardData),
  );
  return card.generateCard(cardData);
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
    api.editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(data.name, data.job);
        res.about = data.job;
        res.name = data.name;
      })
      .catch(err => console.log(err))
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
        cardsList.addItem(createCard(res));
        popupWithAddForm.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        formValidatorPopupAdd._disableButton("Сохранение...");
      })
  }
});
popupWithAddForm.setEventListeners();

