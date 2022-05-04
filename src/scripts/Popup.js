export default class Popup{
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  openPopup() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupSelector.classList.add('popup_opened');
  }

  closePopup() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup();
      }
    })
  }
}