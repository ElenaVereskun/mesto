export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this.name = data.name;
    this.link = data.link;
    /* this.userId = data._id; */
    this._likes = data.likes;
    this._count = document.querySelector('.element__like-count');
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__link').src = this.link;
    this._element.querySelector('.element__title').textContent = this.name;
    this._element.querySelector('.element__link').alt = this.name;
    this._setEventListener();
    return this._element;
  }
  _setEventListener() {
    this._buttonLike = this._element.querySelector('.element__like');
    this._buttonDelete = this._element.querySelector('.element__delete');
    if (this.userId === '8f35f71b-a7e4-4bcd-adfc-0c93657d6d95'){
      this._buttonDelete.style.display = 'none'
    }

    this._buttonLikeListener();
    this._buttonDeleteListener();

    this._element.querySelector('.element__link').addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }

  _buttonDeleteListener() {
      this._buttonDelete.addEventListener('click', () => {
      this._openPopupConfirm();
    });
  }
  _openPopupConfirm() {
    document.querySelector('.popup-confirm').classList.add('popup_opened')
  }
  //пока нигде не вызывается
/*   _handleDelete() {
    this._element.remove();
    this._element = null;
  } */
  _buttonLikeListener() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
      console.log(this._likes);
      this._count.textContent = this._likes.length;
    });
  }
  _handleLike() {
    this._buttonLike.classList.toggle('element__like_active');
  };
}