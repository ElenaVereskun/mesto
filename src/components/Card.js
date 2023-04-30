export default class Card {
  constructor(cardData, templateSelector, handleCardClick, openDeletePopup, handleLikeClick, handleDeleteLikeClick) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.userId = cardData.userId;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._cardId = cardData.cardId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };
  generateCard(cardData) {
    this._element = this._getTemplate();
    this._element.querySelector('.element__link').src = this.link;
    this._element.querySelector('.element__title').textContent = this.name;
    this._element.querySelector('.element__link').alt = this.name;
    this.setEventListeners(cardData);
    this._addButtonDelete(cardData);
    
    return this._element;
  }
  setEventListeners(cardData) {
    this._buttonLikeListener(cardData);
    this._buttonDeleteListener(cardData);
    this.cardElementRemove();
    this._element.querySelector('.element__link').addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }
  _addButtonDelete(cardData) {
    if (cardData.owner._id !== "7f784a8a1b5096993a0dce6a") {
      this._buttonDelete.classList.add('element__delete_none')
    }
  }
  _buttonDeleteListener(cardData) {
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._buttonDelete.addEventListener('click', () => {
      this._openDeletePopup(cardData);
    })
  }
  cardElementRemove(){
    this._element.remove();
  }
  _buttonLikeListener(cardData) {
    this._buttonLike = this._element.querySelector('.element__like');
    this._buttonLike.addEventListener('click', () => {
      if (this._buttonLike.classList.contains('element__like_active')) {
        this.disLike();
        this._handleDeleteLikeClick(this._likes, this._id, cardData);
      } else {
        this.addLike();
        this._handleLikeClick(this._likes, this._id, cardData);
      }
      this.countLikes(this._likes);
    });
  }
  countLikes(likes) {
    this._counter = this._element.querySelector('.element__like-count');
    this._counter.textContent = this._likes.length;
  }
  addLike() {
    this._buttonLike.classList.add('element__like_active');
  }
  disLike() {
    this._buttonLike.classList.remove('element__like_active');
  }
}