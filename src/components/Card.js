export default class Card {
  constructor(data, templateSelector, handleCardClick, openDeletePopup, handleLikeClick) {
    this.name = data.name;
    this.link = data.link;
    this.userId = data.userId;
    this._id = data._id;
    this._likes = data.likes;
    this._cardId = data.cardId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._handleLikeClick = handleLikeClick
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };

  generateCard(data) {
    this._element = this._getTemplate();
    this._element.querySelector('.element__link').src = this.link;
    this._element.querySelector('.element__title').textContent = this.name;
    this._element.querySelector('.element__link').alt = this.name;
    this.setEventListeners(data);
    this._addButtonDelete(data);
    /*console.log(data);//весь массив */
    return this._element;
  }

  _addButtonDelete(data) {
    if (data.owner._id !== "7f784a8a1b5096993a0dce6a") {
      this._buttonDelete.classList.add('element__delete_none')
    }
  }
  setEventListeners(data) { 
   /*  console.log(data);//весь массив  */
    this._buttonLikeListener(data.likes);
    this._buttonDeleteListener(data);
    this._element.querySelector('.element__link').addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }
  _buttonDeleteListener(data) {
    this._buttonDelete = this._element.querySelector('.element__delete');
    /*console.log(data);//массив всех карточек */
    this._buttonDelete.addEventListener('click', (cardData) => {
      console.log(cardData);//PointerEvent 
      this._openDeletePopup(cardData)
    });
  }
  _buttonLikeListener(data) {
    this._buttonLike = this._element.querySelector('.element__like');   
    this._buttonLike.addEventListener('click', (likes) => {
      console.log(this._likes);
      this._likeToggle(this._likes);//добавить или убрать лайк
      this._countLikes(this._likes);//посчитать лайк
      this._countLikes(this._id);//посчитать лайк
      this._handleLikeClick(this._likes, this._id);
    });
  }
  _countLikes(likes) {
    this._count = this._element.querySelector('.element__like-count');    
    this._count.textContent = this._likes.length;
  }
  _likeToggle(likes) {
    this._buttonLike.classList.toggle('element__like_active');
  }  
}