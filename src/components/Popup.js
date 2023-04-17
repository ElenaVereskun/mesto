export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => this._handleEscClose(event));
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (event) => this._handleEscClose(event));
    }
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            const popupSome = document.querySelector('.popup_opened')
            this.close(popupSome);
        }
    }
    _closePopupOverlay(event) {
        if (event.target.classList.contains('popup')) {
            this.close(event.target);
        }
    };
    setEventListeners() {
        const closeButtons = document.querySelectorAll('.popup__close-button');
        closeButtons.forEach((button) => {
            const popup = button.closest('.popup');
            button.addEventListener('click', (popup) => this.close(popup));
            popup.addEventListener('mousedown', (event) => this._closePopupOverlay(event));
        });
    }
}