export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this.name = data.name;
    this.link = data.link;
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

    this._buttonLikeListener();
    this._buttonDeleteListener();

    this._element.querySelector('.element__link').addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }
  _buttonDeleteListener() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });
  }
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
  _buttonLikeListener() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });
  }
  _handleLike() {
    this._buttonLike.classList.toggle('element__like_active');
  };
}