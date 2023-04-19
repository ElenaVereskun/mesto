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
            this.close();
        }
    }
    _closePopupOverlay(event) {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    };
    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', (event) => this._closePopupOverlay(event));
    }
}