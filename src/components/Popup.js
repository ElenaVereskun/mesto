export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', () => {
            this._handleEscClose();
        });
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', () => {
            this._handleEscClose();
        });
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const popupSome = document.querySelector('.popup_opened')
            this._closePopup(popupSome);
        }
    }
    _closePopupOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            this._closePopup(evt.target);
        }
    };
    setEventListeners() {
        const closeButtons = document.querySelectorAll('.popup__close-button');
        closeButtons.forEach((button) => {
            const popup = button.closest('.popup');
            button.addEventListener('click', () => this._closePopup(popup));
            popup.addEventListener('mousedown', closePopupOverlay);
        });
        this._closePopupOverlay(evt);
    }
}