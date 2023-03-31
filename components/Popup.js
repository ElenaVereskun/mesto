export default class Popup {//который отвечает за открытие и закрытие попапа
    constructor(popup) {//popup -- селектор попапа.
        this._popup = popup
    }
    open() {        //метод открытия попапа
        this._popup.classList.add('popup_opened');         
    }
    close() {        //метод зактырия попапа
        this._popup.classList.remove('popup_opened');
    }
    _handleEscClose() {//содержит логику закрытия попапа клавишей Esc.
        document.addEventListener('keydown', this._keyEscHandler);  //слушатель события Закрытия попапа по клику на Esc
    }
    _keyEscHandler(evt){
        if (evt.key === 'Escape') {
            const popupSome = document.querySelector('.popup_opened')
            this._closePopup(popupSome);
          }
    }
    _closePopupOverlay(evt) {  //функция закрытия попапа по клику на оверлэй
        if (evt.target.classList.contains('popup')) {
            this._closePopup(evt.target);
        }
      };
    setEventListeners() {//который добавляет слушатель клика иконке закрытия попапа.
        //Модальное окно также закрывается при клике на затемнённую область вокруг формы.
        const closeButtons = document.querySelectorAll('.popup__close-button');
        closeButtons.forEach((button) => {
          const popup = button.closest('.popup');  // находим 1 раз ближайший к крестику попап 
          button.addEventListener('click', () => this._closePopup(popup));  // устанавливаем обработчик закрытия на крестик
          popup.addEventListener('mousedown', closePopupOverlay);  //закрытие попапа по клику на оверлэй
        });
    }
}