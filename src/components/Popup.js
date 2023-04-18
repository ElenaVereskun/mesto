export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this)
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
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
        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', (popup) => this.close(popup));
        this._popup.addEventListener('mousedown', (event) => this._closePopupOverlay(event));
    }
}