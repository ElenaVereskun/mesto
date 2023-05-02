export default class Card {
  constructor(cardData, templateSelector, handleCardClick, openDeletePopup, handleLikeClick, handleDeleteLikeClick, userId) {
    this.name = cardData.name;
    this.link = cardData.link;
    this._likes = cardData.likes;
    this.cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
    this.likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this.cardElement = this._getTemplate();
    this._counter = this.cardElement.querySelector('.element__like-count');
  }
  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return element;
  };
  generateCard(cardData, userId) {
    this.cardElement = this._getTemplate();
    this.cardElement.querySelector('.element__link').src = this.link;
    this.cardElement.querySelector('.element__title').textContent = this.name;
    this.cardElement.querySelector('.element__link').alt = this.name;
    this.setEventListeners(cardData); 
    this._addButtonDelete(userId);
    return this.cardElement;
  }
  setEventListeners(cardData) {
    this._buttonLikeListener(cardData);
    this._buttonDeleteListener(cardData);    
    this.cardElementRemove();
    this.cardElement.querySelector('.element__link').addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }
  _addButtonDelete(userId) {
    if (userId === this._ownerId) {
      this._buttonDelete.classList.remove('element__delete_none')
    }
  }
  _buttonDeleteListener() {
    this._buttonDelete = this.cardElement.querySelector('.element__delete');
    this._buttonDelete.addEventListener('click', () => {
      this._openDeletePopup(this.cardElement, this.cardId);      
    })
  }
  cardElementRemove() {
    this.cardElement.remove();
  }
  _buttonLikeListener(cardData) {
    this._buttonLike = this.cardElement.querySelector('.element__like');
    this.countLikes();
    this._buttonLike.addEventListener('click', () => {
      if (this._buttonLike.classList.contains('element__like_active')) {
        this.disLike();
        this.countLikes();
        this._handleDeleteLikeClick(this._likes, this.cardId, this.cardElement);
      } else {
        this.addLike();
        this.countLikes();
        this._handleLikeClick(this._likes, this.cardId, this.cardElement);
      }
    });
  }
  isLiked(likes) {//наличие моего лайкалайка
    return likes.some((like) => {
      return like._id === this._userId;
    })
  }
  countLikes() {
    this._counter.textContent = this._likes.length;
  }
  addLike() {
    this._buttonLike.classList.add('element__like_active');
  }
  disLike() {
    this._buttonLike.classList.remove('element__like_active');
  }
}